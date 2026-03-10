import { Hono } from "hono";
import { Env, Variables } from "../types/env";
import { authStoreFromEnv, newMagicLinkRecord, sessionExpiresAt } from "../auth/store";
import { isEmailAllowed, magicLinkTtlMinutes, normalizeEmail } from "../auth/config";
import { minutesFromNowIso, nowIso } from "../utils/time";
import { randomToken, sha256Hex } from "../utils/crypto";
import { emailSenderFromEnv } from "../email/sender";
import {
  buildSessionCookie,
  clearSessionCookie,
  parseCookieHeader,
  sessionCookieName,
} from "../utils/cookies";
import {
  cookieDomain,
  createSignedSession,
  secureCookieForRequest,
  sessionTtlDays,
  verifySignedSession,
} from "../auth/session";

const auth = new Hono<{ Bindings: Env; Variables: Variables }>();

auth.post("/request-link", async (c) => {
  const body = await c.req.json<{ email?: string }>().catch(() => null);
  const rawEmail = body?.email ?? "";
  const email = normalizeEmail(rawEmail);

  if (!email || !email.includes("@")) {
    return c.json({ error: "VALIDATION_ERROR", message: "A valid email is required" }, 400);
  }

  if (!isEmailAllowed(email, c.env)) {
    return c.json({ error: "FORBIDDEN_EMAIL", message: "Email domain is not allowed" }, 403);
  }

  const token = randomToken(32);
  const tokenHash = await sha256Hex(token);
  const expiresAt = minutesFromNowIso(magicLinkTtlMinutes(c.env));

  const store = authStoreFromEnv(c.env);
  await store.createMagicLink(
    newMagicLinkRecord({
      tokenHash,
      email,
      expiresAt,
      requestIp: c.req.header("CF-Connecting-IP") ?? null,
      userAgent: c.req.header("user-agent") ?? null,
    })
  );

  const frontendVerifyUrl = `${c.env.FRONTEND_BASE_URL.replace(/\/$/, "")}/auth/verify?token=${encodeURIComponent(token)}`;

  await emailSenderFromEnv(c.env).sendMagicLink({
    to: email,
    magicLink: frontendVerifyUrl,
  });

  const base = {
    ok: true,
    message: "If the email is allowed, a magic login link has been sent.",
    expires_in_minutes: magicLinkTtlMinutes(c.env),
  };

  if (c.env.APP_ENV !== "production") {
    return c.json({ ...base, preview_link: frontendVerifyUrl });
  }

  return c.json(base);
});

auth.get("/verify", async (c) => {
  const token = c.req.query("token") ?? "";
  if (!token) {
    return c.redirect(`${c.env.FRONTEND_BASE_URL}/login?error=missing_token`, 302);
  }

  const tokenHash = await sha256Hex(token);
  const record = await authStoreFromEnv(c.env).consumeValidMagicLink(tokenHash, nowIso());

  if (!record) {
    return c.redirect(`${c.env.FRONTEND_BASE_URL}/login?error=invalid_or_expired`, 302);
  }

  const expiresAt = sessionExpiresAt(sessionTtlDays(c.env));
  const store = authStoreFromEnv(c.env);
  const persistedSession = await store.createSession({
    email: record.email,
    expiresAt,
    requestIp: c.req.header("CF-Connecting-IP") ?? null,
    userAgent: c.req.header("user-agent") ?? null,
  });

  const sessionValue = await createSignedSession(
    {
      sid: persistedSession.id,
      email: persistedSession.email,
      exp: persistedSession.expiresAt,
    },
    c.env
  );
  const secure = secureCookieForRequest(c.req.raw);
  const maxAgeSeconds = sessionTtlDays(c.env) * 24 * 60 * 60;

  c.header(
    "Set-Cookie",
    buildSessionCookie(sessionValue, {
      maxAgeSeconds,
      secure,
      domain: cookieDomain(c.env),
    })
  );

  return c.redirect(`${c.env.FRONTEND_BASE_URL}/app/dashboard`, 302);
});

auth.post("/logout", async (c) => {
  const cookies = parseCookieHeader(c.req.header("cookie") ?? null);
  const raw = cookies[sessionCookieName()];
  const payload = raw ? await verifySignedSession(raw, c.env) : null;
  if (payload) {
    await authStoreFromEnv(c.env).revokeSession(payload.sid, nowIso());
  }

  const secure = secureCookieForRequest(c.req.raw);
  c.header("Set-Cookie", clearSessionCookie({ secure, domain: cookieDomain(c.env) }));
  return c.json({ ok: true });
});

auth.get("/session", async (c) => {
  const cookieHeader = c.req.header("cookie") ?? null;
  const cookies = parseCookieHeader(cookieHeader);
  const raw = cookies[sessionCookieName()];
  if (!raw) return c.json({ authenticated: false }, 401);

  const payload = await verifySignedSession(raw, c.env);
  if (!payload) return c.json({ authenticated: false }, 401);

  const activeSession = await authStoreFromEnv(c.env).getActiveSession(payload.sid, nowIso());
  if (!activeSession || activeSession.email !== payload.email) {
    return c.json({ authenticated: false }, 401);
  }

  return c.json({ authenticated: true, email: payload.email, exp: payload.exp, sid: payload.sid });
});

export { auth };

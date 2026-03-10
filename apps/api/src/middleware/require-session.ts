import { Context, Next } from "hono";
import { Env, Variables } from "../types/env";
import { parseCookieHeader, sessionCookieName } from "../utils/cookies";
import { verifySignedSession } from "../auth/session";
import { authStoreFromEnv } from "../auth/store";
import { nowIso } from "../utils/time";

export async function requireSession(c: Context<{ Bindings: Env; Variables: Variables }>, next: Next): Promise<Response | void> {
  const cookies = parseCookieHeader(c.req.header("cookie") ?? null);
  const session = cookies[sessionCookieName()];
  if (!session) {
    return c.json({ error: "UNAUTHORIZED", message: "Authentication required" }, 401);
  }

  const payload = await verifySignedSession(session, c.env);
  if (!payload) {
    return c.json({ error: "UNAUTHORIZED", message: "Invalid or expired session" }, 401);
  }

  const activeSession = await authStoreFromEnv(c.env).getActiveSession(payload.sid, nowIso());
  if (!activeSession || activeSession.email !== payload.email) {
    return c.json({ error: "UNAUTHORIZED", message: "Session is not active" }, 401);
  }

  c.set("userEmail", payload.email);
  await next();
}

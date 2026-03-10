import { Context, Next } from "hono";
import { Env, Variables } from "../types/env";
import { parseCookieHeader, sessionCookieName } from "../utils/cookies";
import { verifySignedSession } from "../auth/session";

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

  c.set("userEmail", payload.email);
  await next();
}

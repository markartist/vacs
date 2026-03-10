import { Env } from "../types/env";
import {
  decodeBase64UrlJson,
  encodeBase64UrlJson,
  signHmacSha256,
  verifyHmacSha256,
} from "../utils/crypto";
import { nowIso } from "../utils/time";

export interface SessionPayload {
  sid: string;
  email: string;
  iat: string;
  exp: string;
}

export function sessionTtlDays(env: Env): number {
  const raw = Number(env.SESSION_TTL_DAYS ?? "7");
  return Number.isFinite(raw) && raw > 0 ? raw : 7;
}

export function secureCookieForRequest(request: Request): boolean {
  return new URL(request.url).protocol === "https:";
}

export function cookieDomain(env: Env): string | undefined {
  const domain = (env.COOKIE_DOMAIN ?? "").trim();
  return domain.length > 0 ? domain : undefined;
}

export async function createSignedSession(input: { sid: string; email: string; exp: string }, env: Env): Promise<string> {
  const iat = nowIso();
  const payload: SessionPayload = {
    sid: input.sid,
    email: input.email,
    iat,
    exp: input.exp,
  };
  const encodedPayload = encodeBase64UrlJson(payload);
  const secret = env.SESSION_SIGNING_SECRET;
  if (!secret) {
    throw new Error("SESSION_SIGNING_SECRET is not configured");
  }
  const signature = await signHmacSha256(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export async function verifySignedSession(raw: string, env: Env): Promise<SessionPayload | null> {
  const [encodedPayload, signature] = raw.split(".");
  if (!encodedPayload || !signature) return null;
  const secret = env.SESSION_SIGNING_SECRET;
  if (!secret) return null;

  const ok = await verifyHmacSha256(encodedPayload, signature, secret);
  if (!ok) return null;

  let payload: SessionPayload;
  try {
    payload = decodeBase64UrlJson<SessionPayload>(encodedPayload);
  } catch {
    return null;
  }

  if (!payload.sid || !payload.email || !payload.exp) return null;
  if (payload.exp <= nowIso()) return null;
  return payload;
}

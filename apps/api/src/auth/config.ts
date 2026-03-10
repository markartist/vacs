import { Env } from "../types/env";

export function magicLinkTtlMinutes(env: Env): number {
  const raw = Number(env.MAGIC_LINK_TTL_MINUTES ?? "20");
  return Number.isFinite(raw) && raw > 0 ? raw : 20;
}

export function shouldEnforceCorporateDomain(env: Env): boolean {
  return String(env.ENFORCE_CORPORATE_EMAIL ?? "false").toLowerCase() === "true";
}

export function allowedDomain(env: Env): string {
  return (env.ALLOWED_EMAIL_DOMAIN ?? "venterraliving.com").toLowerCase();
}

export function normalizeEmail(input: string): string {
  return input.trim().toLowerCase();
}

export function isEmailAllowed(email: string, env: Env): boolean {
  if (!shouldEnforceCorporateDomain(env)) return true;
  const domain = email.split("@")[1] ?? "";
  return domain.toLowerCase() === allowedDomain(env);
}

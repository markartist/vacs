import { Env } from "../types/env";
import { nowIso } from "../utils/time";

export interface MagicLinkRecord {
  id: string;
  tokenHash: string;
  email: string;
  expiresAt: string;
  usedAt?: string | null;
  createdAt: string;
  requestIp?: string | null;
  userAgent?: string | null;
}

export interface AuthStore {
  createMagicLink(record: MagicLinkRecord): Promise<void>;
  consumeValidMagicLink(tokenHash: string, now: string): Promise<MagicLinkRecord | null>;
}

class D1AuthStore implements AuthStore {
  constructor(private readonly db: D1Database) {}

  async createMagicLink(record: MagicLinkRecord): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO auth_magic_links
        (id, token_hash, email, expires_at, used_at, created_at, request_ip, user_agent)
        VALUES (?, ?, ?, ?, NULL, ?, ?, ?)`
      )
      .bind(
        record.id,
        record.tokenHash,
        record.email,
        record.expiresAt,
        record.createdAt,
        record.requestIp ?? null,
        record.userAgent ?? null
      )
      .run();
  }

  async consumeValidMagicLink(tokenHash: string, now: string): Promise<MagicLinkRecord | null> {
    const row = await this.db
      .prepare(
        `SELECT id, token_hash, email, expires_at, used_at, created_at, request_ip, user_agent
         FROM auth_magic_links
         WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?
         LIMIT 1`
      )
      .bind(tokenHash, now)
      .first<{
        id: string;
        token_hash: string;
        email: string;
        expires_at: string;
        used_at: string | null;
        created_at: string;
        request_ip: string | null;
        user_agent: string | null;
      }>();

    if (!row) return null;

    await this.db.prepare(`UPDATE auth_magic_links SET used_at = ? WHERE id = ?`).bind(now, row.id).run();

    return {
      id: row.id,
      tokenHash: row.token_hash,
      email: row.email,
      expiresAt: row.expires_at,
      usedAt: now,
      createdAt: row.created_at,
      requestIp: row.request_ip,
      userAgent: row.user_agent,
    };
  }
}

class MemoryAuthStore implements AuthStore {
  private static readonly links = new Map<string, MagicLinkRecord>();

  async createMagicLink(record: MagicLinkRecord): Promise<void> {
    MemoryAuthStore.links.set(record.tokenHash, record);
  }

  async consumeValidMagicLink(tokenHash: string, now: string): Promise<MagicLinkRecord | null> {
    const record = MemoryAuthStore.links.get(tokenHash);
    if (!record) return null;
    if (record.usedAt) return null;
    if (record.expiresAt <= now) return null;

    record.usedAt = now;
    MemoryAuthStore.links.set(tokenHash, record);
    return record;
  }
}

export function authStoreFromEnv(env: Env): AuthStore {
  if (env.VACS_DB) return new D1AuthStore(env.VACS_DB);
  return new MemoryAuthStore();
}

export function newMagicLinkRecord(input: {
  tokenHash: string;
  email: string;
  expiresAt: string;
  requestIp?: string | null;
  userAgent?: string | null;
}): MagicLinkRecord {
  return {
    id: crypto.randomUUID(),
    tokenHash: input.tokenHash,
    email: input.email,
    expiresAt: input.expiresAt,
    createdAt: nowIso(),
    requestIp: input.requestIp ?? null,
    userAgent: input.userAgent ?? null,
  };
}

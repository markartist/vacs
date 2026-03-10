import { Env } from "../types/env";
import { nowIso, daysFromNowIso } from "../utils/time";
import { randomToken } from "../utils/crypto";

export interface MagicLinkRecord {
  id: string;
  tokenHash: string;
  email: string;
  expiresAt: string;
  usedAt: string | null;
  createdAt: string;
  requestIp: string | null;
  userAgent: string | null;
}

export interface SessionRecord {
  id: string;
  email: string;
  createdAt: string;
  expiresAt: string;
  revokedAt: string | null;
  requestIp: string | null;
  userAgent: string | null;
}

export interface NewMagicLinkInput {
  tokenHash: string;
  email: string;
  expiresAt: string;
  requestIp: string | null;
  userAgent: string | null;
}

export interface NewSessionInput {
  email: string;
  expiresAt: string;
  requestIp: string | null;
  userAgent: string | null;
}

export interface AuthStore {
  createMagicLink(record: MagicLinkRecord): Promise<void>;
  consumeValidMagicLink(tokenHash: string, now: string): Promise<MagicLinkRecord | null>;
  createSession(input: NewSessionInput): Promise<SessionRecord>;
  getActiveSession(sessionId: string, now: string): Promise<SessionRecord | null>;
  revokeSession(sessionId: string, revokedAt: string): Promise<void>;
}

export function newMagicLinkRecord(input: NewMagicLinkInput): MagicLinkRecord {
  return {
    id: randomToken(16),
    tokenHash: input.tokenHash,
    email: input.email,
    expiresAt: input.expiresAt,
    usedAt: null,
    createdAt: nowIso(),
    requestIp: input.requestIp,
    userAgent: input.userAgent,
  };
}

class D1AuthStore implements AuthStore {
  constructor(private readonly db: D1Database) {}

  async createMagicLink(record: MagicLinkRecord): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO auth_magic_links
          (id, token_hash, email, expires_at, used_at, created_at, request_ip, user_agent)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`
      )
      .bind(
        record.id,
        record.tokenHash,
        record.email,
        record.expiresAt,
        record.usedAt,
        record.createdAt,
        record.requestIp,
        record.userAgent
      )
      .run();
  }

  async consumeValidMagicLink(tokenHash: string, now: string): Promise<MagicLinkRecord | null> {
    const row = await this.db
      .prepare(
        `SELECT id, token_hash, email, expires_at, used_at, created_at, request_ip, user_agent
         FROM auth_magic_links
         WHERE token_hash = ?1 AND used_at IS NULL AND expires_at > ?2
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

    const consumedAt = nowIso();
    const result = await this.db
      .prepare(`UPDATE auth_magic_links SET used_at = ?1 WHERE id = ?2 AND used_at IS NULL`)
      .bind(consumedAt, row.id)
      .run();

    if ((result.meta.changes ?? 0) < 1) return null;

    return {
      id: row.id,
      tokenHash: row.token_hash,
      email: row.email,
      expiresAt: row.expires_at,
      usedAt: consumedAt,
      createdAt: row.created_at,
      requestIp: row.request_ip,
      userAgent: row.user_agent,
    };
  }

  async createSession(input: NewSessionInput): Promise<SessionRecord> {
    const record: SessionRecord = {
      id: randomToken(18),
      email: input.email,
      createdAt: nowIso(),
      expiresAt: input.expiresAt,
      revokedAt: null,
      requestIp: input.requestIp,
      userAgent: input.userAgent,
    };

    await this.db
      .prepare(
        `INSERT INTO auth_sessions
          (id, email, created_at, expires_at, revoked_at, request_ip, user_agent)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
      )
      .bind(
        record.id,
        record.email,
        record.createdAt,
        record.expiresAt,
        record.revokedAt,
        record.requestIp,
        record.userAgent
      )
      .run();

    return record;
  }

  async getActiveSession(sessionId: string, now: string): Promise<SessionRecord | null> {
    const row = await this.db
      .prepare(
        `SELECT id, email, created_at, expires_at, revoked_at, request_ip, user_agent
         FROM auth_sessions
         WHERE id = ?1 AND revoked_at IS NULL AND expires_at > ?2
         LIMIT 1`
      )
      .bind(sessionId, now)
      .first<{
        id: string;
        email: string;
        created_at: string;
        expires_at: string;
        revoked_at: string | null;
        request_ip: string | null;
        user_agent: string | null;
      }>();

    if (!row) return null;

    return {
      id: row.id,
      email: row.email,
      createdAt: row.created_at,
      expiresAt: row.expires_at,
      revokedAt: row.revoked_at,
      requestIp: row.request_ip,
      userAgent: row.user_agent,
    };
  }

  async revokeSession(sessionId: string, revokedAt: string): Promise<void> {
    await this.db
      .prepare(`UPDATE auth_sessions SET revoked_at = ?1 WHERE id = ?2 AND revoked_at IS NULL`)
      .bind(revokedAt, sessionId)
      .run();
  }
}

class MemoryAuthStore implements AuthStore {
  private readonly magicLinksByTokenHash = new Map<string, MagicLinkRecord>();
  private readonly sessionsById = new Map<string, SessionRecord>();

  async createMagicLink(record: MagicLinkRecord): Promise<void> {
    this.magicLinksByTokenHash.set(record.tokenHash, record);
  }

  async consumeValidMagicLink(tokenHash: string, now: string): Promise<MagicLinkRecord | null> {
    const record = this.magicLinksByTokenHash.get(tokenHash);
    if (!record) return null;
    if (record.usedAt) return null;
    if (record.expiresAt <= now) return null;
    record.usedAt = nowIso();
    return record;
  }

  async createSession(input: NewSessionInput): Promise<SessionRecord> {
    const record: SessionRecord = {
      id: randomToken(18),
      email: input.email,
      createdAt: nowIso(),
      expiresAt: input.expiresAt,
      revokedAt: null,
      requestIp: input.requestIp,
      userAgent: input.userAgent,
    };
    this.sessionsById.set(record.id, record);
    return record;
  }

  async getActiveSession(sessionId: string, now: string): Promise<SessionRecord | null> {
    const record = this.sessionsById.get(sessionId);
    if (!record) return null;
    if (record.revokedAt) return null;
    if (record.expiresAt <= now) return null;
    return record;
  }

  async revokeSession(sessionId: string, revokedAt: string): Promise<void> {
    const record = this.sessionsById.get(sessionId);
    if (!record || record.revokedAt) return;
    record.revokedAt = revokedAt;
  }
}

const memoryStore = new MemoryAuthStore();

export function sessionExpiresAt(days: number): string {
  return daysFromNowIso(days);
}

export function authStoreFromEnv(env: Env): AuthStore {
  if (env.VACS_DB) return new D1AuthStore(env.VACS_DB);
  if ((env.APP_ENV ?? "").toLowerCase() === "production") {
    throw new Error("VACS_DB binding is required in production for auth/session persistence");
  }
  return memoryStore;
}

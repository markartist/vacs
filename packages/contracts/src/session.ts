export type VacsSessionRole = "viewer" | "editor" | "admin";

export interface VacsUserIdentity {
  email: string;
  displayName?: string;
  roles: VacsSessionRole[];
}

export interface VacsSessionState {
  sessionId: string;
  user: VacsUserIdentity;
  issuedAt: string;
  expiresAt: string;
  authenticated: boolean;
}

export interface SessionValidationResult {
  ok: boolean;
  reason?: "missing_cookie" | "invalid_signature" | "expired" | "revoked" | "unknown";
  session?: VacsSessionState;
}

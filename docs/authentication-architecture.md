# Authentication Architecture

This phase implements Data Pond-style magic-link authentication and protected application shell access.

## Components
- `apps/web`: login UI + authenticated shell routes
- `apps/api`: Worker auth/session endpoints + protected route enforcement

## Magic Link Flow
1. User visits `/login` and submits email.
2. Web calls `POST /auth/request-link` (Worker).
3. Worker validates email policy and generates secure random token.
4. Worker stores token hash + expiration in auth store (`auth_magic_links` in D1; memory fallback only for non-production local setup).
5. Worker sends magic link via email sender layer.
6. User opens `/auth/verify?token=...`.
7. Web verify page redirects to Worker `GET /auth/verify?token=...`.
8. Worker validates token, marks it used, creates a persistent session record in D1 (`auth_sessions`), and issues a signed session cookie containing `sid`.
9. Worker redirects to `/app/dashboard`.

## Session Strategy
- Session cookie is signed (`vacs_session`) and references a persisted session with payload:
  - session id (`sid`)
  - email
  - issued-at timestamp
  - expiration timestamp
- Signature algorithm: HMAC-SHA256
- Key source: `SESSION_SIGNING_SECRET` (Worker secret)
- Session validation path:
  1. Verify cookie signature and expiration.
  2. Resolve `sid` in `auth_sessions`.
  3. Reject if missing, expired, revoked, or email mismatch.

## Route Protection Model
### Public
- `/login` (web)
- `/auth/verify` (web)
- `/auth/request-link` (api)
- `/auth/verify` (api)

### Protected
- `/app` (api)
- `/app/dashboard` (api)
- `/app/*` (web, enforced by Next middleware checking Worker `/auth/session`)

## Corporate Email Restriction
Prepared with env policy controls:
- `ENFORCE_CORPORATE_EMAIL`
- `ALLOWED_EMAIL_DOMAIN`

Set `ENFORCE_CORPORATE_EMAIL=true` to restrict login requests to `@venterraliving.com`.

## Storage Posture
- D1 `auth_magic_links`: one-time magic link token hashes and audit metadata.
- D1 `auth_sessions`: session lifecycle with expiration and revocation.
- Setup fallback (dev-only): memory auth store when D1 binding is unavailable.
- Production posture: D1 binding required; Worker throws startup-time auth errors when missing.

## Email Delivery Layer
- Provider interface implemented in Worker.
- Supported providers:
  - `console` (local development only)
  - `resend` (production-ready)
  - `sendgrid` (production-ready)
  - `ses` (declared but intentionally not wired yet)
- Fallback behavior:
  - Non-production may use `console`.
  - Production should use `resend` or `sendgrid`.

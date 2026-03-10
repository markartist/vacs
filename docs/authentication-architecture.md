# Authentication Architecture

This phase implements Data Pond-style magic-link authentication and protected application shell access.

## Components
- `apps/web`: login UI + authenticated shell routes
- `apps/api`: Worker auth/session endpoints + protected route enforcement

## Magic Link Flow
1. User visits `/login` and submits email.
2. Web calls `POST /auth/request-link` (Worker).
3. Worker validates email policy and generates secure random token.
4. Worker stores token hash + expiration in auth store (D1 preferred, memory fallback in setup mode).
5. Worker sends magic link via email sender layer.
6. User opens `/auth/verify?token=...`.
7. Web verify page redirects to Worker `GET /auth/verify?token=...`.
8. Worker validates token, marks it used, issues signed session cookie.
9. Worker redirects to `/app/dashboard`.

## Session Strategy
- Session is a signed cookie (`vacs_session`) with payload:
  - email
  - issued-at timestamp
  - expiration timestamp
- Signature algorithm: HMAC-SHA256
- Key source: `SESSION_SIGNING_SECRET` (Worker secret)
- Session validated at Worker on protected API routes.

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
- Primary prepared target: D1 table `auth_magic_links`.
- Setup fallback: in-memory store (non-persistent, dev-only).

## Email Delivery Layer
- Provider interface prepared in Worker.
- Setup mode default: `EMAIL_PROVIDER=console` (logs link)
- Placeholder providers available for later wiring:
  - Resend
  - SendGrid
  - Amazon SES

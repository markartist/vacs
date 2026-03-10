# Deployment Notes

## Scope of Current Deployables
- API Worker (authentication/session/protected routes)
- Web shell (login + app shell)

## Runtime Posture for `vacs.venterradev.com`
- Intended user-facing host: `https://vacs.venterradev.com`
- Worker route in production: `vacs.venterradev.com/*`
- `FRONTEND_BASE_URL` and `API_BASE_URL` should both resolve to `https://vacs.venterradev.com`

This keeps login, token verification, and session cookies on one domain and avoids cross-site cookie instability.

## API Deployment
```bash
cd apps/api
npx wrangler deploy --env production
```

Validate:
- `GET https://vacs.venterradev.com/health`
- `POST https://vacs.venterradev.com/auth/request-link`
- `GET https://vacs.venterradev.com/auth/session` (401 without cookie)

## Web Deploy
Current repository includes app shell implementation in `apps/web`.
Deployment target (Cloudflare Pages or equivalent) should serve the same hostname, with Worker handling `/auth/*` and protected `/app/*` API checks.

## Routing Expectation
- Public login/auth routes accessible without session
- Protected `/app/*` routes require valid session
- API validates session state for protected endpoints

## D1 Migration Requirement
Before production auth rollout, apply migrations in order:
```bash
cd apps/api
npx wrangler d1 migrations apply vacs-db --env production
```

Required tables:
- `auth_magic_links`
- `auth_sessions`

## Deferred
- Content generation runtime
- Queue-driven orchestration
- Evaluation workflows

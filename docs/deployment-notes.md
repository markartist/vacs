# Deployment Notes

## Scope of Current Deployables
- API Worker (authentication/session/protected routes)
- Web shell (login + app shell)

## API Deploy
```bash
cd apps/api
npx wrangler deploy --env production
```

Validate:
- `GET https://vacs.venterradev.com/health`

## Web Deploy
Current repository includes app shell implementation in `apps/web`.
Deployment target (Cloudflare Pages or equivalent) should be finalized in planning.

## Routing Expectation
- Public login/auth routes accessible without session
- Protected `/app/*` routes require valid session
- API validates session state for protected endpoints

## Deferred
- Content generation runtime
- Queue-driven orchestration
- Evaluation workflows

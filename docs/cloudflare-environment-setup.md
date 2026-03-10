# Cloudflare Environment Setup

## Intended Runtime Hostname
- `vacs.venterradev.com`

## API Worker
- Config: `apps/api/wrangler.toml`
- Production route prepared:
  - `vacs.venterradev.com/*`

## Auth Data Store
- D1 migration files:
  - `apps/api/migrations/0001_auth.sql`
  - `apps/api/migrations/0002_auth_sessions.sql`

Apply when D1 is provisioned:
```bash
cd apps/api
npx wrangler d1 migrations apply vacs-db --env production
```

## Session and Email Secrets
Set with Wrangler:
```bash
cd apps/api
npx wrangler secret put SESSION_SIGNING_SECRET
npx wrangler secret put RESEND_API_KEY
# or
npx wrangler secret put SENDGRID_API_KEY
```

## DNS and Routing Checklist
1. Ensure Cloudflare zone `venterradev.com` is active.
2. Deploy Worker in production environment.
3. Confirm `routes` in `wrangler.toml` include `vacs.venterradev.com/*`.
4. Ensure DNS for `vacs` exists/proxies through Cloudflare.
5. Set production Worker vars:
   - `APP_ENV=production`
   - `API_BASE_URL=https://vacs.venterradev.com`
   - `FRONTEND_BASE_URL=https://vacs.venterradev.com`
   - `ENFORCE_CORPORATE_EMAIL=true` (when ready)
   - `EMAIL_PROVIDER=resend` or `sendgrid`

## Prepared Future Bindings
- D1
- KV
- R2
- Vectorize
- Queues
- AI Gateway vars

These are scaffolded for future phases; business logic is intentionally deferred.

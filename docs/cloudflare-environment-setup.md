# Cloudflare Environment Setup

## Intended Runtime Hostname
- `vacs.venterradev.com`

## API Worker
- Config: `apps/api/wrangler.toml`
- Production route prepared:
  - `vacs.venterradev.com/*`

## Auth Data Store
- D1 table migration file:
  - `apps/api/migrations/0001_auth.sql`

Apply when D1 is provisioned:
```bash
cd apps/api
npx wrangler d1 migrations apply vacs-db --local
```

## Session and Email Secrets
Set with Wrangler:
```bash
cd apps/api
npx wrangler secret put SESSION_SIGNING_SECRET
```

(Provider-specific secrets as needed later.)

## Prepared Future Bindings
- D1
- KV
- R2
- Vectorize
- Queues
- AI Gateway vars

These are scaffolded for future phases; business logic is intentionally deferred.

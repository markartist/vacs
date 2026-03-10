# Required Configuration

## Worker Vars (`wrangler.toml`)
- `APP_ENV`
- `API_BASE_URL`
- `FRONTEND_BASE_URL`
- `MAGIC_LINK_TTL_MINUTES`
- `SESSION_TTL_DAYS`
- `ENFORCE_CORPORATE_EMAIL`
- `ALLOWED_EMAIL_DOMAIN`
- `EMAIL_PROVIDER`
- `EMAIL_FROM`

## Worker Secrets
- `SESSION_SIGNING_SECRET` (required for auth)
- `RESEND_API_KEY` (if using Resend)
- `SENDGRID_API_KEY` (if using SendGrid)
- `AWS_SES_SMTP_USERNAME` (if using SES SMTP)
- `AWS_SES_SMTP_PASSWORD` (if using SES SMTP)

## Frontend Env (`apps/web/.env.local`)
- `NEXT_PUBLIC_API_BASE_URL`

## Cloudflare Bindings
- Required for production auth/session:
  - D1: `VACS_DB`
- Prepared for future modules:
- D1: `VACS_DB`
- KV: `VACS_AUTH_KV`
- R2: `VACS_ASSETS`
- Vectorize: `VACS_VECTOR_INDEX`
- Queue: `VACS_GENERATION_QUEUE`

## Recommended Production Values
- `APP_ENV=production`
- `API_BASE_URL=https://vacs.venterradev.com`
- `FRONTEND_BASE_URL=https://vacs.venterradev.com`
- `ENFORCE_CORPORATE_EMAIL=true` (when policy goes live)
- `EMAIL_PROVIDER=resend` or `EMAIL_PROVIDER=sendgrid`

# Email Provider Integration

## Supported Providers in Code
- `console` (local development)
- `resend` (HTTP API integration implemented)
- `sendgrid` (HTTP API integration implemented)
- `ses` (placeholder only; not implemented yet)

## Provider Selection
Set `EMAIL_PROVIDER` in Worker vars:
- `console` in local setup mode
- `resend` or `sendgrid` in production

Set sender identity:
- `EMAIL_FROM` (for example: `noreply@venterradev.com`)

Set provider secret:
- `RESEND_API_KEY` for Resend
- `SENDGRID_API_KEY` for SendGrid

## Worker Secret Commands
```bash
cd apps/api
npx wrangler secret put SESSION_SIGNING_SECRET
npx wrangler secret put RESEND_API_KEY
# or
npx wrangler secret put SENDGRID_API_KEY
```

## Request Model
Magic-link emails include both text and HTML content and contain:
- secure sign-in URL
- short lifetime expectation
- one-time-use behavior context

## Security Notes
- Never commit provider API keys.
- Use Wrangler secrets for all provider credentials.
- Keep magic-link URLs out of logs outside development.
- Use a verified sender domain with SPF/DKIM/DMARC configured before production.

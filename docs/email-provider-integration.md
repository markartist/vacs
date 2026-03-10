# Email Provider Integration (Prepared, Not Final)

## Current Mode
- `EMAIL_PROVIDER=console`
- Magic links are logged for development/testing.

## Planned Providers
- Resend
- SendGrid
- Amazon SES

## Required Configuration (later)
- `EMAIL_PROVIDER`
- `EMAIL_FROM`
- Provider API credentials/secrets

## Security Notes
- Never commit provider API keys.
- Use Wrangler secrets for all provider credentials.
- Keep token payload out of logs outside development.

# Cloudflare Environment Setup

## Intended Hostname
- `vacs.venterradev.com`

## Worker
- App: `apps/api`
- Wrangler config: `apps/api/wrangler.toml`

## Required Cloudflare Resources (Prepared as placeholders)
- D1: `VACS_DB`
- R2: `VACS_ASSETS`
- Vectorize: `VACS_VECTOR_INDEX`
- Queues: `VACS_GENERATION_QUEUE`
- AI Gateway: `AI_GATEWAY_BASE_URL` var

## Setup Notes
1. Create resources in Cloudflare account.
2. Replace placeholder IDs/names in wrangler config.
3. Configure production route for `vacs.venterradev.com`.
4. Deploy with:
   ```bash
   cd apps/api
   npx wrangler deploy --env production
   ```

## What Is Not Final
- Final binding names
- Final queue topology
- Final AI gateway routing strategy

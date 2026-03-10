# Deployment Notes

## Current posture
- Foundation deploy only (`/health` endpoint)
- No production business logic yet

## Suggested deployment flow
1. Validate config
2. Deploy staging/dev
3. Verify `/health`
4. Deploy production route env

## Post-deploy validation
- `GET https://vacs.venterradev.com/health` returns status `ok`

# Development Setup

## Prerequisites
- Node.js 20.x
- npm 10+

## Install
```bash
npm install
```

## Run API (Worker)
```bash
npm run dev:api
```

## Run Web
```bash
npm run dev:web
```

## Health Check
```bash
curl http://localhost:8787/health
```

## Login Test (Setup Mode)
1. Open `http://localhost:3000/login`
2. Enter email and request magic link
3. Use returned `preview_link` in development (console provider)
4. Confirm redirect into `/app/dashboard`

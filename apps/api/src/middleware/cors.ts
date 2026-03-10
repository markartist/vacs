import { Context, Next } from "hono";

const ALLOWED_ORIGINS = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://vacs.venterradev.com",
]);

export async function corsMiddleware(c: Context, next: Next): Promise<void> {
  const origin = c.req.header("origin") ?? "";
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    c.header("Access-Control-Allow-Origin", origin);
    c.header("Access-Control-Allow-Credentials", "true");
    c.header("Vary", "Origin");
  }
  c.header("Access-Control-Allow-Headers", "Content-Type");
  c.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (c.req.method === "OPTIONS") {
    c.status(204);
    return;
  }
  await next();
}

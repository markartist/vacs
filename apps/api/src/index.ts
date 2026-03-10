import { Hono } from "hono";
import { Env, Variables } from "./types/env";
import { corsMiddleware } from "./middleware/cors";
import { auth } from "./routes/auth";
import { appRoutes } from "./routes/app";

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

app.use("*", corsMiddleware);

app.get("/health", (c) =>
  c.json({
    status: "ok",
    service: "vacs-api",
    mode: "auth-shell",
    env: c.env.APP_ENV ?? "unknown",
    timestamp: new Date().toISOString(),
  })
);

app.route("/auth", auth);
app.route("/app", appRoutes);

app.notFound((c) => c.json({ error: "NOT_FOUND", message: "Route not found" }, 404));

app.onError((err, c) => {
  console.error("Unhandled API error", err);
  return c.json({ error: "INTERNAL_ERROR", message: "Unexpected error" }, 500);
});

export default app;

import { Hono } from "hono";
import { Env, Variables } from "../types/env";
import { requireSession } from "../middleware/require-session";

const appRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();
appRoutes.use("*", requireSession);

appRoutes.get("/", (c) => {
  return c.json({
    ok: true,
    message: "Authenticated application route",
    user: c.get("userEmail"),
  });
});

appRoutes.get("/dashboard", (c) => {
  return c.json({
    ok: true,
    user: c.get("userEmail"),
    cards: [
      { id: "jobs", title: "Content Jobs", status: "placeholder" },
      { id: "prompts", title: "Prompt Library", status: "placeholder" },
      { id: "policies", title: "Policy Checks", status: "placeholder" },
      { id: "governance", title: "Governance Queue", status: "placeholder" },
    ],
  });
});

export { appRoutes };

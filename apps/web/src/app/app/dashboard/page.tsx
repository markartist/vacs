import { cookies } from "next/headers";
import { AppShell } from "../../../components/app-shell";
import { DashboardCards } from "../../../components/dashboard-cards";
import { apiBaseUrl } from "../../../lib/config";

async function getSession() {
  const cookieHeader = cookies().toString();
  const res = await fetch(`${apiBaseUrl()}/auth/session`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json() as Promise<{ authenticated: boolean; email?: string }>;
}

export default async function DashboardPage() {
  const session = await getSession();
  const userEmail = session?.email;

  return (
    <AppShell userEmail={userEmail}>
      <h2 style={{ marginTop: 0, color: "#15284b" }}>Dashboard</h2>
      <p style={{ color: "#475569" }}>
        Authenticated VACS shell is ready. Content generation modules will be added in later phases.
      </p>
      <DashboardCards />
    </AppShell>
  );
}

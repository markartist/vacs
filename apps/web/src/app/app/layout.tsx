import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppShell } from "../../components/app-shell";
import { apiBaseUrl } from "../../lib/config";

async function getSession() {
  const cookieHeader = cookies().toString();
  const res = await fetch(`${apiBaseUrl()}/auth/session`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json() as Promise<{ authenticated: boolean; email?: string }>;
}

export default async function ProtectedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session?.authenticated) {
    redirect("/login");
  }

  return <AppShell userEmail={session.email}>{children}</AppShell>;
}

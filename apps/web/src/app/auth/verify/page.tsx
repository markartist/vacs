import { redirect } from "next/navigation";
import { apiBaseUrl } from "../../../lib/config";

export const dynamic = "force-dynamic";

export default function VerifyPage({
  searchParams,
}: {
  searchParams?: { token?: string | string[] };
}) {
  const rawToken = searchParams?.token;
  const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;

  if (!token) {
    redirect("/login?error=missing_token");
  }

  const verifyUrl = `${apiBaseUrl()}/auth/verify?token=${encodeURIComponent(token)}`;
  redirect(verifyUrl);
}

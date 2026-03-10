import { apiBaseUrl } from "./config";

export interface RequestLinkResponse {
  ok: boolean;
  message: string;
  expires_in_minutes?: number;
  preview_link?: string;
  error?: string;
}

export async function requestMagicLink(email: string): Promise<RequestLinkResponse> {
  const res = await fetch(`${apiBaseUrl()}/auth/request-link`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function logout(): Promise<void> {
  await fetch(`${apiBaseUrl()}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

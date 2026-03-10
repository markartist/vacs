"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { apiBaseUrl } from "../../../lib/config";

export default function VerifyPage() {
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      window.location.href = "/login?error=missing_token";
      return;
    }
    const verifyUrl = `${apiBaseUrl()}/auth/verify?token=${encodeURIComponent(token)}`;
    window.location.href = verifyUrl;
  }, [params]);

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Verifying Login</h1>
        <p className="login-subtitle">Please wait while we authenticate your session.</p>
      </div>
    </div>
  );
}

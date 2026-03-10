"use client";

import { FormEvent, useState } from "react";
import { requestMagicLink } from "../../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [previewLink, setPreviewLink] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setPreviewLink("");
    try {
      const response = await requestMagicLink(email);
      if (response.error) {
        setMessage(response.message ?? response.error);
      } else {
        setMessage(response.message ?? "Check your email for the login link.");
        if (response.preview_link) setPreviewLink(response.preview_link);
      }
    } catch {
      setMessage("Request failed. Verify API is running and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Venterra AI Content Suite</h1>
        <p className="login-subtitle">Sign in with a secure magic link.</p>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="input"
            required
            placeholder="you@venterraliving.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Sending Link..." : "Send Magic Link"}
          </button>
        </form>

        {message ? <div className="status">{message}</div> : null}
        {previewLink ? (
          <a className="preview-link" href={previewLink}>
            Dev preview link: {previewLink}
          </a>
        ) : null}
      </div>
    </div>
  );
}

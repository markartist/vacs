import { Env } from "../types/env";

export interface MagicLinkEmailInput {
  to: string;
  magicLink: string;
}

export interface EmailSender {
  sendMagicLink(input: MagicLinkEmailInput): Promise<void>;
}

class ConsoleEmailSender implements EmailSender {
  constructor(private readonly env: Env) {}

  async sendMagicLink(input: MagicLinkEmailInput): Promise<void> {
    console.log("[email:console] Magic link", {
      provider: this.env.EMAIL_PROVIDER ?? "console",
      from: this.env.EMAIL_FROM ?? "noreply@venterradev.com",
      to: input.to,
      magicLink: input.magicLink,
    });
  }
}

function senderEmail(env: Env): string {
  return env.EMAIL_FROM ?? "noreply@venterradev.com";
}

function magicLinkEmailText(input: MagicLinkEmailInput): string {
  return `Use this secure link to sign in to Venterra AI Content Suite:\n\n${input.magicLink}\n\nThis link expires shortly and can only be used once.`;
}

function magicLinkEmailHtml(input: MagicLinkEmailInput): string {
  return `
<div style="font-family:Segoe UI,Arial,sans-serif;background:#f5f7fb;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #dbe3ef;border-radius:10px;padding:24px;">
    <h1 style="margin:0 0 12px 0;font-size:22px;color:#13314f;">Venterra AI Content Suite</h1>
    <p style="margin:0 0 14px 0;color:#334155;line-height:1.5;">Use the secure button below to sign in.</p>
    <p style="margin:0 0 18px 0;">
      <a href="${input.magicLink}" style="display:inline-block;background:#13314f;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:600;">Sign In</a>
    </p>
    <p style="margin:0;color:#475569;line-height:1.5;font-size:13px;">If the button does not work, open this URL:<br/><span style="word-break:break-all;color:#0f4d63;">${input.magicLink}</span></p>
  </div>
</div>
  `.trim();
}

class ResendEmailSender implements EmailSender {
  constructor(private readonly env: Env) {}

  async sendMagicLink(input: MagicLinkEmailInput): Promise<void> {
    const apiKey = this.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: senderEmail(this.env),
        to: [input.to],
        subject: "Your VACS secure sign-in link",
        html: magicLinkEmailHtml(input),
        text: magicLinkEmailText(input),
      }),
    });

    if (!response.ok) {
      const details = await response.text().catch(() => "unknown error");
      throw new Error(`Resend send failed (${response.status}): ${details}`);
    }
  }
}

class SendGridEmailSender implements EmailSender {
  constructor(private readonly env: Env) {}

  async sendMagicLink(input: MagicLinkEmailInput): Promise<void> {
    const apiKey = this.env.SENDGRID_API_KEY;
    if (!apiKey) throw new Error("SENDGRID_API_KEY is not configured");

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { email: senderEmail(this.env) },
        personalizations: [{ to: [{ email: input.to }] }],
        subject: "Your VACS secure sign-in link",
        content: [
          { type: "text/plain", value: magicLinkEmailText(input) },
          { type: "text/html", value: magicLinkEmailHtml(input) },
        ],
      }),
    });

    if (!response.ok) {
      const details = await response.text().catch(() => "unknown error");
      throw new Error(`SendGrid send failed (${response.status}): ${details}`);
    }
  }
}

class SesPlaceholderSender implements EmailSender {
  async sendMagicLink(_input: MagicLinkEmailInput): Promise<void> {
    throw new Error("SES provider is not wired yet in this repository. Use Resend or SendGrid.");
  }
}

class UnknownProviderSender implements EmailSender {
  constructor(private readonly provider: string) {}

  async sendMagicLink(_input: MagicLinkEmailInput): Promise<void> {
    throw new Error(`Unknown EMAIL_PROVIDER '${this.provider}'. Supported values: console, resend, sendgrid, ses.`);
  }
}

export function emailSenderFromEnv(env: Env): EmailSender {
  const provider = (env.EMAIL_PROVIDER ?? "console").toLowerCase();
  if (provider === "console") return new ConsoleEmailSender(env);
  if (provider === "resend") return new ResendEmailSender(env);
  if (provider === "sendgrid") return new SendGridEmailSender(env);
  if (provider === "ses") return new SesPlaceholderSender();
  return new UnknownProviderSender(provider);
}

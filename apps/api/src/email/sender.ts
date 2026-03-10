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

class PlaceholderProviderSender implements EmailSender {
  constructor(private readonly provider: string) {}

  async sendMagicLink(_input: MagicLinkEmailInput): Promise<void> {
    throw new Error(
      `Email provider '${this.provider}' is not wired yet. Use EMAIL_PROVIDER=console in setup mode.`
    );
  }
}

export function emailSenderFromEnv(env: Env): EmailSender {
  const provider = (env.EMAIL_PROVIDER ?? "console").toLowerCase();
  if (provider === "console") return new ConsoleEmailSender(env);
  return new PlaceholderProviderSender(provider);
}

export interface Env {
  APP_NAME: string;
  APP_ENV: "development" | "production" | string;
  API_BASE_URL: string;
  FRONTEND_BASE_URL: string;

  ALLOWED_EMAIL_DOMAIN?: string;
  ENFORCE_CORPORATE_EMAIL?: "true" | "false" | string;
  MAGIC_LINK_TTL_MINUTES?: string;
  SESSION_TTL_DAYS?: string;
  COOKIE_DOMAIN?: string;

  EMAIL_PROVIDER?: "console" | "resend" | "sendgrid" | "ses" | string;
  EMAIL_FROM?: string;
  SESSION_SIGNING_SECRET?: string;

  RESEND_API_KEY?: string;
  SENDGRID_API_KEY?: string;
  AWS_SES_SMTP_USERNAME?: string;
  AWS_SES_SMTP_PASSWORD?: string;

  AI_GATEWAY_BASE_URL?: string;
  AI_GATEWAY_ENABLED?: string;

  VACS_DB?: D1Database;
  VACS_AUTH_KV?: KVNamespace;
  VACS_ASSETS?: R2Bucket;
  VACS_VECTOR_INDEX?: VectorizeIndex;
  VACS_GENERATION_QUEUE?: Queue;
}

export interface Variables {
  userEmail: string;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function stringToBytes(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

function stringToBuffer(value: string): ArrayBuffer {
  return stringToBytes(value).buffer as ArrayBuffer;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  const b64 = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (value.length % 4 || 4)) % 4);
  const binary = atob(b64);
  return Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
}

function bytesToBuffer(bytes: Uint8Array): ArrayBuffer {
  const out = new Uint8Array(bytes.length);
  out.set(bytes);
  return out.buffer as ArrayBuffer;
}

export async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", stringToBuffer(input));
  return bytesToHex(new Uint8Array(digest));
}

export function randomToken(length = 32): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytesToBase64Url(bytes);
}

export async function signHmacSha256(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    stringToBuffer(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, stringToBuffer(payload));
  return bytesToBase64Url(new Uint8Array(signature));
}

export async function verifyHmacSha256(payload: string, signature: string, secret: string): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    "raw",
    stringToBuffer(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  return crypto.subtle.verify("HMAC", key, bytesToBuffer(base64UrlToBytes(signature)), stringToBuffer(payload));
}

export function encodeBase64UrlJson(value: unknown): string {
  return bytesToBase64Url(stringToBytes(JSON.stringify(value)));
}

export function decodeBase64UrlJson<T>(value: string): T {
  const bytes = base64UrlToBytes(value);
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json) as T;
}

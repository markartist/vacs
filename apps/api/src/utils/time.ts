export function nowIso(): string {
  return new Date().toISOString();
}

export function minutesFromNowIso(minutes: number): string {
  return new Date(Date.now() + minutes * 60_000).toISOString();
}

export function daysFromNowIso(days: number): string {
  return new Date(Date.now() + days * 24 * 60 * 60_000).toISOString();
}

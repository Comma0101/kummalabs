// Verifies that a request really came from Retell. Per Retell's docs the `X-Retell-Signature`
// header is `v={unix ms},d={hex}` where d = HMAC-SHA256(rawBody + timestamp, apiKey), and the
// timestamp must be within 5 minutes. Dependency-free so `node --test` can import it.
import { createHmac, timingSafeEqual } from "node:crypto";

const WINDOW_MS = 5 * 60 * 1000;

export function verifyRetellSignature(
  rawBody: string,
  signature: string | null | undefined,
  apiKey: string | null | undefined,
  now: number,
): boolean {
  if (!apiKey || !signature) return false;
  const match = /^v=(\d+),d=([0-9a-f]+)$/i.exec(signature.trim());
  if (!match) return false;

  const timestamp = Number(match[1]);
  if (!Number.isFinite(timestamp) || Math.abs(now - timestamp) > WINDOW_MS) return false;

  const expected = createHmac("sha256", apiKey).update(rawBody + match[1]).digest();
  const given = Buffer.from(match[2], "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}

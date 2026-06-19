export async function checkRateLimit(
  kv: KVNamespace,
  ip: string,
  maxRequests = 10,
): Promise<boolean> {
  const minute = Math.floor(Date.now() / 60_000);
  const key = `ratelimit:${ip}:${minute}`;
  const current = await kv.get(key);
  const count = parseInt(current ?? "0", 10);
  if (count >= maxRequests) return false;
  await kv.put(key, String(count + 1), { expirationTtl: 120 });
  return true;
}

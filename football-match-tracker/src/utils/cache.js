const cache = new Map();

export async function cachedFetch(key, fetchFn, ttlMs = 5 * 60 * 1000) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < ttlMs) {
    return cached.data;
  }
  // Checkar så datn fortfarande är giltig
  const data = await fetchFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
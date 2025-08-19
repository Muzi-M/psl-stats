import cache from "./cache";

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  cacheKey?: string;
  forceRefresh?: boolean;
}

/**
 * Cached fetcher utility that automatically handles caching for API calls
 */
export async function cachedFetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    method = "GET",
    headers = {},
    body,
    cacheKey,
    forceRefresh = false,
  } = options;

  // Only cache GET requests
  if (method !== "GET") {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Extract endpoint name from URL for caching
  const endpoint =
    cacheKey || url.split("/api/")[1]?.split("?")[0] || "unknown";

  // Extract query parameters for cache key
  const urlObj = new URL(
    url,
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000"
  );
  const params: Record<string, any> = {};
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  // Check cache first (unless force refresh is requested)
  if (!forceRefresh) {
    const cachedData = cache.get<T>(endpoint, params);
    if (cachedData) {
      return cachedData;
    }
  }

  // Fetch fresh data
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  // Cache the response
  cache.set(endpoint, data, params);

  return data;
}

/**
 * Prefetch data for better user experience
 */
export async function prefetchData<T>(
  url: string,
  cacheKey?: string
): Promise<void> {
  try {
    await cachedFetch<T>(url, { cacheKey });
  } catch (error) {
    console.warn("Prefetch failed:", error);
  }
}

/**
 * Clear cache for specific endpoint
 */
export function clearCache(
  endpoint: string,
  params?: Record<string, any>
): void {
  if (params) {
    cache.clear(endpoint, params);
  } else {
    cache.clearEndpoint(endpoint);
  }
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return cache.getStats();
}

/**
 * Clear all cache
 */
export function clearAllCache(): void {
  cache.clearAll();
}

// Export cache instance for direct access if needed
export { cache };

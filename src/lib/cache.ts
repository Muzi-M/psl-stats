interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheConfig {
  [key: string]: number; // Cache duration in milliseconds
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>();
  private config: CacheConfig;

  constructor(config: CacheConfig = {}) {
    this.config = {
      // Default cache durations (in milliseconds)
      standings: 5 * 60 * 1000, // 5 minutes
      players: 10 * 60 * 1000, // 10 minutes
      fixtures: 15 * 60 * 1000, // 15 minutes
      teams: 60 * 60 * 1000, // 1 hour
      overview: 5 * 60 * 1000, // 5 minutes
      ...config,
    };
  }

  /**
   * Generate a cache key based on endpoint and parameters
   */
  private generateKey(
    endpoint: string,
    params: Record<string, any> = {}
  ): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map((key) => `${key}:${params[key]}`)
      .join("|");

    return `${endpoint}${sortedParams ? `|${sortedParams}` : ""}`;
  }

  /**
   * Get data from cache
   */
  get<T>(endpoint: string, params: Record<string, any> = {}): T | null {
    const key = this.generateKey(endpoint, params);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if cache has expired
    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Set data in cache
   */
  set<T>(endpoint: string, data: T, params: Record<string, any> = {}): void {
    const key = this.generateKey(endpoint, params);
    const ttl = this.config[endpoint] || this.config.standings; // Default to standings TTL

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * Clear specific cache entry
   */
  clear(endpoint: string, params: Record<string, any> = {}): void {
    const key = this.generateKey(endpoint, params);
    this.cache.delete(key);
  }

  /**
   * Clear all cache entries for a specific endpoint
   */
  clearEndpoint(endpoint: string): void {
    for (const key of this.cache.keys()) {
      if (key.startsWith(endpoint)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache
   */
  clearAll(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  /**
   * Clean expired entries
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// Create a singleton instance
const cache = new MemoryCache();

// Cleanup expired entries every 5 minutes
if (typeof window === "undefined") {
  setInterval(() => {
    cache.cleanup();
  }, 5 * 60 * 1000);
}

export default cache;

// Export types for use in other files
export type { CacheEntry, CacheConfig };

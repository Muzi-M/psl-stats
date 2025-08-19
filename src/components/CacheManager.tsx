"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Trash2, RefreshCw, Database } from "lucide-react";

interface CacheStats {
  size: number;
  keys: string[];
}

export default function CacheManager() {
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cache");
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
        setMessage("Cache statistics updated");
      } else {
        setMessage("Failed to fetch cache statistics");
      }
    } catch (error) {
      setMessage("Error fetching cache statistics");
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllCache = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cache", { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        setMessage("All cache cleared successfully");
        fetchStats(); // Refresh stats
      } else {
        setMessage("Failed to clear cache");
      }
    } catch (error) {
      setMessage("Error clearing cache");
    } finally {
      setIsLoading(false);
    }
  };

  const clearEndpointCache = async (endpoint: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/cache?endpoint=${endpoint}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setMessage(`Cache cleared for ${endpoint}`);
        fetchStats(); // Refresh stats
      } else {
        setMessage("Failed to clear endpoint cache");
      }
    } catch (error) {
      setMessage("Error clearing endpoint cache");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <Card className="hover:shadow-xl transition-all duration-300 ease-out">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Cache Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Cache Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{stats?.size || 0}</div>
              <div className="text-sm text-muted-foreground">
                Cached Entries
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">
                {stats?.keys?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Unique Keys</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">
                {stats?.keys?.filter((key) => key.includes("overview"))
                  .length || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Overview Cache
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={fetchStats}
              disabled={isLoading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh Stats
            </Button>
            <Button
              onClick={clearAllCache}
              disabled={isLoading}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All Cache
            </Button>
          </div>

          {/* Message */}
          {message && (
            <div className="p-3 bg-muted rounded-lg text-sm">{message}</div>
          )}

          {/* Cache Keys */}
          {stats?.keys && stats.keys.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Cached Endpoints:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {stats.keys.map((key, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-background border rounded-lg"
                  >
                    <span className="text-sm font-mono truncate">{key}</span>
                    <Button
                      onClick={() => clearEndpointCache(key)}
                      disabled={isLoading}
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

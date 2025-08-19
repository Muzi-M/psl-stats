"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PlayerRadarChart,
  PlayerComparisonRadarChart,
  preparePlayerRadarData,
} from "@/components/ui/radar-chart";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Eye, EyeOff } from "lucide-react";

interface Player {
  player: {
    name: string;
    photo: string;
    age: number;
  };
  statistics: {
    games: {
      appearences: number;
      position: string;
      minutes: number;
      rating: number;
    };
    goals: { total: number; assists: number };
    team?: { logo: string };
  }[];
  teamName: string;
}

interface PlayerRadarGridProps {
  players: Player[];
  teamName: string;
}

export default function PlayerRadarGrid({
  players,
  teamName,
}: PlayerRadarGridProps) {
  const [viewMode, setViewMode] = useState<"individual" | "comparison">(
    "individual"
  );
  const [showRadarCharts, setShowRadarCharts] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  // Filter out players without valid statistics
  const validPlayers = players.filter(
    (player) =>
      player.statistics && player.statistics.length > 0 && player.statistics[0]
  );

  const togglePlayerSelection = (playerName: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerName)
        ? prev.filter((name) => name !== playerName)
        : [...prev, playerName]
    );
  };

  const getSelectedPlayersData = () => {
    return validPlayers
      .filter((player) => selectedPlayers.includes(player.player.name))
      .map((player) => ({
        name: player.player.name,
        stats: player,
      }));
  };

  if (validPlayers.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-8 py-8">
        <p className="text-sm lg:text-base">
          No valid player data available for radar charts.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg lg:text-xl flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Analytics
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Visualize player performance with radar charts
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={showRadarCharts ? "default" : "outline"}
                size="sm"
                onClick={() => setShowRadarCharts(!showRadarCharts)}
                className="flex items-center gap-2"
              >
                {showRadarCharts ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                {showRadarCharts ? "Hide Charts" : "Show Charts"}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {showRadarCharts && (
        <>
          {/* View Mode Toggle */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "individual" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("individual")}
                    className="flex items-center gap-2"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Individual
                  </Button>
                  <Button
                    variant={viewMode === "comparison" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("comparison")}
                    className="flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Comparison
                  </Button>
                </div>

                {viewMode === "comparison" && (
                  <div className="text-sm text-muted-foreground">
                    {selectedPlayers.length} player
                    {selectedPlayers.length !== 1 ? "s" : ""} selected
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {viewMode === "individual" ? (
            /* Individual Player Charts */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {validPlayers.slice(0, 6).map((player, index) => (
                <Card
                  key={`${player.player.name}-${index}`}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      {player.player.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PlayerRadarChart
                      data={preparePlayerRadarData(player)}
                      playerName={player.player.name}
                      height={250}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Player Comparison */
            <div className="space-y-6">
              {/* Player Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base lg:text-lg">
                    Select Players to Compare
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {validPlayers.map((player, index) => (
                      <Button
                        key={`${player.player.name}-${index}`}
                        variant={
                          selectedPlayers.includes(player.player.name)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          togglePlayerSelection(player.player.name)
                        }
                        className="text-xs h-auto py-2 px-3"
                      >
                        {player.player.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Comparison Chart */}
              {selectedPlayers.length > 0 && (
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <PlayerComparisonRadarChart
                      players={getSelectedPlayersData()}
                      height={400}
                    />
                  </CardContent>
                </Card>
              )}

              {selectedPlayers.length === 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-muted-foreground py-8">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm lg:text-base">
                        Select players above to compare their performance
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import {
  Radar,
  RadarChart as RadarChartPrimitive,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { cn } from "@/lib/utils";

interface RadarChartData {
  subject: string;
  value: number;
  fullMark?: number;
}

interface PlayerRadarChartProps {
  data: RadarChartData[];
  playerName: string;
  className?: string;
  height?: number;
}

const RadarChartTooltip = ({
  className,
  ...props
}: React.ComponentProps<typeof RechartsTooltip> & { className?: string }) => (
  <RechartsTooltip
    contentStyle={{
      background: "hsl(var(--background))",
      borderColor: "hsl(var(--border))",
      borderRadius: "8px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    }}
    labelStyle={{
      color: "hsl(var(--foreground))",
      fontWeight: "600",
      fontSize: "14px",
    }}
    itemStyle={{
      color: "hsl(var(--muted-foreground))",
      fontWeight: "500",
      fontSize: "13px",
    }}
    wrapperClassName={cn("rounded-md border", className)}
    {...props}
  />
);

export function PlayerRadarChart({
  data,
  playerName,
  className,
  height = 300,
}: PlayerRadarChartProps) {
  // Calculate the maximum value for scaling
  const maxValue = Math.max(...data.map((item) => item.value), 10);

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {playerName} - Performance Radar
        </h3>
        <p className="text-sm text-muted-foreground">
          Visual representation of player statistics
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <RadarChartPrimitive
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <PolarGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: "hsl(var(--muted-foreground))",
              fontSize: 12,
              fontWeight: "500",
            }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, maxValue]}
            tick={{
              fill: "hsl(var(--muted-foreground))",
              fontSize: 10,
            }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <Radar
            name={playerName}
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <RadarChartTooltip />
        </RadarChartPrimitive>
      </ResponsiveContainer>
    </div>
  );
}

// Helper function to prepare player data for radar chart
export function preparePlayerRadarData(playerStats: any): RadarChartData[] {
  if (!playerStats) return [];

  const stats = playerStats.statistics?.[0];
  if (!stats) return [];

  // Normalize values to a 0-10 scale for better visualization
  const normalizeValue = (value: number, max: number) => {
    return Math.min((value / max) * 10, 10);
  };

  // Calculate goals per game (normalized)
  const goalsPerGame =
    stats.games?.appearences > 0
      ? (stats.goals?.total || 0) / stats.games.appearences
      : 0;

  // Calculate assists per game (normalized)
  const assistsPerGame =
    stats.games?.appearences > 0
      ? (stats.goals?.assists || 0) / stats.games.appearences
      : 0;

  // Calculate minutes per appearance (normalized)
  const minutesPerApp =
    stats.games?.appearences > 0
      ? (stats.games?.minutes || 0) / stats.games.appearences
      : 0;

  // Normalize rating (assuming it's already on a 0-10 scale)
  const normalizedRating = stats.games?.rating
    ? typeof stats.games.rating === "string"
      ? parseFloat(stats.games.rating)
      : stats.games.rating
    : 0;

  return [
    {
      subject: "Goals",
      value: normalizeValue(goalsPerGame, 1), // Normalize to 1 goal per game = 10
    },
    {
      subject: "Assists",
      value: normalizeValue(assistsPerGame, 1), // Normalize to 1 assist per game = 10
    },
    {
      subject: "Appearances",
      value: normalizeValue(stats.games?.appearences || 0, 38), // Normalize to 38 games = 10
    },
    {
      subject: "Minutes",
      value: normalizeValue(minutesPerApp, 90), // Normalize to 90 minutes per game = 10
    },
    {
      subject: "Rating",
      value: normalizedRating,
    },
    {
      subject: "Consistency",
      value: stats.games?.appearences > 0 ? 8 : 0, // High consistency if they play regularly
    },
  ];
}

// Component for comparing multiple players
interface PlayerComparisonRadarChartProps {
  players: Array<{
    name: string;
    stats: any;
    color?: string;
  }>;
  className?: string;
  height?: number;
}

export function PlayerComparisonRadarChart({
  players,
  className,
  height = 400,
}: PlayerComparisonRadarChartProps) {
  // Get all unique subjects from all players
  const allSubjects = new Set<string>();
  players.forEach((player) => {
    const data = preparePlayerRadarData(player.stats);
    data.forEach((item) => allSubjects.add(item.subject));
  });

  const subjects = Array.from(allSubjects);

  // Prepare data for comparison
  const comparisonData = subjects.map((subject) => {
    const dataPoint: any = { subject };
    players.forEach((player, index) => {
      const playerData = preparePlayerRadarData(player.stats);
      const subjectData = playerData.find((item) => item.subject === subject);
      dataPoint[`player${index}`] = subjectData?.value || 0;
    });
    return dataPoint;
  });

  const colors = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "#10b981", // green
    "#f59e0b", // amber
    "#ef4444", // red
  ];

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Player Comparison
        </h3>
        <p className="text-sm text-muted-foreground">
          Compare performance across multiple players
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <RadarChartPrimitive
          data={comparisonData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <PolarGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: "hsl(var(--muted-foreground))",
              fontSize: 12,
              fontWeight: "500",
            }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={{
              fill: "hsl(var(--muted-foreground))",
              fontSize: 10,
            }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          {players.map((player, index) => (
            <Radar
              key={player.name}
              name={player.name}
              dataKey={`player${index}`}
              stroke={player.color || colors[index % colors.length]}
              fill={player.color || colors[index % colors.length]}
              fillOpacity={0.2}
              strokeWidth={2}
            />
          ))}
          <RadarChartTooltip />
        </RadarChartPrimitive>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {players.map((player, index) => (
          <div key={player.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: player.color || colors[index % colors.length],
              }}
            />
            <span className="text-sm text-muted-foreground">{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import {
  Bar,
  BarChart as BarChartPrimitive,
  Line,
  LineChart as LineChartPrimitive,
  Pie,
  PieChart as PieChartPrimitive,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
  Area,
  AreaChart as AreaChartPrimitive,
} from "recharts";
import { cn } from "@/lib/utils";

// Enhanced Tooltip Component
const EnhancedTooltip = ({
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

// Team Performance Bar Chart
interface TeamPerformanceChartProps {
  data: Array<{
    team: string;
    points: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  }>;
  title?: string;
  className?: string;
  height?: number;
}

export function TeamPerformanceChart({
  data,
  title = "Team Performance",
  className,
  height = 400,
}: TeamPerformanceChartProps) {
  const chartData = data.map((team) => ({
    name: team.team,
    points: team.points,
    wins: team.wins,
    draws: team.draws,
    losses: team.losses,
    goalDifference: team.goalsFor - team.goalsAgainst,
  }));

  const colors = {
    points: "hsl(var(--primary))",
    wins: "#10b981", // green
    draws: "#f59e0b", // amber
    losses: "#ef4444", // red
    goalDifference: "#8b5cf6", // purple
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Team performance comparison
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <BarChartPrimitive
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="name"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <EnhancedTooltip />
          <Legend />
          <Bar dataKey="points" fill={colors.points} name="Points" />
          <Bar dataKey="wins" fill={colors.wins} name="Wins" />
          <Bar dataKey="draws" fill={colors.draws} name="Draws" />
          <Bar dataKey="losses" fill={colors.losses} name="Losses" />
        </BarChartPrimitive>
      </ResponsiveContainer>
    </div>
  );
}

// Goals Distribution Pie Chart
interface GoalsDistributionChartProps {
  data: Array<{
    player: string;
    team: string;
    goals: number;
  }>;
  title?: string;
  className?: string;
  height?: number;
}

export function GoalsDistributionChart({
  data,
  title = "Goals Distribution",
  className,
  height = 300,
}: GoalsDistributionChartProps) {
  const chartData = data.map((item) => ({
    name: item.player,
    value: item.goals,
    team: item.team,
  }));

  const COLORS = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#ec4899",
    "#6366f1",
  ];

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Goals scored by top players
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <PieChartPrimitive>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <EnhancedTooltip />
        </PieChartPrimitive>
      </ResponsiveContainer>
    </div>
  );
}

// Season Progress Line Chart
interface SeasonProgressChartProps {
  data: Array<{
    matchday: number;
    team: string;
    points: number;
    position: number;
  }>;
  title?: string;
  className?: string;
  height?: number;
}

export function SeasonProgressChart({
  data,
  title = "Season Progress",
  className,
  height = 400,
}: SeasonProgressChartProps) {
  // Group data by team
  const teamData = data.reduce((acc, item) => {
    if (!acc[item.team]) {
      acc[item.team] = [];
    }
    acc[item.team].push({
      matchday: item.matchday,
      points: item.points,
      position: item.position,
    });
    return acc;
  }, {} as Record<string, any[]>);

  const COLORS = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#ec4899",
    "#6366f1",
  ];

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Points progression throughout the season
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <LineChartPrimitive
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="matchday"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <EnhancedTooltip />
          <Legend />
          {Object.entries(teamData).map(([team, teamPoints], index) => (
            <Line
              key={team}
              type="monotone"
              data={teamPoints}
              dataKey="points"
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              name={team}
              dot={{
                fill: COLORS[index % COLORS.length],
                strokeWidth: 2,
                r: 4,
              }}
            />
          ))}
        </LineChartPrimitive>
      </ResponsiveContainer>
    </div>
  );
}

// Match Results Area Chart
interface MatchResultsChartProps {
  data: Array<{
    date: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
  }>;
  title?: string;
  className?: string;
  height?: number;
}

export function MatchResultsChart({
  data,
  title = "Match Results",
  className,
  height = 400,
}: MatchResultsChartProps) {
  const chartData = data.map((match) => ({
    date: new Date(match.date).toLocaleDateString(),
    homeScore: match.homeScore,
    awayScore: match.awayScore,
    totalGoals: match.homeScore + match.awayScore,
    match: `${match.homeTeam} vs ${match.awayTeam}`,
  }));

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Goals scored in recent matches
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <AreaChartPrimitive
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <EnhancedTooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="totalGoals"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            name="Total Goals"
          />
          <Area
            type="monotone"
            dataKey="homeScore"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.2}
            name="Home Goals"
          />
          <Area
            type="monotone"
            dataKey="awayScore"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.2}
            name="Away Goals"
          />
        </AreaChartPrimitive>
      </ResponsiveContainer>
    </div>
  );
}

// Player Statistics Comparison Bar Chart
interface PlayerStatsComparisonChartProps {
  data: Array<{
    player: string;
    team: string;
    goals: number;
    assists: number;
    appearances: number;
    rating: number;
  }>;
  title?: string;
  className?: string;
  height?: number;
}

export function PlayerStatsComparisonChart({
  data,
  title = "Player Statistics Comparison",
  className,
  height = 400,
}: PlayerStatsComparisonChartProps) {
  const chartData = data.map((player) => ({
    name: player.player,
    team: player.team,
    goals: player.goals,
    assists: player.assists,
    appearances: player.appearances,
    rating: player.rating,
  }));

  const colors = {
    goals: "#ef4444", // red
    assists: "#3b82f6", // blue
    appearances: "#10b981", // green
    rating: "#f59e0b", // amber
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Player performance comparison
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <BarChartPrimitive
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="name"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <EnhancedTooltip />
          <Legend />
          <Bar dataKey="goals" fill={colors.goals} name="Goals" />
          <Bar dataKey="assists" fill={colors.assists} name="Assists" />
          <Bar
            dataKey="appearances"
            fill={colors.appearances}
            name="Appearances"
          />
          <Bar dataKey="rating" fill={colors.rating} name="Rating" />
        </BarChartPrimitive>
      </ResponsiveContainer>
    </div>
  );
}

// Team Form Trend Chart
interface TeamFormTrendChartProps {
  data: Array<{
    team: string;
    lastMatches: Array<{
      result: "W" | "D" | "L";
      opponent: string;
      score: string;
    }>;
  }>;
  title?: string;
  className?: string;
  height?: number;
}

export function TeamFormTrendChart({
  data,
  title = "Team Form Trend",
  className,
  height = 300,
}: TeamFormTrendChartProps) {
  const chartData = data.map((team) => {
    const formPoints = team.lastMatches.map((match) => {
      switch (match.result) {
        case "W":
          return 3;
        case "D":
          return 1;
        case "L":
          return 0;
        default:
          return 0;
      }
    });

    return {
      team: team.team,
      form: formPoints,
      totalPoints: formPoints.reduce((sum, points) => sum + points, 0),
    };
  });

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Recent form based on last 5 matches
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <BarChartPrimitive
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="team"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <EnhancedTooltip />
          <Bar
            dataKey="totalPoints"
            fill="hsl(var(--primary))"
            name="Form Points"
          />
        </BarChartPrimitive>
      </ResponsiveContainer>
    </div>
  );
}

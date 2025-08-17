"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";
import TeamDisplay from "@/components/ui/TeamDisplay";

interface TeamData {
  name: string;
  logo?: string;
  players: any[];
  stats: {
    totalPlayers: number;
    averageAge: number;
    totalGoals: number;
    totalAssists: number;
  };
}

export default function TeamPage() {
  const params = useParams();
  const { season } = useAppContext();
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const teamName = decodeURIComponent(params.team as string);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Fetch team players
    const url = new URLSearchParams({
      season: season.toString(),
      team: teamName,
    });

    fetch(`/api/players?${url.toString()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((players) => {
        const validPlayers = players.filter(
          (player: any) =>
            player &&
            player.player &&
            player.player.name &&
            player.statistics &&
            Array.isArray(player.statistics) &&
            player.statistics.length > 0
        );

        // Calculate team stats
        const stats = {
          totalPlayers: validPlayers.length,
          averageAge:
            validPlayers.length > 0
              ? Math.round(
                  validPlayers.reduce(
                    (sum: number, p: any) => sum + (p.player.age || 0),
                    0
                  ) / validPlayers.length
                )
              : 0,
          totalGoals: validPlayers.reduce(
            (sum: number, p: any) => sum + (p.statistics[0]?.goals?.total || 0),
            0
          ),
          totalAssists: validPlayers.reduce(
            (sum: number, p: any) =>
              sum + (p.statistics[0]?.goals?.assists || 0),
            0
          ),
        };

        setTeamData({
          name: teamName,
          players: validPlayers,
          stats,
        });
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
        setError("Failed to load team data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [teamName, season]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 lg:py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-muted-foreground mt-8 py-8">
        <p className="text-sm lg:text-base">{error}</p>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="text-center text-muted-foreground mt-8 py-8">
        <p className="text-sm lg:text-base">Team not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Team Header */}
      <Card className="hover:shadow-xl transition-all duration-300 ease-out">
        <CardHeader>
          <div className="flex items-center gap-4">
            <TeamDisplay
              name={teamData.name}
              logo={teamData.logo || "/next.svg"}
              size="lg"
              className="text-2xl lg:text-3xl font-bold"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {teamData.stats.totalPlayers}
              </div>
              <div className="text-sm text-muted-foreground">Players</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {teamData.stats.averageAge}
              </div>
              <div className="text-sm text-muted-foreground">Avg Age</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {teamData.stats.totalGoals}
              </div>
              <div className="text-sm text-muted-foreground">Goals</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {teamData.stats.totalAssists}
              </div>
              <div className="text-sm text-muted-foreground">Assists</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Players List */}
      <Card className="hover:shadow-xl transition-all duration-300 ease-out">
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Team Players</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {teamData.players.map((player, index) => {
              const stats = player.statistics[0];
              return (
                <div
                  key={`${player.player.name}-${index}`}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{player.player.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {stats?.games?.position || "N/A"}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600 font-medium">
                      {stats?.goals?.total || 0} goals
                    </span>
                    <span className="text-blue-600 font-medium">
                      {stats?.goals?.assists || 0} assists
                    </span>
                    <span className="text-muted-foreground">
                      {stats?.games?.appearences || 0} apps
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

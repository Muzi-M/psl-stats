"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";
import TeamDisplay from "@/components/ui/TeamDisplay";
import Image from "next/image";
import Link from "next/link";

interface PlayerData {
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

export default function PlayerPage() {
  const params = useParams();
  const { season } = useAppContext();
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const playerName = decodeURIComponent(params.player as string);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Fetch all players and find the specific player
    const url = new URLSearchParams({
      season: season.toString(),
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

        // Find the specific player by name
        const foundPlayer = validPlayers.find(
          (player: any) =>
            player.player.name.toLowerCase() === playerName.toLowerCase()
        );

        if (foundPlayer) {
          setPlayerData(foundPlayer);
        } else {
          setError("Player not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching player data:", error);
        setError("Failed to load player data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [playerName, season]);

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

  if (!playerData) {
    return (
      <div className="text-center text-muted-foreground mt-8 py-8">
        <p className="text-sm lg:text-base">Player not found</p>
      </div>
    );
  }

  const stats = playerData.statistics[0];
  const playerPhoto = playerData.player.photo || "/next.svg";
  const teamLogo = stats?.team?.logo || "/next.svg";

  return (
    <div className="space-y-6">
      {/* Player Header */}
      <Card className="hover:shadow-xl transition-all duration-300 ease-out">
        <CardHeader>
          <div className="flex items-center gap-6">
            <div className="relative overflow-hidden rounded-full border-4 border-primary/20">
              <Image
                src={playerPhoto}
                alt={playerData.player.name}
                width={120}
                height={120}
                className="object-cover w-24 h-24 lg:w-30 lg:h-30"
                unoptimized
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                {playerData.player.name}
              </h1>
              <Link
                href={`/teams/${encodeURIComponent(playerData.teamName)}`}
                className="inline-block hover:scale-105 transition-transform duration-200"
              >
                <TeamDisplay
                  name={playerData.teamName}
                  logo={teamLogo}
                  size="md"
                  className="text-lg text-muted-foreground hover:text-primary transition-colors duration-200"
                />
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {playerData.player.age}
              </div>
              <div className="text-sm text-muted-foreground">Age</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {stats?.games?.position || "N/A"}
              </div>
              <div className="text-sm text-muted-foreground">Position</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {stats?.games?.appearences || 0}
              </div>
              <div className="text-sm text-muted-foreground">Appearances</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {stats?.goals?.total || 0}
              </div>
              <div className="text-sm text-muted-foreground">Goals</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {stats?.goals?.assists || 0}
              </div>
              <div className="text-sm text-muted-foreground">Assists</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {typeof stats?.games?.rating === "string"
                  ? parseFloat(stats.games.rating).toFixed(1)
                  : stats?.games?.rating?.toFixed(1) || "N/A"}
              </div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Stats */}
      <Card className="hover:shadow-xl transition-all duration-300 ease-out">
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">
            Season Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Playing Time</h3>
                <div className="text-2xl font-bold text-primary">
                  {stats?.games?.minutes || 0} minutes
                </div>
                <div className="text-sm text-muted-foreground">
                  {stats?.games?.appearences || 0} appearances
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Goal Contributions</h3>
                <div className="text-2xl font-bold text-green-600">
                  {stats?.goals?.total || 0} goals
                </div>
                <div className="text-sm text-muted-foreground">
                  {stats?.goals?.assists || 0} assists
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

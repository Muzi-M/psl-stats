"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import debounce from "lodash.debounce";
import { useAppContext } from "@/context/AppContext";
import { useLoading } from "@/context/LoadingContext";
import TeamFilter from "./TeamFilter";
import LoadingSpinner from "./LoadingSpinner";
import TeamDisplay from "./ui/TeamDisplay";

type Player = {
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
};

export default function PlayerGrid() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filtered, setFiltered] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const { season } = useAppContext();
  const { setIsLoading, setLoadingMessage } = useLoading();
  const [team, setTeam] = useState("");
  const [isLoading, setIsLoadingLocal] = useState(false);

  useEffect(() => {
    setIsLoadingLocal(true);
    setLoadingMessage("Loading players...");
    setIsLoading(true);

    const url = new URLSearchParams({ season: season.toString() });
    if (team) url.append("team", team);

    fetch(`/api/players?${url.toString()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Filter out any players with missing required data
        const validPlayers = data.filter(
          (player: any) =>
            player &&
            player.player &&
            player.player.name &&
            player.statistics &&
            Array.isArray(player.statistics) &&
            player.statistics.length > 0
        );
        setPlayers(validPlayers);
        setFiltered(validPlayers);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
        setPlayers([]);
        setFiltered([]);
      })
      .finally(() => {
        setIsLoadingLocal(false);
        setIsLoading(false);
      });
  }, [season, team, setIsLoading, setLoadingMessage]);

  // Debounced search
  const handleSearch = debounce((term: string) => {
    const filtered = players.filter((p) =>
      p.player?.name?.toLowerCase().includes(term.toLowerCase())
    );
    setFiltered(filtered);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    handleSearch(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 lg:py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <TeamFilter value={team} onChange={setTeam} />
        <input
          value={search}
          onChange={handleChange}
          placeholder="Search players..."
          className="w-full border border-input bg-background text-foreground px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm lg:text-base transition-all duration-200 hover:shadow-md focus:shadow-lg"
        />
      </div>

      {!team ? (
        <div className="text-center text-muted-foreground mt-8 py-8">
          <p className="text-sm lg:text-base">
            Please select a team to view players.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Selected Team Header */}
          <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-4 lg:p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <h2 className="text-lg lg:text-xl font-bold text-primary">
                  Currently Viewing: {team}
                </h2>
              </div>
              <div className="text-sm text-muted-foreground">
                {filtered.length} player{filtered.length !== 1 ? "s" : ""} found
              </div>
            </div>
          </div>

          <div className="grid gap-3 lg:gap-4">
            {filtered.map((p, i) => {
              // Ensure all required data exists before rendering
              if (!p.player?.name || !p.statistics?.[0]) {
                return null;
              }

              const stats = p.statistics[0];
              const playerPhoto = p.player.photo || "/next.svg";
              const teamLogo = stats?.team?.logo || "/next.svg";

              return (
                <div
                  key={`${p.player.name}-${i}`}
                  className="border rounded-lg p-4 lg:p-6 shadow-sm hover:shadow-xl transition-all duration-300 ease-out transform-gpu bg-card hover:bg-accent/50 group"
                >
                  {/* Player Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="relative overflow-hidden rounded-full border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                        <Image
                          src={playerPhoto}
                          alt={p.player.name}
                          width={80}
                          height={80}
                          className="object-cover w-16 h-16 lg:w-20 lg:h-20 transition-all duration-300 group-hover:scale-110"
                          unoptimized
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/players/${encodeURIComponent(p.player.name)}`}
                        className="block hover:scale-105 transition-transform duration-200"
                      >
                        <h3 className="text-lg lg:text-xl font-bold group-hover:text-primary transition-colors duration-200 hover:text-primary">
                          {p.player.name}
                        </h3>
                      </Link>
                      <Link
                        href={`/teams/${encodeURIComponent(
                          p.teamName || "Unknown Team"
                        )}`}
                        className="inline-block hover:scale-105 transition-transform duration-200"
                      >
                        <TeamDisplay
                          name={p.teamName || "Unknown Team"}
                          logo={teamLogo}
                          size="md"
                          className="text-sm text-muted-foreground group-hover:text-primary/70 hover:text-primary transition-colors duration-200"
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Player Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
                    <div className="flex flex-col p-3 rounded-md bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                      <span className="text-xs text-muted-foreground">Age</span>
                      <span className="font-medium text-sm lg:text-base">
                        {p.player.age || "N/A"}
                      </span>
                    </div>

                    <div className="flex flex-col p-3 rounded-md bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                      <span className="text-xs text-muted-foreground">
                        Position
                      </span>
                      <span className="font-medium text-sm lg:text-base">
                        {stats?.games?.position || "N/A"}
                      </span>
                    </div>

                    <div className="flex flex-col p-3 rounded-md bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                      <span className="text-xs text-muted-foreground">
                        Apps
                      </span>
                      <span className="font-medium text-sm lg:text-base">
                        {stats?.games?.appearences || 0}
                      </span>
                    </div>

                    <div className="flex flex-col p-3 rounded-md bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                      <span className="text-xs text-muted-foreground">
                        Goals
                      </span>
                      <span className="font-medium text-sm lg:text-base text-green-600">
                        {stats?.goals?.total || 0}
                      </span>
                    </div>

                    <div className="flex flex-col p-3 rounded-md bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                      <span className="text-xs text-muted-foreground">
                        Assists
                      </span>
                      <span className="font-medium text-sm lg:text-base text-blue-600">
                        {stats?.goals?.assists || 0}
                      </span>
                    </div>

                    <div className="flex flex-col p-3 rounded-md bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                      <span className="text-xs text-muted-foreground">
                        Minutes
                      </span>
                      <span className="font-medium text-sm lg:text-base">
                        {stats?.games?.minutes || 0}
                      </span>
                    </div>

                    {stats?.games?.rating && (
                      <div className="flex flex-col p-3 rounded-md bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                        <span className="text-xs text-muted-foreground">
                          Rating
                        </span>
                        <span className="font-medium text-sm lg:text-base text-yellow-600">
                          {typeof stats.games.rating === "string"
                            ? parseFloat(stats.games.rating).toFixed(1)
                            : stats.games.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

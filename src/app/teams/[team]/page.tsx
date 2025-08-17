"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Users, Trophy, Target, TrendingUp } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import TeamDisplay from "@/components/ui/TeamDisplay";
import PlayerDisplay from "@/components/ui/PlayerDisplay";

interface TeamStats {
  teamName: string;
  logo?: string;
  position: number;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

interface PlayerStats {
  player: {
    name: string;
    photo: string;
    age: number;
  };
  teamName: string;
  statistics: {
    games: {
      appearences: number;
      position: string;
      minutes: number;
      rating: number;
    };
    goals: {
      total: number;
      assists: number;
      conceded: number;
    };
  }[];
}

export default function TeamPage() {
  const params = useParams();
  const router = useRouter();
  const { season } = useAppContext();
  const [teams, setTeams] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [teamStats, setTeamStats] = useState<TeamStats | null>(null);
  const [teamPlayers, setTeamPlayers] = useState<PlayerStats[]>([]);
  const [isLoading, setIsLoadingLocal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const teamNameFromUrl = decodeURIComponent(params.team as string);

  // Load teams list
  useEffect(() => {
    fetch("/api/teams")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Extract team names from valid teams
        const teamNames = (data || [])
          .filter((team: any) => team && team.name)
          .map((team: any) => team.name);
        setTeams(teamNames);

        // Set the team from URL as selected
        if (teamNames.includes(teamNameFromUrl)) {
          setSelectedTeam(teamNameFromUrl);
        } else if (teamNames.length > 0) {
          setSelectedTeam(teamNames[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
        setTeams([]);
      });
  }, [teamNameFromUrl]);

  // Load team data when selected team changes
  useEffect(() => {
    if (!selectedTeam) return;

    setIsLoadingLocal(true);

    // Fetch team standings data
    fetch(`/api/standings?season=${season}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((standings) => {
        const teamStanding = standings.find(
          (s: any) => s.team?.name === selectedTeam
        );
        if (teamStanding) {
          setTeamStats({
            teamName: teamStanding.team?.name || selectedTeam,
            logo: teamStanding.team?.logo || "/next.svg",
            position: teamStanding.rank || 0,
            points: teamStanding.points || 0,
            played: teamStanding.all?.played || 0,
            won: teamStanding.all?.win || 0,
            drawn: teamStanding.all?.draw || 0,
            lost: teamStanding.all?.lose || 0,
            goalsFor: teamStanding.all?.goals?.for || 0,
            goalsAgainst: teamStanding.all?.goals?.against || 0,
            goalDifference: teamStanding.goalsDiff || 0,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching standings:", error);
      });

    // Fetch team players data
    fetch(`/api/players?season=${season}&team=${selectedTeam}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((players) => {
        // Filter out invalid players
        const validPlayers = (players || []).filter(
          (player: any) =>
            player &&
            player.player &&
            player.player.name &&
            player.statistics &&
            Array.isArray(player.statistics) &&
            player.statistics.length > 0
        );
        setTeamPlayers(validPlayers);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
        setTeamPlayers([]);
      })
      .finally(() => {
        setIsLoadingLocal(false);
      });
  }, [selectedTeam, season]);

  const handleTeamSelect = (teamName: string) => {
    setSelectedTeam(teamName);
    setIsDropdownOpen(false);
    // Update URL to reflect the selected team
    router.push(`/teams/${encodeURIComponent(teamName)}`);
  };

  const topScorers = teamPlayers
    .filter((p) => p.statistics?.[0]?.goals?.total > 0)
    .sort(
      (a, b) =>
        (b.statistics?.[0]?.goals?.total || 0) -
        (a.statistics?.[0]?.goals?.total || 0)
    )
    .slice(0, 5);

  const topAssists = teamPlayers
    .filter((p) => p.statistics?.[0]?.goals?.assists > 0)
    .sort(
      (a, b) =>
        (b.statistics?.[0]?.goals?.assists || 0) -
        (a.statistics?.[0]?.goals?.assists || 0)
    )
    .slice(0, 5);

  const topRated = teamPlayers
    .filter((p) => p.statistics?.[0]?.games?.rating > 0)
    .sort(
      (a, b) =>
        (b.statistics?.[0]?.games?.rating || 0) -
        (a.statistics?.[0]?.games?.rating || 0)
    )
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 lg:py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Team Selector */}
      <div className="relative">
        <Button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between border border-input bg-background text-foreground px-4 py-2 rounded min-w-[200px] focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        >
          <span>{selectedTeam || "Select a team"}</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-full border border-input bg-card text-card-foreground rounded shadow-lg z-[9999] min-w-[200px] dropdown-menu">
            {teams.map((team, i) => (
              <button
                key={i}
                onClick={() => handleTeamSelect(team)}
                className={`w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors ${
                  team === selectedTeam
                    ? "bg-accent text-accent-foreground"
                    : "text-card-foreground"
                }`}
              >
                {team}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedTeam && teamStats && (
        <div className="space-y-6">
          {/* Team Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TeamDisplay
                  name={teamStats.teamName || "Unknown Team"}
                  logo={teamStats.logo || "/next.svg"}
                  size="md"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {teamStats.position || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Position</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {teamStats.points || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {teamStats.played || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Played</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {teamStats.goalDifference || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Goal Difference
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  League Record
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Won</span>
                  <span className="font-semibold text-green-600">
                    {teamStats.won || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Drawn</span>
                  <span className="font-semibold text-yellow-600">
                    {teamStats.drawn || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Lost</span>
                  <span className="font-semibold text-red-600">
                    {teamStats.lost || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Goals For</span>
                  <span className="font-semibold">
                    {teamStats.goalsFor || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Goals Against</span>
                  <span className="font-semibold">
                    {teamStats.goalsAgainst || 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Top Scorers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topScorers.map((player, index) => (
                    <Link
                      key={index}
                      href={`/players/${encodeURIComponent(
                        player.player?.name || "Unknown Player"
                      )}`}
                      className="block hover:scale-105 transition-transform duration-200"
                    >
                      <div className="flex items-center justify-between hover:bg-accent/50 p-2 rounded transition-colors duration-200">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {index + 1}.
                          </span>
                          <span className="text-sm hover:text-primary transition-colors duration-200">
                            {player.player?.name || "Unknown Player"}
                          </span>
                        </div>
                        <span className="font-semibold text-green-600">
                          {player.statistics?.[0]?.goals?.total || 0}
                        </span>
                      </div>
                    </Link>
                  ))}
                  {topScorers.length === 0 && (
                    <div className="text-sm text-muted-foreground">
                      No goals scored
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Assists
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topAssists.map((player, index) => (
                    <Link
                      key={index}
                      href={`/players/${encodeURIComponent(
                        player.player?.name || "Unknown Player"
                      )}`}
                      className="block hover:scale-105 transition-transform duration-200"
                    >
                      <div className="flex items-center justify-between hover:bg-accent/50 p-2 rounded transition-colors duration-200">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {index + 1}.
                          </span>
                          <span className="text-sm hover:text-primary transition-colors duration-200">
                            {player.player?.name || "Unknown Player"}
                          </span>
                        </div>
                        <span className="font-semibold text-blue-600">
                          {player.statistics?.[0]?.goals?.assists || 0}
                        </span>
                      </div>
                    </Link>
                  ))}
                  {topAssists.length === 0 && (
                    <div className="text-sm text-muted-foreground">
                      No assists recorded
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Squad Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Squad Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamPlayers.map((player, index) => (
                  <Link
                    key={index}
                    href={`/players/${encodeURIComponent(
                      player.player?.name || "Unknown Player"
                    )}`}
                    className="block hover:scale-105 transition-transform duration-200"
                  >
                    <div className="border rounded p-3 hover:shadow-md transition hover:bg-accent/50">
                      <div className="flex items-center gap-3">
                        <PlayerDisplay
                          name={player.player?.name || "Unknown Player"}
                          photo={player.player?.photo || "/next.svg"}
                          size="md"
                          className="flex-1 hover:text-primary transition-colors duration-200"
                        />
                        <div className="text-sm text-muted-foreground">
                          {player.statistics?.[0]?.games?.position || "N/A"}
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-semibold">
                            {player.statistics?.[0]?.games?.appearences || 0}
                          </div>
                          <div className="text-muted-foreground">Apps</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-green-600">
                            {player.statistics?.[0]?.goals?.total || 0}
                          </div>
                          <div className="text-muted-foreground">Goals</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-blue-600">
                            {player.statistics?.[0]?.goals?.assists || 0}
                          </div>
                          <div className="text-muted-foreground">Assists</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!selectedTeam && (
        <div className="text-center py-12 text-muted-foreground">
          Please select a team to view detailed statistics.
        </div>
      )}
    </div>
  );
}

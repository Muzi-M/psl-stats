"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { useLoading } from "@/context/LoadingContext";
import LoadingSpinner from "./LoadingSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import TeamDisplay from "./ui/TeamDisplay";

export default function StandingsTable() {
  const [standings, setStandings] = useState<any[]>([]);
  const { season } = useAppContext();
  const { setIsLoading, setLoadingMessage } = useLoading();
  const [isLoading, setIsLoadingLocal] = useState(false);

  useEffect(() => {
    setIsLoadingLocal(true);
    setLoadingMessage("Loading standings...");
    setIsLoading(true);

    fetch(`/api/standings?season=${season}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Filter out invalid data
        const validStandings = (data || []).filter(
          (team: any) => team && team.team && team.team.name
        );
        setStandings(validStandings);
      })
      .catch((error) => {
        console.error("Error fetching standings:", error);
        setStandings([]);
      })
      .finally(() => {
        setIsLoadingLocal(false);
        setIsLoading(false);
      });
  }, [season, setIsLoading, setLoadingMessage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 lg:py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (standings.length === 0) {
    return (
      <div className="space-y-4">
        <Card className="hover:shadow-xl transition-all duration-300 ease-out">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">
              League Standings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <p>No standings data available</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="hover:shadow-xl transition-all duration-300 ease-out">
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">League Standings</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Pos</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="text-center">P</TableHead>
                  <TableHead className="text-center">W</TableHead>
                  <TableHead className="text-center">D</TableHead>
                  <TableHead className="text-center">L</TableHead>
                  <TableHead className="text-center">GF</TableHead>
                  <TableHead className="text-center">GA</TableHead>
                  <TableHead className="text-center">GD</TableHead>
                  <TableHead className="text-center">Pts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standings.map((team: any) => (
                  <TableRow
                    key={team.rank}
                    className="transition-all duration-200 hover:bg-accent/50 hover:scale-[1.01] transform-gpu"
                  >
                    <TableCell className="font-medium">
                      {team.rank || "N/A"}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/teams/${encodeURIComponent(
                          team.team?.name || "Unknown Team"
                        )}`}
                        className="block hover:scale-105 transition-transform duration-200"
                      >
                        <TeamDisplay
                          name={team.team?.name || "Unknown Team"}
                          logo={team.team?.logo || "/next.svg"}
                          size="md"
                          className="hover:text-primary transition-colors duration-200"
                        />
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      {team.all?.played || 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {team.all?.win || 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {team.all?.draw || 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {team.all?.lose || 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {team.all?.goals?.for || 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {team.all?.goals?.against || 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {team.goalsDiff || 0}
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      {team.points || 0}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {standings.map((team: any) => (
              <Link
                key={team.rank}
                href={`/teams/${encodeURIComponent(
                  team.team?.name || "Unknown Team"
                )}`}
                className="block"
              >
                <Card className="p-3 group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg group-hover:text-primary transition-colors duration-200">
                        {team.rank || "N/A"}
                      </span>
                      <TeamDisplay
                        name={team.team?.name || "Unknown Team"}
                        logo={team.team?.logo || "/next.svg"}
                        size="sm"
                        className="font-medium text-sm lg:text-base truncate group-hover:text-primary transition-colors duration-200"
                      />
                    </div>
                    <span className="font-bold text-lg group-hover:text-primary transition-colors duration-200">
                      {team.points || 0} pts
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center p-1 rounded bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                      <div className="text-muted-foreground">P</div>
                      <div className="font-medium">{team.all?.played || 0}</div>
                    </div>
                    <div className="text-center p-1 rounded bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                      <div className="text-muted-foreground">W</div>
                      <div className="font-medium">{team.all?.win || 0}</div>
                    </div>
                    <div className="text-center p-1 rounded bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                      <div className="text-muted-foreground">D</div>
                      <div className="font-medium">{team.all?.draw || 0}</div>
                    </div>
                    <div className="text-center p-1 rounded bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                      <div className="text-muted-foreground">L</div>
                      <div className="font-medium">{team.all?.lose || 0}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs mt-2">
                    <div className="text-center p-1 rounded bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                      <div className="text-muted-foreground">GF</div>
                      <div className="font-medium">
                        {team.all?.goals?.for || 0}
                      </div>
                    </div>
                    <div className="text-center p-1 rounded bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                      <div className="text-muted-foreground">GA</div>
                      <div className="font-medium">
                        {team.all?.goals?.against || 0}
                      </div>
                    </div>
                    <div className="text-center p-1 rounded bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                      <div className="text-muted-foreground">GD</div>
                      <div className="font-medium">{team.goalsDiff || 0}</div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
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
      .then((res) => res.json())
      .then((data) => {
        setStandings(data);
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
                    <TableCell className="font-medium">{team.rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="relative overflow-hidden rounded-full border border-primary/20">
                          <img
                            src={team.team.logo}
                            alt={team.team.name}
                            className="h-6 w-6 transition-all duration-200 hover:scale-110"
                          />
                        </div>
                        <span className="font-medium">{team.team.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {team.all.played}
                    </TableCell>
                    <TableCell className="text-center">
                      {team.all.win}
                    </TableCell>
                    <TableCell className="text-center">
                      {team.all.draw}
                    </TableCell>
                    <TableCell className="text-center">
                      {team.all.lose}
                    </TableCell>
                    <TableCell className="text-center">
                      {team.all.goals.for}
                    </TableCell>
                    <TableCell className="text-center">
                      {team.all.goals.against}
                    </TableCell>
                    <TableCell className="text-center">
                      {team.goalsDiff}
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      {team.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {standings.map((team: any) => (
              <div
                key={team.rank}
                className="border rounded-lg p-3 bg-card shadow-sm hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out transform-gpu group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg group-hover:text-primary transition-colors duration-200">{team.rank}</span>
                    <div className="relative overflow-hidden rounded-full border border-primary/20">
                      <img
                        src={team.team.logo}
                        alt={team.team.name}
                        className="h-6 w-6 transition-all duration-200 group-hover:scale-110"
                      />
                    </div>
                    <span className="font-medium text-sm lg:text-base truncate group-hover:text-primary transition-colors duration-200">
                      {team.team.name}
                    </span>
                  </div>
                  <span className="font-bold text-lg group-hover:text-primary transition-colors duration-200">{team.points} pts</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center p-1 rounded bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                    <div className="text-muted-foreground">P</div>
                    <div className="font-medium">{team.all.played}</div>
                  </div>
                  <div className="text-center p-1 rounded bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                    <div className="text-muted-foreground">W</div>
                    <div className="font-medium">{team.all.win}</div>
                  </div>
                  <div className="text-center p-1 rounded bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                    <div className="text-muted-foreground">D</div>
                    <div className="font-medium">{team.all.draw}</div>
                  </div>
                  <div className="text-center p-1 rounded bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                    <div className="text-muted-foreground">L</div>
                    <div className="font-medium">{team.all.lose}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs mt-2">
                  <div className="text-center p-1 rounded bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                    <div className="text-muted-foreground">GF</div>
                    <div className="font-medium">{team.all.goals.for}</div>
                  </div>
                  <div className="text-center p-1 rounded bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                    <div className="text-muted-foreground">GA</div>
                    <div className="font-medium">{team.all.goals.against}</div>
                  </div>
                  <div className="text-center p-1 rounded bg-background/50 group-hover:bg-background/80 transition-all duration-200 hover:scale-105 transform-gpu">
                    <div className="text-muted-foreground">GD</div>
                    <div className="font-medium">{team.goalsDiff}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

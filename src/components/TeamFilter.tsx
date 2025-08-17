"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import TeamDisplay from "./ui/TeamDisplay";

interface TeamFilterProps {
  value: string;
  onChange: (team: string) => void;
}

export default function TeamFilter({ value, onChange }: TeamFilterProps) {
  const [teams, setTeams] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { season } = useAppContext();

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/teams?season=${season}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // The API returns an array of team names (strings)
        const validTeams = (data || []).filter(
          (team: any) =>
            team && typeof team === "string" && team.trim().length > 0
        );
        setTeams(validTeams);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
        setTeams([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [season]);

  if (isLoading) {
    return (
      <Card className="hover:shadow-xl transition-all duration-300 ease-out">
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Select Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <p>Loading teams...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (teams.length === 0) {
    return (
      <Card className="hover:shadow-xl transition-all duration-300 ease-out">
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Select Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <p>No teams available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-xl transition-all duration-300 ease-out">
      <CardHeader>
        <CardTitle className="text-lg lg:text-xl">Select Team</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {teams.map((teamName, index) => (
            <button
              key={`${teamName}-${index}`}
              onClick={() => onChange(teamName)}
              className={`p-3 rounded-lg border transition-all duration-300 ease-out text-center group transform-gpu hover:scale-105 hover:-translate-y-1 ${
                value === teamName
                  ? "border-primary bg-primary/10 text-primary shadow-lg scale-105 -translate-y-1"
                  : "border-border bg-card hover:bg-accent hover:shadow-lg"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <TeamDisplay
                  name={teamName || "Unknown Team"}
                  logo="/next.svg"
                  size="lg"
                  className="text-xs sm:text-sm font-medium truncate w-full group-hover:text-primary transition-colors duration-200"
                />
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

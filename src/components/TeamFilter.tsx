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
          {teams.map((teamName, index) => {
            const isSelected = value === teamName;
            return (
              <button
                key={`${teamName}-${index}`}
                onClick={() => onChange(teamName)}
                className={`p-3 rounded-lg border-2 transition-all duration-300 ease-out text-center group transform-gpu hover:scale-105 hover:-translate-y-1 relative overflow-hidden ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-xl scale-105 -translate-y-1 ring-4 ring-primary/20 font-semibold"
                    : "border-border bg-card hover:bg-accent hover:shadow-lg hover:border-primary/50"
                }`}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary-foreground transform rotate-45 translate-x-2 -translate-y-2"></div>
                )}

                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`text-xs sm:text-sm font-medium truncate w-full transition-colors duration-200 ${
                      isSelected
                        ? "text-primary-foreground"
                        : "group-hover:text-primary"
                    }`}
                  >
                    {teamName || "Unknown Team"}
                  </div>

                  {/* Selection checkmark */}
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-primary-foreground rounded-full flex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronDown, Check } from "lucide-react";

interface TeamFilterProps {
  value: string;
  onChange: (team: string) => void;
}

export default function TeamFilter({ value, onChange }: TeamFilterProps) {
  const [teams, setTeams] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  const handleTeamSelect = (teamName: string) => {
    onChange(teamName);
    setIsOpen(false);
  };

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
        <div className="relative">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            className="w-full justify-between items-center p-4 h-auto"
          >
            <span className="text-left">{value || "Choose a team..."}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-[9999] max-h-60 overflow-y-auto">
              {teams.map((teamName, index) => (
                <button
                  key={`${teamName}-${index}`}
                  onClick={() => handleTeamSelect(teamName)}
                  className={`w-full px-4 py-3 text-left hover:bg-accent transition-colors duration-200 flex items-center justify-between ${
                    value === teamName
                      ? "bg-primary/10 text-primary font-medium"
                      : ""
                  }`}
                >
                  <span className="truncate">{teamName || "Unknown Team"}</span>
                  {value === teamName && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

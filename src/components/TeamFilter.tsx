"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface TeamFilterProps {
  value: string;
  onChange: (team: string) => void;
}

export default function TeamFilter({ value, onChange }: TeamFilterProps) {
  const [teams, setTeams] = useState<any[]>([]);
  const { season } = useAppContext();

  useEffect(() => {
    fetch(`/api/teams?season=${season}`)
      .then((res) => res.json())
      .then(setTeams);
  }, [season]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg lg:text-xl">Select Team</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => onChange(team.id.toString())}
              className={`p-3 rounded-lg border transition-all duration-200 text-center hover:shadow-md ${
                value === team.id.toString()
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:bg-accent"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain"
                />
                <span className="text-xs sm:text-sm font-medium truncate w-full">
                  {team.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

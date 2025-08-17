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
  const [teams, setTeams] = useState<any[]>([]);
  const { season } = useAppContext();

  useEffect(() => {
    fetch(`/api/teams?season=${season}`)
      .then((res) => res.json())
      .then(setTeams);
  }, [season]);

  return (
    <Card className="hover:shadow-xl transition-all duration-300 ease-out">
      <CardHeader>
        <CardTitle className="text-lg lg:text-xl">Select Team</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => onChange(team.id.toString())}
              className={`p-3 rounded-lg border transition-all duration-300 ease-out text-center group transform-gpu hover:scale-105 hover:-translate-y-1 ${
                value === team.id.toString()
                  ? "border-primary bg-primary/10 text-primary shadow-lg scale-105 -translate-y-1"
                  : "border-border bg-card hover:bg-accent hover:shadow-lg"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <TeamDisplay
                  name={team.name}
                  logo={team.logo}
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

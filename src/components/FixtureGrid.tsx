"use client";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";

type Fixture = {
  fixture: { date: string; status: { short: string } };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  goals: { home: number; away: number };
};

export default function FixturesGrid() {
  const { season } = useAppContext();
  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  useEffect(() => {
    fetch(`/api/fixtures?season=${season}`)
      .then((res) => res.json())
      .then(setFixtures);
  }, [season]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {fixtures.map((f, i) => (
        <div
          key={i}
          className="border rounded p-4 shadow-sm hover:shadow-md transition"
        >
          <p className="text-sm text-gray-500 mb-1">
            {new Date(f.fixture.date).toLocaleString()} (
            {f.fixture.status.short})
          </p>
          <div className="flex items-center justify-between font-medium">
            <span>{f.teams.home.name}</span>
            <span>
              {f.goals.home ?? "-"} : {f.goals.away ?? "-"}
            </span>
            <span>{f.teams.away.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

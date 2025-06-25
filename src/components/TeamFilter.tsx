"use client";
import { useEffect, useState } from "react";

export default function TeamFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (team: string) => void;
}) {
  const [teams, setTeams] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/teams") // we’ll make this next
      .then((res) => res.json())
      .then(setTeams);
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border px-3 py-1 rounded mb-4"
    >
      <option value="">All Teams</option>
      {teams.map((team, i) => (
        <option key={i} value={team}>
          {team}
        </option>
      ))}
    </select>
  );
}

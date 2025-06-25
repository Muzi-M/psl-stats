"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import debounce from "lodash.debounce";
import { useAppContext } from "@/context/AppContext";
import TeamFilter from "./TeamFilter";

type Player = {
  player: {
    name: string;
    photo: string;
    age: number;
  };
  statistics: {
    games: { appearences: number; position: string };
    goals: { total: number; assists: number };
  }[];
  teamName: string;
};

export default function PlayerGrid() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filtered, setFiltered] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const { season } = useAppContext();
  const [team, setTeam] = useState("");

  useEffect(() => {
    const url = new URLSearchParams({ season: season.toString() });
    if (team) url.append("team", team);

    fetch(`/api/players?${url.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
        setFiltered(data);
      });
  }, [season, team]);

  // Debounced search
  const handleSearch = debounce((term: string) => {
    const filtered = players.filter((p) =>
      p.player.name.toLowerCase().includes(term.toLowerCase())
    );
    setFiltered(filtered);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div>
      <TeamFilter value={team} onChange={setTeam} />

      <input
        value={search}
        onChange={handleChange}
        placeholder="Search players..."
        className="mb-4 w-full border px-3 py-2 rounded"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((p, i) => (
          <div
            key={i}
            className="border rounded p-3 shadow-sm hover:shadow-md transition"
          >
            <div
              className="relative mx-auto mb-2"
              style={{ width: 160, height: 160 }}
            >
              <Image
                src={p.player.photo}
                alt={p.player.name}
                fill
                className="object-contain rounded"
              />
            </div>
            <h2 className="font-semibold text-center">{p.player.name}</h2>
            <p className="text-sm text-center text-gray-500">{p.teamName}</p>
            <ul className="text-xs mt-2 space-y-1">
              <li>Position: {p.statistics[0]?.games?.position || "N/A"}</li>
              <li>Appearances: {p.statistics[0]?.games?.appearences || 0}</li>
              <li>Goals: {p.statistics[0]?.goals?.total || 0}</li>
              <li>Assists: {p.statistics[0]?.goals?.assists || 0}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

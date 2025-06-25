"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import debounce from "lodash.debounce";
import { useAppContext } from "@/context/AppContext";
import TeamFilter from "./TeamFilter";
import PlayerModal from "./PlayerModal";

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
  const [selectedPlayer, setSelectedPlayer] = useState(null);

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

      {!team ? (
        <div className="text-center text-gray-600 mt-8">
          Please select a team to view players.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((p, i) => (
            <div
              key={i}
              onClick={() => setSelectedPlayer(p)}
              className="cursor-pointer flex items-center gap-4 border rounded p-4 shadow-sm hover:shadow-md transition"
            >
              <Image
                src={p.player.photo}
                alt={p.player.name}
                width={80}
                height={80}
                className="object-cover rounded-full border"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-lg">{p.player.name}</h2>
                <p className="text-sm text-gray-500 mb-1">{p.teamName}</p>

                <ul className="text-xs text-gray-700 space-y-1">
                  <li>
                    <strong>Position:</strong>{" "}
                    {p.statistics[0]?.games?.position || "N/A"}
                  </li>
                  <li>
                    <strong>Appearances:</strong>{" "}
                    {p.statistics[0]?.games?.appearences || 0}
                  </li>
                  <li>
                    <strong>Goals:</strong> {p.statistics[0]?.goals?.total || 0}
                  </li>
                  <li>
                    <strong>Assists:</strong>{" "}
                    {p.statistics[0]?.goals?.assists || 0}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
      <PlayerModal
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />
    </div>
  );
}

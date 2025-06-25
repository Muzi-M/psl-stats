"use client";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";

export default function StandingsTable() {
  const { season } = useAppContext();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/standings?season=${season}`)
      .then((res) => res.json())
      .then(setRows);
  }, [season]);

  return (
    <table className="w-full border text-sm mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">#</th>
          <th className="p-2 text-left">Team</th>
          <th className="p-2">P</th>
          <th className="p-2">W</th>
          <th className="p-2">D</th>
          <th className="p-2">L</th>
          <th className="p-2">GD</th>
          <th className="p-2">Pts</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t">
            <td className="p-2">{row.rank}</td>
            <td className="p-2">{row.team.name}</td>
            <td className="p-2 text-center">{row.all.played}</td>
            <td className="p-2 text-center">{row.all.win}</td>
            <td className="p-2 text-center">{row.all.draw}</td>
            <td className="p-2 text-center">{row.all.lose}</td>
            <td className="p-2 text-center">{row.goalsDiff}</td>
            <td className="p-2 text-center font-semibold">{row.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

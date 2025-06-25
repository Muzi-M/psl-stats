"use client";
import { useAppContext } from "@/context/AppContext";

const SEASONS = [2020, 2021, 2022, 2023, 2024];

export default function SeasonToggle() {
  const { season, setSeason } = useAppContext();

  return (
    <div className="mb-4 flex items-center gap-4">
      <label className="font-medium">Season:</label>
      <select
        value={season}
        onChange={(e) => setSeason(parseInt(e.target.value))}
        className="border px-3 py-1 rounded"
      >
        {SEASONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}

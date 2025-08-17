"use client";
import Image from "next/image";
import PlayerDisplay from "./ui/PlayerDisplay";
import TeamDisplay from "./ui/TeamDisplay";

export default function PlayerModal({
  player,
  onClose,
}: {
  player: any;
  onClose: () => void;
}) {
  if (!player) return null;

  const stats = player.statistics?.[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background border border-border p-6 rounded shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-sm">
          X
        </button>

        <div className="flex items-center gap-4 mb-4">
          <PlayerDisplay
            name={player.player.name}
            photo={player.player.photo}
            size="lg"
            className="text-xl font-bold"
          />
          <TeamDisplay
            name={player.teamName}
            logo={player.statistics?.[0]?.team?.logo || ""}
            size="md"
            className="text-sm text-muted-foreground"
          />
        </div>

        <ul className="text-sm space-y-1">
          <li>
            <strong>Age:</strong> {player.player.age}
          </li>
          <li>
            <strong>Position:</strong> {stats?.games?.position || "N/A"}
          </li>
          <li>
            <strong>Appearances:</strong> {stats?.games?.appearences || 0}
          </li>
          <li>
            <strong>Goals:</strong> {stats?.goals?.total || 0}
          </li>
          <li>
            <strong>Assists:</strong> {stats?.goals?.assists || 0}
          </li>
          <li>
            <strong>Minutes Played:</strong> {stats?.games?.minutes || 0}
          </li>
          <li>
            <strong>Rating:</strong> {stats?.games?.rating || "N/A"}
          </li>
        </ul>
      </div>
    </div>
  );
}

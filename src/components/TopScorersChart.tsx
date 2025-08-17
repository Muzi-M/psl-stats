"use client";

import Link from "next/link";
import TeamDisplay from "./ui/TeamDisplay";
import PlayerDisplay from "./ui/PlayerDisplay";

export default function TopScorersChart({ data }: { data: any[] }) {
  // Filter out invalid data and take top 5
  const topScorers = data
    .filter(
      (player: any) =>
        player &&
        player.player &&
        player.player.name &&
        player.statistics &&
        Array.isArray(player.statistics) &&
        player.statistics.length > 0
    )
    .slice(0, 5);

  if (topScorers.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        <p>No scorer data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-2">
      {topScorers.map((player: any, index: number) => (
        <div
          key={`${player.player.name}-${index}`}
          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="font-bold text-lg text-muted-foreground flex-shrink-0">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <Link
                href={`/players/${encodeURIComponent(
                  player.player.name || "Unknown Player"
                )}`}
                className="block hover:scale-105 transition-transform duration-200"
              >
                <PlayerDisplay
                  name={player.player.name || "Unknown Player"}
                  photo={player.player.photo || "/next.svg"}
                  size="sm"
                  className="mb-1 hover:text-primary transition-colors duration-200"
                />
              </Link>
              <Link
                href={`/teams/${encodeURIComponent(
                  player.statistics?.[0]?.team?.name || "Unknown Team"
                )}`}
                className="block hover:scale-105 transition-transform duration-200"
              >
                <TeamDisplay
                  name={player.statistics?.[0]?.team?.name || "Unknown Team"}
                  logo={player.statistics?.[0]?.team?.logo || "/next.svg"}
                  size="sm"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                />
              </Link>
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <div className="font-bold text-lg">
              {player.statistics?.[0]?.goals?.total || 0}
            </div>
            <div className="text-sm text-muted-foreground">goals</div>
          </div>
        </div>
      ))}
    </div>
  );
}

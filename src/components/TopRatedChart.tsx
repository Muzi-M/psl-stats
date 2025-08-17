"use client";

import TeamDisplay from "./ui/TeamDisplay";
import PlayerDisplay from "./ui/PlayerDisplay";

export default function TopRatedChart({ data }: { data: any[] }) {
  // Filter out invalid data and take top 10
  const topRated = data
    .filter(
      (player: any) =>
        player &&
        player.player &&
        player.player.name &&
        player.avgRating !== undefined &&
        player.avgRating !== null
    )
    .slice(0, 10);

  if (topRated.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        <p>No rating data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-2">
      {topRated.map((player: any, index: number) => (
        <div
          key={`${player.player.name}-${index}`}
          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="font-bold text-lg text-muted-foreground flex-shrink-0">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <PlayerDisplay
                name={player.player.name || "Unknown Player"}
                photo={player.player.photo || "/next.svg"}
                size="sm"
                className="mb-1"
              />
              <TeamDisplay
                name={player.statistics?.[0]?.team?.name || "Unknown Team"}
                logo={player.statistics?.[0]?.team?.logo || "/next.svg"}
                size="sm"
                className="text-sm text-muted-foreground"
              />
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <div className="font-bold text-lg">
              {parseFloat(player.avgRating || 0).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">rating</div>
          </div>
        </div>
      ))}
    </div>
  );
}

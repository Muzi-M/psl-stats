"use client";

import TeamDisplay from "./ui/TeamDisplay";
import PlayerDisplay from "./ui/PlayerDisplay";

export default function TopScorersChart({ data }: { data: any[] }) {
  const topScorers = data.slice(0, 5);

  return (
    <div className="space-y-3 pb-2">
      {topScorers.map((player: any, index: number) => (
        <div
          key={`${player.player.id || player.player.name}-${index}`}
          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="font-bold text-lg text-muted-foreground flex-shrink-0">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <PlayerDisplay
                name={player.player.name}
                photo={player.player.photo}
                size="sm"
                className="mb-1"
              />
              <TeamDisplay
                name={player.statistics?.[0]?.team?.name || "Unknown Team"}
                logo={player.statistics?.[0]?.team?.logo || ""}
                size="sm"
                className="text-sm text-muted-foreground"
              />
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

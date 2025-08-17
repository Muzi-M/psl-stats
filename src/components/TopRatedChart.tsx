"use client";

export default function TopRatedChart({ data }: { data: any[] }) {
  const topRated = data.slice(0, 10);

  return (
    <div className="space-y-3 pb-2">
      {topRated.map((player: any, index: number) => (
        <div
          key={`${player.player.id || player.player.name}-${index}`}
          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="font-bold text-lg text-muted-foreground flex-shrink-0">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-medium truncate">{player.player.name}</div>
              <div className="text-sm text-muted-foreground truncate">
                {player.statistics?.[0]?.team?.name || "Unknown Team"}
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <div className="font-bold text-lg">
              {parseFloat(player.avgRating).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">rating</div>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

export default function TopScorersChart({ data }: { data: any[] }) {
  const topScorers = data.slice(0, 5);

  return (
    <div className="space-y-3">
      {topScorers.map((player: any, index: number) => (
        <div
          key={`${player.player.id || player.player.name}-${index}`}
          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg text-muted-foreground">
              {index + 1}
            </span>
            <div>
              <div className="font-medium">{player.player.name}</div>
              <div className="text-sm text-muted-foreground">
                {player.statistics?.[0]?.team?.name || "Unknown Team"}
              </div>
            </div>
          </div>
          <div className="text-right">
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

import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const season = parseInt(req.nextUrl.searchParams.get("season") || "2023");

  const client = await connectToDatabase();
  const db = client.connection.db;
  const col = db.collection("psl");

  const [standings, players, fixtures] = await Promise.all([
    col.find({ type: "standings", season }).sort({ rank: 1 }).toArray(),
    col.find({ type: "player", season }).toArray(),
    col
      .find({ type: "fixture", season })
      .sort({ "fixture.date": -1 })
      .limit(5)
      .toArray(),
  ]);

  const scorers = players
    .filter((p) => p.statistics?.[0]?.goals?.total)
    .sort(
      (a, b) =>
        (b.statistics[0]?.goals?.total || 0) -
        (a.statistics[0]?.goals?.total || 0)
    )
    .slice(0, 5);

  const topRated = players
    .filter((p) => p.statistics?.[0]?.games?.rating)
    .map((p) => ({
      ...p,
      avgRating: parseFloat(p.statistics[0].games.rating),
    }))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 10);

  return NextResponse.json({
    standings,
    scorers,
    topRated,
    fixtures,
  });
}

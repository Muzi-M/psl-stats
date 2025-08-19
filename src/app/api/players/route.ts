import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import cache from "@/lib/cache";

export async function GET(req: NextRequest) {
  const season = parseInt(req.nextUrl.searchParams.get("season") || "2023");
  const team = req.nextUrl.searchParams.get("team");

  // Check cache first
  const cacheKey = `players-${season}${team ? `-${team}` : ""}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  const query: any = { type: "player", season };
  if (team) query.teamName = team;

  const client = await connectToDatabase();
  const db = client.connection.db;

  const players = await db
    .collection("psl")
    .find(query)
    .project({
      player: 1,
      statistics: 1,
      teamName: 1,
      _id: 0,
    })
    .toArray();

  // Cache the result
  cache.set(cacheKey, players);

  return NextResponse.json(players);
}

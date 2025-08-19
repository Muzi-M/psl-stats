import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import cache from "@/lib/cache";

export async function GET(req: NextRequest) {
  const season = parseInt(req.nextUrl.searchParams.get("season") || "2023");

  // Check cache first
  const cacheKey = `standings-${season}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  const client = await connectToDatabase();
  const db = client.connection.db;

  const standings = await db
    .collection("psl")
    .find({ type: "standings", season })
    .project({ team: 1, points: 1, all: 1, goalsDiff: 1, rank: 1, _id: 0 })
    .sort({ rank: 1 })
    .toArray();

  // Cache the result
  cache.set(cacheKey, standings);

  return NextResponse.json(standings);
}

import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import cache from "@/lib/cache";

export async function GET(req: NextRequest) {
  const season = parseInt(req.nextUrl.searchParams.get("season") || "2023");

  // Check cache first
  const cacheKey = `fixtures-${season}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  const client = await connectToDatabase();
  const db = client.connection.db;

  const fixtures = await db
    .collection("psl")
    .find({ type: "fixture", season })
    .project({
      fixture: 1,
      teams: 1,
      goals: 1,
      league: 1,
      _id: 0,
    })
    .sort({ "fixture.date": 1 })
    .toArray();

  // Cache the result
  cache.set(cacheKey, fixtures);

  return NextResponse.json(fixtures);
}

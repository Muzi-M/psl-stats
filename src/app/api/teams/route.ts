import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import cache from "@/lib/cache";

export async function GET() {
  // Check cache first
  const cacheKey = "teams";
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  const client = await connectToDatabase();
  const db = client.connection.db;

  const teams = await db
    .collection("psl")
    .distinct("teamName", { type: "player" });

  const sortedTeams = teams.sort();

  // Cache the result
  cache.set(cacheKey, sortedTeams);

  return NextResponse.json(sortedTeams);
}

import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const season = parseInt(req.nextUrl.searchParams.get("season") || "2023");

  const client = await connectToDatabase();
  const db = client.connection.db;

  const standings = await db
    .collection("psl")
    .find({ type: "standings", season })
    .project({ team: 1, points: 1, all: 1, goalsDiff: 1, rank: 1, _id: 0 })
    .sort({ rank: 1 })
    .toArray();

  return NextResponse.json(standings);
}

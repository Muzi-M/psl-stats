import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const season = parseInt(req.nextUrl.searchParams.get("season") || "2023");
  const team = req.nextUrl.searchParams.get("team");

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

  return NextResponse.json(players);
}

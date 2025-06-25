import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await connectToDatabase();
  const db = client.connection.db;

  const teams = await db
    .collection("psl")
    .distinct("teamName", { type: "player" });
  return NextResponse.json(teams.sort());
}

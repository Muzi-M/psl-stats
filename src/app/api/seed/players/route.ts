import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

const LEAGUE_ID = 288;
const SEASONS = [2025]; // Change to any season you want to seed

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.connection.db;
    const collection = db.collection("psl");

    const allPlayers: any[] = [];

    for (const season of SEASONS) {
      // Remove only players for this season
      await collection.deleteMany({ type: "player", season });

      // Get all teams for this season
      const teamRes = await fetch(
        `https://api-football-v1.p.rapidapi.com/v3/teams?league=${LEAGUE_ID}&season=${season}`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
          },
        }
      );
      const teamData = await teamRes.json();
      const teams = teamData.response || [];

      // Get players for each team
      for (const { team } of teams) {
        const playerRes = await fetch(
          `https://api-football-v1.p.rapidapi.com/v3/players?team=${team.id}&league=${LEAGUE_ID}&season=${season}`,
          {
            headers: {
              "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
              "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            },
          }
        );

        const playerData = await playerRes.json();
        const players = playerData.response || [];

        const formatted = players.map((entry: any) => ({
          ...entry,
          teamId: team.id,
          teamName: team.name,
          type: "player",
          season,
        }));

        allPlayers.push(...formatted);
      }
    }

    await collection.insertMany(allPlayers);

    return NextResponse.json({
      message: "Players seeded successfully",
      count: allPlayers.length,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

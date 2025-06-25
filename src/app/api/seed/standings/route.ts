import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

const LEAGUE_ID = 288;
const SEASONS = [2020, 2021, 2022, 2023, 2024];

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.connection.db;
    const collection = db.collection("psl");

    // Clean previous PSL standings
    await collection.deleteMany({ type: "standings" });

    const allStandings: any[] = [];

    for (const season of SEASONS) {
      const res = await fetch(
        `https://api-football-v1.p.rapidapi.com/v3/standings?league=${LEAGUE_ID}&season=${season}`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
          },
        }
      );

      const data = await res.json();

      // API returns nested standings in leagues[0].standings[0]
      const standings = data.response[0]?.league?.standings?.[0] || [];

      const standingsWithMeta = standings.map((entry: any) => ({
        ...entry,
        season,
        type: "standings",
      }));

      allStandings.push(...standingsWithMeta);
    }

    await collection.insertMany(allStandings);

    return NextResponse.json({
      message: "Standings seeded successfully",
      count: allStandings.length,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

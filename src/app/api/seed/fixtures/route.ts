import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

const LEAGUE_ID = 288;
const SEASONS = [2025]; // Change to any season you want to seed

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.connection.db;
    const collection = db.collection("psl");

    const allFixtures: any[] = [];

    for (const season of SEASONS) {
      // Remove only fixtures for this season
      await collection.deleteMany({ type: "fixture", season });

      // Get fixtures for this season
      const fixtureRes = await fetch(
        `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${LEAGUE_ID}&season=${season}`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
          },
        }
      );
      const fixtureData = await fixtureRes.json();
      const fixtures = fixtureData.response || [];

      const formatted = fixtures.map((fixture: any) => ({
        ...fixture,
        type: "fixture",
        season,
      }));

      allFixtures.push(...formatted);
    }

    await collection.insertMany(allFixtures);

    return NextResponse.json({
      message: "Fixtures seeded successfully",
      count: allFixtures.length,
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

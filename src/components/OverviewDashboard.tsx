"use client";
import { useAppContext } from "@/context/AppContext";
import { useLoading } from "@/context/LoadingContext";
import { useEffect, useState } from "react";
import SeasonToggle from "./SeasonToggle";
import TopScorersChart from "./TopScorersChart";
import TopRatedChart from "./TopRatedChart";
import LoadingSpinner from "./LoadingSpinner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export default function OverviewDashboard() {
  const { season } = useAppContext();
  const { setIsLoading, setLoadingMessage } = useLoading();

  const [standings, setStandings] = useState<any[]>([]);
  const [scorers, setScorers] = useState<any[]>([]);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [recentFixtures, setRecentFixtures] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    setIsDataLoading(true);
    setLoadingMessage("Loading overview data...");
    setIsLoading(true);

    fetch(`/api/overview?season=${season}`)
      .then((res) => res.json())
      .then((data) => {
        setStandings(data.standings || []);
        setScorers(data.scorers || []);
        setTopRated(data.topRated || []);
        setRecentFixtures(data.fixtures || []);
      })
      .finally(() => {
        setIsDataLoading(false);
        setIsLoading(false);
      });
  }, [season, setIsLoading, setLoadingMessage]);

  if (isDataLoading) {
    return (
      <div className="space-y-6">
        <SeasonToggle />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SeasonToggle />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {standings.slice(0, 5).map((team: any) => (
                <li key={team.rank} className="flex items-center gap-3 text-sm">
                  <img
                    src={team.team.logo}
                    alt={team.team.name}
                    className="h-6 w-6"
                  />
                  <span className="font-medium">
                    {team.rank}. {team.team.name}
                  </span>
                  <span className="ml-auto text-muted-foreground">
                    {team.points} pts
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="p-0 h-auto" variant="link">
              <Link href="/standings">View full standings →</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Last 5 Fixtures</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {recentFixtures.map((f: any, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div>
                    <span>{f.teams.home.name} </span>
                    <span className="font-bold">{f.goals.home}</span>
                    <span> : </span>
                    <span className="font-bold">{f.goals.away}</span>
                    <span> {f.teams.away.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(f.fixture.date).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="p-0 h-auto" variant="link">
              <Link href="/fixtures">View all fixtures →</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Top 5 Scorers</CardTitle>
          </CardHeader>
          <CardContent>
            <TopScorersChart data={scorers} />
          </CardContent>
          <CardFooter>
            <Button asChild className="p-0 h-auto" variant="link">
              <Link href="/players">View full player stats →</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Top 10 Rated Players</CardTitle>
          </CardHeader>
          <CardContent>
            <TopRatedChart data={topRated} />
          </CardContent>
          <CardFooter>
            <Button asChild className="p-0 h-auto" variant="link">
              <Link href="/players">View full player stats →</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

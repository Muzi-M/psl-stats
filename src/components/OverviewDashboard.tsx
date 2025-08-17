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
import TeamDisplay from "./ui/TeamDisplay";

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
      <div className="space-y-4 lg:space-y-6">
        <SeasonToggle />
        <div className="flex items-center justify-center py-8 lg:py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <SeasonToggle />

      <div className="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="hover:shadow-xl transition-all duration-300 ease-out group">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl group-hover:text-primary transition-colors duration-200">
              Top 5 Teams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 lg:space-y-3">
              {standings.slice(0, 5).map((team: any) => (
                <li
                  key={team.rank}
                  className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base p-2 rounded-md hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02] transform-gpu group/item"
                >
                  <span className="font-bold text-lg text-muted-foreground flex-shrink-0 group-hover/item:text-primary transition-colors duration-200">
                    {team.rank}.
                  </span>
                  <TeamDisplay
                    name={team.team.name}
                    logo={team.team.logo}
                    size="md"
                    className="flex-1 group-hover/item:text-primary transition-colors duration-200"
                  />
                  <span className="ml-auto text-muted-foreground flex-shrink-0 group-hover/item:text-primary transition-colors duration-200">
                    {team.points} pts
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="p-0 h-auto text-sm" variant="link">
              <Link href="/standings">View full standings →</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="hover:shadow-xl transition-all duration-300 ease-out group">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl group-hover:text-primary transition-colors duration-200">
              Last 5 Fixtures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 lg:space-y-3 text-sm lg:text-base">
              {recentFixtures.map((f: any, i) => (
                <li
                  key={i}
                  className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1 p-2 rounded-md hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02] transform-gpu group/item"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <TeamDisplay
                      name={f.teams.home.name}
                      logo={f.teams.home.logo}
                      size="sm"
                      className="group-hover/item:text-primary transition-colors duration-200"
                    />
                    <span className="font-bold">{f.goals.home}</span>
                    <span> : </span>
                    <span className="font-bold">{f.goals.away}</span>
                    <TeamDisplay
                      name={f.teams.away.name}
                      logo={f.teams.away.logo}
                      size="sm"
                      className="group-hover/item:text-primary transition-colors duration-200"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground lg:text-sm group-hover/item:text-primary/70 transition-colors duration-200">
                    {new Date(f.fixture.date).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="p-0 h-auto text-sm" variant="link">
              <Link href="/fixtures">View all fixtures →</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="sm:col-span-2 hover:shadow-xl transition-all duration-300 ease-out group">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl group-hover:text-primary transition-colors duration-200">
              Top 5 Scorers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-64 lg:min-h-80">
              <TopScorersChart data={scorers} />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="p-0 h-auto text-sm" variant="link">
              <Link href="/players">View full player stats →</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="sm:col-span-2 hover:shadow-xl transition-all duration-300 ease-out group">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl group-hover:text-primary transition-colors duration-200">
              Top 10 Rated Players
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-64 lg:min-h-80">
              <TopRatedChart data={topRated} />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="p-0 h-auto text-sm" variant="link">
              <Link href="/players">View full player stats →</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

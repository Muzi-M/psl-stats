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
import {
  TeamPerformanceChart,
  GoalsDistributionChart,
  MatchResultsChart,
} from "./ui/enhanced-charts";

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

    // Use cached fetch for better performance
    import("@/lib/cachedFetcher").then(({ cachedFetch }) => {
      cachedFetch(`/api/overview?season=${season}`)
        .then((data: any) => {
          // Filter out invalid data
          const validStandings = (data.standings || []).filter(
            (team: any) => team && team.team && team.team.name
          );
          const validScorers = (data.scorers || []).filter(
            (player: any) => player && player.player && player.player.name
          );
          const validTopRated = (data.topRated || []).filter(
            (player: any) => player && player.player && player.player.name
          );
          const validFixtures = (data.fixtures || []).filter(
            (fixture: any) =>
              fixture &&
              fixture.teams &&
              fixture.teams.home &&
              fixture.teams.away
          );

          setStandings(validStandings);
          setScorers(validScorers);
          setTopRated(validTopRated);
          setRecentFixtures(validFixtures);
        })
        .catch((error) => {
          console.error("Error fetching overview data:", error);
          setStandings([]);
          setScorers([]);
          setTopRated([]);
          setRecentFixtures([]);
        })
        .finally(() => {
          setIsDataLoading(false);
          setIsLoading(false);
        });
    });
  }, [season, setIsLoading, setLoadingMessage]);

  if (isDataLoading) {
    return (
      <div className="space-y-4 lg:space-y-6">
        <SeasonToggle />
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <SeasonToggle />

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance Chart */}
        <Card className="hover:shadow-xl transition-all duration-300 ease-out">
          <CardContent className="pt-6">
            <TeamPerformanceChart
              data={standings.slice(0, 8).map((team: any) => ({
                team: team.team?.name || "Unknown Team",
                points: team.points || 0,
                wins: team.all?.win || 0,
                draws: team.all?.draw || 0,
                losses: team.all?.lose || 0,
                goalsFor: team.all?.goals?.for || 0,
                goalsAgainst: team.all?.goals?.against || 0,
              }))}
              title="Team Performance Overview"
              height={350}
            />
          </CardContent>
        </Card>

        {/* Goals Distribution Chart */}
        <Card className="hover:shadow-xl transition-all duration-300 ease-out">
          <CardContent className="pt-6">
            <GoalsDistributionChart
              data={scorers.slice(0, 8).map((player: any) => ({
                player: player.player?.name || "Unknown Player",
                team: player.statistics?.[0]?.team?.name || "Unknown Team",
                goals: player.statistics?.[0]?.goals?.total || 0,
              }))}
              title="Goals Distribution"
              height={350}
            />
          </CardContent>
        </Card>
      </div>

      {/* Match Results Chart */}
      <Card className="hover:shadow-xl transition-all duration-300 ease-out">
        <CardContent className="pt-6">
          <MatchResultsChart
            data={recentFixtures.slice(0, 10).map((fixture: any) => ({
              date: fixture.fixture?.date || new Date().toISOString(),
              homeTeam: fixture.teams?.home?.name || "Unknown Team",
              awayTeam: fixture.teams?.away?.name || "Unknown Team",
              homeScore: fixture.goals?.home || 0,
              awayScore: fixture.goals?.away || 0,
            }))}
            title="Recent Match Results"
            height={300}
          />
        </CardContent>
      </Card>

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
                <Link
                  key={team.rank}
                  href={`/teams/${encodeURIComponent(
                    team.team?.name || "Unknown Team"
                  )}`}
                  className="block hover:scale-105 transition-transform duration-200"
                >
                  <li className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base p-2 rounded-md hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02] transform-gpu group/item">
                    <span className="font-bold text-lg text-muted-foreground flex-shrink-0 group-hover/item:text-primary transition-colors duration-200">
                      {team.rank}.
                    </span>
                    <TeamDisplay
                      name={team.team?.name || "Unknown Team"}
                      logo={team.team?.logo || "/next.svg"}
                      size="md"
                      className="flex-1 group-hover/item:text-primary transition-colors duration-200"
                    />
                    <span className="ml-auto text-muted-foreground flex-shrink-0 group-hover/item:text-primary transition-colors duration-200">
                      {team.points || 0} pts
                    </span>
                  </li>
                </Link>
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
                    <Link
                      href={`/teams/${encodeURIComponent(
                        f.teams?.home?.name || "Unknown Team"
                      )}`}
                      className="hover:scale-105 transition-transform duration-200"
                    >
                      <TeamDisplay
                        name={f.teams?.home?.name || "Unknown Team"}
                        logo={f.teams?.home?.logo || "/next.svg"}
                        size="sm"
                        className="group-hover/item:text-primary transition-colors duration-200"
                      />
                    </Link>
                    <span className="font-bold">{f.goals?.home || 0}</span>
                    <span> : </span>
                    <span className="font-bold">{f.goals?.away || 0}</span>
                    <Link
                      href={`/teams/${encodeURIComponent(
                        f.teams?.away?.name || "Unknown Team"
                      )}`}
                      className="hover:scale-105 transition-transform duration-200"
                    >
                      <TeamDisplay
                        name={f.teams?.away?.name || "Unknown Team"}
                        logo={f.teams?.away?.logo || "/next.svg"}
                        size="sm"
                        className="group-hover/item:text-primary transition-colors duration-200"
                      />
                    </Link>
                  </div>
                  <div className="text-xs text-muted-foreground lg:text-sm group-hover/item:text-primary/70 transition-colors duration-200">
                    {f.fixture?.date
                      ? new Date(f.fixture.date).toLocaleDateString()
                      : "Date TBD"}
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

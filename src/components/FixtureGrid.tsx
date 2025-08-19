"use client";
import { useAppContext } from "@/context/AppContext";
import { useLoading } from "@/context/LoadingContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import TeamDisplay from "./ui/TeamDisplay";
import { Card, CardContent } from "./ui/card";
import { MatchResultsChart } from "./ui/enhanced-charts";

type Fixture = {
  fixture: { date: string; status: { short: string } };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  goals: { home: number; away: number };
};

export default function FixturesGrid() {
  const { season } = useAppContext();
  const { setIsLoading, setLoadingMessage } = useLoading();
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [filteredFixtures, setFilteredFixtures] = useState<Fixture[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teams, setTeams] = useState<string[]>([]);
  const [isLoading, setIsLoadingLocal] = useState(false);

  useEffect(() => {
    setIsLoadingLocal(true);
    setLoadingMessage("Loading fixtures...");
    setIsLoading(true);

    // Use cached fetch for better performance
    import("@/lib/cachedFetcher").then(({ cachedFetch }) => {
      cachedFetch(`/api/fixtures?season=${season}`)
        .then((data: any) => {
          // Filter out invalid data
          const validFixtures = (data || []).filter(
            (fixture: any) =>
              fixture &&
              fixture.teams &&
              fixture.teams.home &&
              fixture.teams.away &&
              fixture.fixture
          );
          setFixtures(validFixtures);
          setFilteredFixtures(validFixtures);
        })
        .catch((error) => {
          console.error("Error fetching fixtures:", error);
          setFixtures([]);
          setFilteredFixtures([]);
        })
        .finally(() => {
          setIsLoadingLocal(false);
          setIsLoading(false);
        });
    });
  }, [season, setIsLoading, setLoadingMessage]);

  useEffect(() => {
    // Use cached fetch for better performance
    import("@/lib/cachedFetcher").then(({ cachedFetch }) => {
      cachedFetch("/api/teams")
        .then((data: any) => {
          // Extract team names from valid teams
          const teamNames = (data || [])
            .filter((team: any) => team && team.name)
            .map((team: any) => team.name);
          setTeams(teamNames);
        })
        .catch((error) => {
          console.error("Error fetching teams:", error);
          setTeams([]);
        });
    });
  }, []);

  // Debounced search
  const handleSearch = debounce((term: string) => {
    let filtered = fixtures;

    // Filter by search term
    if (term) {
      filtered = filtered.filter(
        (f) =>
          f.teams?.home?.name?.toLowerCase().includes(term.toLowerCase()) ||
          f.teams?.away?.name?.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Filter by selected team
    if (selectedTeam) {
      filtered = filtered.filter(
        (f) =>
          f.teams?.home?.name === selectedTeam ||
          f.teams?.away?.name === selectedTeam
      );
    }

    setFilteredFixtures(filtered);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  };

  const handleTeamChange = (team: string) => {
    setSelectedTeam(team);
    let filtered = fixtures;

    // Filter by search term
    if (search) {
      filtered = filtered.filter(
        (f) =>
          f.teams?.home?.name?.toLowerCase().includes(search.toLowerCase()) ||
          f.teams?.away?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by selected team
    if (team) {
      filtered = filtered.filter(
        (f) => f.teams?.home?.name === team || f.teams?.away?.name === team
      );
    }

    setFilteredFixtures(filtered);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={handleSearchChange}
            placeholder="Search fixtures by team name..."
            className="w-full pl-10 pr-4 py-2 border border-input bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>

        {/* Team Filter */}
        <div className="relative">
          <select
            value={selectedTeam}
            onChange={(e) => handleTeamChange(e.target.value)}
            className="border border-input bg-background text-foreground px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent min-w-[150px]"
          >
            <option value="">All Teams</option>
            {teams.map((team, i) => (
              <option key={i} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredFixtures.length} of {fixtures.length} fixtures
      </div>

      {/* Match Results Chart */}
      <Card className="hover:shadow-xl transition-all duration-300 ease-out">
        <CardContent className="pt-6">
          <MatchResultsChart
            data={filteredFixtures.slice(0, 15).map((fixture) => ({
              date: fixture.fixture?.date || new Date().toISOString(),
              homeTeam: fixture.teams?.home?.name || "Unknown Team",
              awayTeam: fixture.teams?.away?.name || "Unknown Team",
              homeScore: fixture.goals?.home || 0,
              awayScore: fixture.goals?.away || 0,
            }))}
            title="Fixture Results Analysis"
            height={350}
          />
        </CardContent>
      </Card>

      {/* Fixtures Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredFixtures.map((f, i) => (
          <Card
            key={`${f.fixture?.date}-${f.teams?.home?.name}-${f.teams?.away?.name}-${i}`}
            className="p-4"
          >
            <p className="text-sm text-muted-foreground mb-1">
              {f.fixture?.date
                ? new Date(f.fixture.date).toLocaleString()
                : "Date TBD"}{" "}
              ({f.fixture?.status?.short || "TBD"})
            </p>
            <div className="flex items-center justify-between font-medium">
              <Link
                href={`/teams/${encodeURIComponent(
                  f.teams?.home?.name || "Unknown Team"
                )}`}
                className="flex-1 hover:scale-105 transition-transform duration-200"
              >
                <TeamDisplay
                  name={f.teams?.home?.name || "Unknown Team"}
                  logo={f.teams?.home?.logo || "/next.svg"}
                  size="sm"
                  className="hover:text-primary transition-colors duration-200"
                />
              </Link>
              <span className="mx-4">
                {f.goals?.home ?? "-"} : {f.goals?.away ?? "-"}
              </span>
              <Link
                href={`/teams/${encodeURIComponent(
                  f.teams?.away?.name || "Unknown Team"
                )}`}
                className="flex-1 text-right hover:scale-105 transition-transform duration-200"
              >
                <TeamDisplay
                  name={f.teams?.away?.name || "Unknown Team"}
                  logo={f.teams?.away?.logo || "/next.svg"}
                  size="sm"
                  className="hover:text-primary transition-colors duration-200"
                />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results Message */}
      {filteredFixtures.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No fixtures found matching your search criteria.
        </div>
      )}
    </div>
  );
}

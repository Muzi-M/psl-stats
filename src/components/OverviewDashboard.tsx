"use client";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import SeasonToggle from "./SeasonToggle";
import TopScorersChart from "./TopScorersChart";
import TopRatedChart from "./TopRatedChart";

export default function OverviewDashboard() {
  const { season } = useAppContext();

  const [standings, setStandings] = useState([]);
  const [scorers, setScorers] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recentFixtures, setRecentFixtures] = useState([]);

  useEffect(() => {
    fetch(`/api/overview?season=${season}`)
      .then((res) => res.json())
      .then((data) => {
        setStandings(data.standings || []);
        setScorers(data.scorers || []);
        setTopRated(data.topRated || []);
        setRecentFixtures(data.fixtures || []);
      });
  }, [season]);

  return (
    <>
      <SeasonToggle />

      <section className="mb-6">
        <h2 className="font-semibold mb-2">🏆 Top 5 Teams</h2>
        <ul className="space-y-1 text-sm">
          {standings.slice(0, 5).map((team: any, i) => (
            <li key={i} className="flex items-center gap-2">
              <img
                src={team.team.logo}
                alt={team.team.name}
                className="w-5 h-5"
              />
              {team.rank}. {team.team.name} – {team.points} pts
            </li>
          ))}
        </ul>
        <div className="text-sm mt-2">
          <a href="/standings" className="text-blue-600 hover:underline">
            View full standings →
          </a>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">⚽ Top 5 Scorers</h2>
        <TopScorersChart data={scorers} />
        <div className="text-sm mt-2">
          <a href="/players" className="text-blue-600 hover:underline">
            View full standings →
          </a>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">⭐ Top 10 Rated Players</h2>
        <TopRatedChart data={topRated} />
        <div className="text-sm mt-2">
          <a href="/players" className="text-blue-600 hover:underline">
            View full standings →
          </a>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">🕒 Last 5 Fixtures</h2>
        <ul className="space-y-1 text-sm">
          {recentFixtures.map((f: any, i) => (
            <li key={i}>
              {f.teams.home.name} {f.goals.home} : {f.goals.away}{" "}
              {f.teams.away.name}
              &nbsp;({new Date(f.fixture.date).toLocaleDateString()})
            </li>
          ))}
        </ul>
        <div className="text-sm mt-2">
          <a href="/fixtures" className="text-blue-600 hover:underline">
            View full standings →
          </a>
        </div>
      </section>
    </>
  );
}

"use client";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import SeasonToggle from "./SeasonToggle";

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
            <li key={i}>
              {team.rank}. {team.team.name} – {team.points} pts
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">⚽ Top 5 Scorers</h2>
        <ul className="space-y-1 text-sm">
          {scorers.slice(0, 5).map((p: any, i) => (
            <li key={i}>
              {p.player.name} – {p.statistics[0]?.goals?.total || 0} goals
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">⭐ Top 10 Rated Players</h2>
        <ul className="space-y-1 text-sm">
          {topRated.map((p: any, i) => (
            <li key={i}>
              {p.player.name} – Avg Rating: {p.avgRating}
            </li>
          ))}
        </ul>
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
      </section>
    </>
  );
}

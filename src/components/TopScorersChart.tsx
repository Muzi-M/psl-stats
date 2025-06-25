"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TopScorersChart({ data }: { data: any[] }) {
  const formatted = data.map((p) => ({
    name: p.player.name.split(" ")[0], // First name
    goals: p.statistics[0]?.goals?.total || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={formatted}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="goals" />
      </BarChart>
    </ResponsiveContainer>
  );
}

"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TopRatedChart({ data }: { data: any[] }) {
  const formatted = data.map((p) => ({
    name: p.player.name.split(" ")[0], // Shorten to first name
    rating: parseFloat(p.avgRating.toFixed(2)), // Ensure number
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={formatted}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Bar dataKey="rating" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

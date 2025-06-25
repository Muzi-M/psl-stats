"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

export default function TopRatedChart({ data }: { data: any[] }) {
  const formatted = data.map((p) => ({
    name: p.player.name.split(" ")[0], // Shorten to first name
    rating: parseFloat(p.avgRating.toFixed(2)), // Ensure number
  }));
  //   console.log(data);

  return (
    <div style={{ background: "red", height: 300 }}>
      <BarChart width={400} height={300} data={formatted}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 10]} />
        <Bar dataKey="rating" fill="#8884d8" radius={4} />
      </BarChart>
    </div>
  );
}

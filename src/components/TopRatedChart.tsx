"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/charts";

export default function TopRatedChart({ data }: { data: any[] }) {
  const formatted = data.map((p) => ({
    name: p.player.name.split(" ")[0], // Shorten to first name
    rating: parseFloat(p.avgRating.toFixed(2)), // Ensure number
  }));

  return (
    <ChartContainer className="h-[300px] w-full">
      <BarChart data={formatted} accessibilityLayer>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 10]} />
        <ChartTooltip
          content={<ChartTooltipContent />}
          cursor={false}
          defaultIndex={1}
        />
        <Bar dataKey="rating" fill="#8884d8" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

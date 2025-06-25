"use client";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/charts";

export default function TopScorersChart({ data }: { data: any[] }) {
  const formatted = data.slice(0, 5).map((p) => ({
    name: p.player.name.split(" ")[0],
    goals: p.statistics?.[0]?.goals?.total ?? 0,
  }));
  console.log("scorers formatted", formatted);

  return (
    <ChartContainer className="h-[300px] w-full">
      <BarChart
        data={formatted}
        layout="vertical"
        accessibilityLayer
        margin={{
          left: -20,
        }}
      >
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          axisLine={false}
        />
        <XAxis dataKey="goals" type="number" hide />
        <ChartTooltip
          content={<ChartTooltipContent />}
          cursor={false}
          defaultIndex={1}
        />
        <Bar dataKey="goals" fill="#8884d8" radius={5}>
          <LabelList
            position="right"
            offset={8}
            className="font-medium"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

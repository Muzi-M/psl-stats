"use client";

import * as React from "react";
import {
  Bar,
  BarChart as BarChartPrimitive,
  CartesianGrid,
  LabelList,
  Line,
  LineChart as LineChartPrimitive,
  Pie,
  PieChart as PieChartPrimitive,
  RadialBar,
  RadialBarChart as RadialBarChartPrimitive,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

const ChartContainer = ({
  className,
  ...props
}: React.ComponentProps<typeof ResponsiveContainer>) => (
  <ResponsiveContainer
    className={cn("max-h-[550px] w-full", className)}
    {...props}
  />
);

const ChartTooltip = ({
  className,
  ...props
}: React.ComponentProps<typeof RechartsTooltip> & { className?: string }) => (
  <RechartsTooltip
    contentStyle={{
      background: "hsl(var(--background))",
      borderColor: "hsl(var(--border))",
    }}
    labelStyle={{
      color: "hsl(var(--foreground))",
      fontWeight: "500",
    }}
    itemStyle={{
      color: "hsl(var(--muted-foreground))",
      fontWeight: "500",
    }}
    wrapperClassName={cn("rounded-md border", className)}
    {...props}
  />
);

const ChartTooltipContent = (props: any) => (
  // Use a div here to allow for custom content
  <div
    className={cn(
      "overflow-hidden rounded-md border bg-background px-3 py-1.5 text-sm shadow-lg animate-in fade-in-0 zoom-in-95",
      props.className
    )}
  />
);

const ChartLegend = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("flex items-center justify-center gap-4", className)}
    {...props}
  />
);

const ChartLegendItem = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex items-center gap-1.5 text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
);

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  // Export recharts components
  BarChartPrimitive,
  LineChartPrimitive,
  PieChartPrimitive,
  RadialBarChartPrimitive,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Line,
  Pie,
  RadialBar,
  LabelList,
};

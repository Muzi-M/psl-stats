"use client";

import { useAppContext } from "@/context/AppContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const seasons = [2020, 2021, 2022, 2023, 2024, 2025];

export default function SeasonToggle() {
  const { season, setSeason } = useAppContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg lg:text-xl">Season</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {seasons.map((s) => (
            <Button
              key={s}
              variant={season === s ? "default" : "outline"}
              size="sm"
              onClick={() => setSeason(s)}
              className="text-sm lg:text-base"
            >
              {s}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

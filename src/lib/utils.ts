import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSeason(season: number): string {
  const year = season.toString().slice(-2);
  const nextYear = (season + 1).toString().slice(-2);
  return `${year}/${nextYear}`;
}

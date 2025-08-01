"use client";
import { useAppContext } from "@/context/AppContext";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { formatSeason } from "@/lib/utils";

const SEASONS = [2020, 2021, 2022, 2023, 2024];

export default function SeasonToggle() {
  const { season, setSeason } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-4 flex items-center gap-4">
      <label className="font-medium">Season:</label>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between border border-input bg-background text-foreground px-3 py-1 rounded min-w-[100px] focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        >
          <span>{formatSeason(season)}</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-full border border-input bg-card text-card-foreground rounded shadow-lg z-[9999] min-w-[100px] dropdown-menu">
            {SEASONS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSeason(s);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors ${
                  s === season
                    ? "bg-accent text-accent-foreground"
                    : "text-card-foreground"
                }`}
              >
                {formatSeason(s)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

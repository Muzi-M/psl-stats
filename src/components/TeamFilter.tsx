"use client";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function TeamFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (team: string) => void;
}) {
  const [teams, setTeams] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/teams") // we'll make this next
      .then((res) => res.json())
      .then(setTeams);
  }, []);

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
    <div className="relative mb-4" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between border border-input bg-background text-foreground px-3 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
      >
        <span>{value || "All Teams"}</span>
        <ChevronDown className="h-4 w-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full border border-input bg-card text-card-foreground rounded shadow-lg z-[9999] max-h-60 overflow-y-auto dropdown-menu">
          <button
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className={`w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors ${
              value === ""
                ? "bg-accent text-accent-foreground"
                : "text-card-foreground"
            }`}
          >
            All Teams
          </button>
          {teams.map((team, i) => (
            <button
              key={i}
              onClick={() => {
                onChange(team);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors ${
                team === value
                  ? "bg-accent text-accent-foreground"
                  : "text-card-foreground"
              }`}
            >
              {team}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

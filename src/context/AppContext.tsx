"use client";
import { createContext, useContext, useState } from "react";

type AppContextType = {
  season: number;
  setSeason: (season: number) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeason] = useState(2024);

  return (
    <AppContext.Provider value={{ season, setSeason }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used inside AppProvider");
  return context;
}

import StandingsTable from "@/components/StandingsTable";
import SeasonToggle from "@/components/SeasonToggle";

export default function StandingsPage() {
  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">PSL Standings</h1>
      <SeasonToggle />
      <StandingsTable />
    </main>
  );
}

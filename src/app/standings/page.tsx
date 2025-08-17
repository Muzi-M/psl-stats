import StandingsTable from "@/components/StandingsTable";
import SeasonToggle from "@/components/SeasonToggle";

export default function StandingsPage() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <SeasonToggle />
      <StandingsTable />
    </div>
  );
}

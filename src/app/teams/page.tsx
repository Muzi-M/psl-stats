import TeamDashboard from "@/components/TeamDashboard";
import SeasonToggle from "@/components/SeasonToggle";

export default function TeamsPage() {
  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">PSL Teams</h1>
      <SeasonToggle />
      <TeamDashboard />
    </main>
  );
}

import TeamDashboard from "@/components/TeamDashboard";
import SeasonToggle from "@/components/SeasonToggle";

export default function TeamsPage() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <SeasonToggle />
      <TeamDashboard />
    </div>
  );
}

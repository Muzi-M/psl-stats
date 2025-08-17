import FixtureGrid from "@/components/FixtureGrid";
import SeasonToggle from "@/components/SeasonToggle";

export default function FixturesPage() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <SeasonToggle />
      <FixtureGrid />
    </div>
  );
}

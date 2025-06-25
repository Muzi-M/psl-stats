import FixturesGrid from "@/components/FixturesGrid";
import SeasonToggle from "@/components/SeasonToggle";

export default function FixturesPage() {
  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">PSL Fixtures</h1>
      <SeasonToggle />
      <FixturesGrid />
    </main>
  );
}

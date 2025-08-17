import PlayerGrid from "@/components/PlayerGrid";
import SeasonToggle from "@/components/SeasonToggle";

export default function PlayersPage() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <SeasonToggle />
      <PlayerGrid />
    </div>
  );
}

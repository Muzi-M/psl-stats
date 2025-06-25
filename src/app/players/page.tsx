import PlayerGrid from "@/components/PlayerGrid";
import SeasonToggle from "@/components/SeasonToggle";

export default function PlayersPage() {
  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">PSL Players</h1>
      <SeasonToggle />
      <PlayerGrid />
    </main>
  );
}

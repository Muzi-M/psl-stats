import Link from "next/link";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/standings", label: "Standings" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/players", label: "Players" },
  { href: "/teams", label: "Teams" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="h-screen sticky top-0 flex flex-col gap-2 w-56 min-w-[12rem] p-4 bg-card border-r">
      <div className="mb-6 text-2xl font-bold tracking-tight text-primary">
        PSL Dashboard
      </div>
      <nav className="flex flex-col gap-1">
        {navLinks.map((link) => (
          <Button
            asChild
            key={link.href}
            variant={pathname === link.href ? "default" : "ghost"}
            className="justify-start w-full"
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
}

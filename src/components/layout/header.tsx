import { CodeXml } from "lucide-react";
import Link from "next/link";
import { MainNav } from "./main-nav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg mr-6">
          <CodeXml className="h-6 w-6 text-primary" />
          <span className="font-headline">CyberCraft Studio</span>
        </Link>
        <MainNav />
      </div>
    </header>
  );
}

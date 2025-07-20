import { CodeXml, Menu } from "lucide-react";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const MobileNav = () => (
    <Sheet>
        <SheetTrigger asChild>
            <Button
                variant="ghost"
                className="md:hidden"
            >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Navigation</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-6">
                <CodeXml className="h-6 w-6 text-primary" />
                <span className="font-headline">CyberCraft Studio</span>
            </Link>
            <div className="flex flex-col gap-4">
                 <MainNav mobile />
            </div>
        </SheetContent>
    </Sheet>
);


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="md:hidden">
            <MobileNav />
        </div>
        <Link href="/" className="hidden md:flex items-center gap-2 font-bold text-lg mr-6">
          <CodeXml className="h-6 w-6 text-primary" />
          <span className="font-headline">CyberCraft Studio</span>
        </Link>
        <div className="hidden md:flex flex-1">
            <MainNav />
        </div>
      </div>
    </header>
  );
}

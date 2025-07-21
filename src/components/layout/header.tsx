"use client";

import { CodeXml, Menu, LogIn, UserPlus, LogOut } from "lucide-react";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const AuthButtons = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
    };

    if (loading) {
        return <div className="h-10 w-24 bg-muted/50 animate-pulse rounded-md" />;
    }

    if (user) {
        return (
            <Button onClick={handleLogout} variant="ghost">
                <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
                <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
            </Button>
            <Button asChild>
                <Link href="/signup">
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </Link>
            </Button>
        </div>
    );
};


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
             <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
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
         <div className="flex items-center gap-2 ml-auto">
            <AuthButtons />
        </div>
      </div>
    </header>
  );
}

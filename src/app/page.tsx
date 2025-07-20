import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/homepage/hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="grid gap-16 md:gap-24">
          <Hero />
          <section className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Ready to Start?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's build your next-generation website.
            </p>
            <Button asChild size="lg">
              <Link href="/order">
                Order Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

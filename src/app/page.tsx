import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/homepage/hero";
import ProjectForm from "@/components/homepage/project-form";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="grid gap-16 md:gap-24">
          <Hero />
          <ProjectForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

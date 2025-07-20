import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProjectForm from "@/components/homepage/project-form";

export default function OrderPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <ProjectForm />
      </main>
      <Footer />
    </div>
  );
}

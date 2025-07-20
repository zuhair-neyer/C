import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Goal, Rocket } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <section className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter mb-4">
            About CyberCraft Studio
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            We are a passionate team of freelance developers dedicated to building the web of tomorrow, today.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At CyberCraft Studio, our mission is to empower businesses and individuals by creating high-performance, visually stunning, and futuristic websites. We believe that a great website is more than just code; it's an experience. We combine cutting-edge technology with creative design to build digital products that are not only beautiful but also intuitive and fast.
            </p>
            <p className="text-muted-foreground">
              Our goal is to bring your vision to life, ensuring that your online presence is powerful, memorable, and ready for the future.
            </p>
          </div>
          <div className="relative h-80 w-full">
             <Image
              src="https://placehold.co/600x400.png"
              alt="Our Mission"
              fill
              className="rounded-lg object-cover"
              data-ai-hint="teamwork collaboration"
            />
          </div>
        </div>

        <section>
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="transform transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 bg-card/80 backdrop-blur-sm border-primary/20">
              <CardHeader className="items-center text-center p-6">
                 <Image src="https://placehold.co/128x128.png" alt="Zuhair" width={128} height={128} className="rounded-full" data-ai-hint="male portrait" />
                <CardTitle className="font-headline mt-4 text-2xl">Zuhair</CardTitle>
                <p className="text-primary font-medium">Lead Developer</p>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-center">
                <p className="text-muted-foreground">
                  Zuhair is the architect behind our projects, specializing in robust backend systems and modern frontend frameworks.
                </p>
              </CardContent>
            </Card>
            <Card className="transform transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 bg-card/80 backdrop-blur-sm border-primary/20">
              <CardHeader className="items-center text-center p-6">
                <Image src="https://placehold.co/128x128.png" alt="Ammar" width={128} height={128} className="rounded-full" data-ai-hint="male portrait" />
                <CardTitle className="font-headline mt-4 text-2xl">Ammar</CardTitle>
                 <p className="text-primary font-medium">UI/UX Designer & Frontend Dev</p>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-center">
                <p className="text-muted-foreground">
                  Ammar brings ideas to life with his creative designs and pixel-perfect frontend development skills.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

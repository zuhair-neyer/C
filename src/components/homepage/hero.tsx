"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code, Palette, Rocket } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "Custom Development",
    description: "Tailor-made websites built from scratch to meet your unique needs.",
  },
  {
    icon: <Palette className="h-8 w-8 text-primary" />,
    title: "Futuristic UI/UX",
    description: "Stunning, user-friendly designs that feel like the future.",
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "Performance First",
    description: "Blazing-fast websites optimized for speed and user experience.",
  },
];

export default function Hero() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a skeleton or null to avoid hydration mismatch on server
    return null;
  }

  return (
    <section className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter mb-4">
        Crafting Digital Experiences of Tomorrow
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
        We are CyberCraft Studio, a freelancing service dedicated to building
        stunning, high-performance websites with a futuristic edge. Let's bring
        your vision to life.
      </p>
      <div className="mb-12">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/30 transition-all hover:scale-105">
          <Link href="#project-form">
            Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 [perspective:1000px]">
        {services.map((service, index) => (
          <Card
            key={service.title}
            className="group transform transition-transform duration-500 ease-out hover:[transform:rotateY(0)_scale(1.05)] [transform-style:preserve-3d] bg-card/80 backdrop-blur-sm border-primary/20"
            style={{ transform: `rotateY(${(index - 1) * -15}deg)` }}
          >
            <CardHeader className="items-center p-6">
              {service.icon}
              <CardTitle className="font-headline mt-2">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

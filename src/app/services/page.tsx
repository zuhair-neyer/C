import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Brush, ShoppingCart, Newspaper, User, Code } from "lucide-react";

const serviceList = [
  {
    icon: <User className="h-10 w-10 text-primary" />,
    title: "Portfolio Websites",
    description: "Showcase your work and skills with a stunning, personalized portfolio that stands out.",
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Business Websites",
    description: "Establish a strong online presence for your company with a professional and informative website.",
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-primary" />,
    title: "eCommerce Stores",
    description: "Sell your products online with a secure, user-friendly, and fully-featured eCommerce platform.",
  },
  {
    icon: <Newspaper className="h-10 w-10 text-primary" />,
    title: "Blogs & Publications",
    description: "Share your thoughts, stories, and expertise with a beautifully designed and easy-to-manage blog.",
  },
  {
    icon: <Brush className="h-10 w-10 text-primary" />,
    title: "Custom Solutions",
    description: "Have a unique idea? We build tailor-made web applications to meet your specific requirements.",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <section className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter mb-4">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            We offer a range of web development services to bring your digital vision to life.
            Each project is crafted with precision, performance, and a touch of the future.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, index) => (
            <Card
              key={service.title}
              className="group transform transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 bg-card/80 backdrop-blur-sm border-primary/20 flex flex-col"
            >
              <CardHeader className="items-center text-center p-6">
                {service.icon}
                <CardTitle className="font-headline mt-4 text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-center flex-grow flex flex-col">
                <p className="text-muted-foreground flex-grow">{service.description}</p>
                <Button asChild className="mt-6">
                  <Link href="/order">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

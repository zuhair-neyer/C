"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const allRoutes = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/order", label: "Order", auth: true },
  { href: "/account", label: "My Account", auth: true },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export function MainNav({
  className,
  mobile = false,
  ...props
}: React.HTMLAttributes<HTMLElement> & { mobile?: boolean }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const routes = allRoutes.filter(route => {
    if (route.auth) {
        return !!user;
    }
    return true;
  });

  if (loading) {
    return (
        <div className={cn("flex items-center", mobile ? "flex-col space-y-2 items-start" : "space-x-4 lg:space-x-6", className)}>
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-6 w-20 bg-muted/50 animate-pulse rounded-md" />
            ))}
        </div>
    );
  }

  return (
    <nav
      className={cn(
        "flex items-center",
        mobile ? "flex-col space-y-2 items-start" : "space-x-4 lg:space-x-6",
        className
      )}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            mobile && "text-lg w-full p-2 hover:bg-muted rounded-md",
            pathname === route.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

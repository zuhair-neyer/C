"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/order", label: "Order" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export function MainNav({
  className,
  mobile = false,
  ...props
}: React.HTMLAttributes<HTMLElement> & { mobile?: boolean }) {
  const pathname = usePathname();

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

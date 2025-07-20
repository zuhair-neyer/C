"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {year} CyberCraft Studio. Developed by Zuhair, Ammar.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="mailto:contact@cybercraft.studio" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              contact@cybercraft.studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

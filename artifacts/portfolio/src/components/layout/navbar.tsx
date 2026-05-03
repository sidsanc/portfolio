import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Moon, Sun, Command, Menu } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Navbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/chat", label: "AI Chat" },
  ];

  const NavLinks = () => (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
          <span className={`block px-4 py-2 rounded-md transition-all cursor-pointer ${
            location === link.href
              ? "neo-inset text-primary font-medium"
              : "hover:text-primary hover:bg-black/5 dark:hover:bg-white/5"
          }`}>
            {link.label}
          </span>
        </Link>
      ))}
    </>
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <div className="max-w-6xl mx-auto neo-card px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <span className="text-xl font-bold tracking-tighter text-primary cursor-pointer">
            SS
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={`px-4 py-2 rounded-md transition-all cursor-pointer text-sm font-medium ${
                location === link.href
                  ? "neo-inset text-primary"
                  : "hover:text-primary"
              }`}>
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCommand}
            className="neo-btn p-2 text-muted-foreground hover:text-foreground flex items-center gap-2"
          >
            <Command className="h-4 w-4" />
            <span className="hidden sm:inline-block text-xs font-mono">⌘K</span>
          </button>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="neo-btn p-2 text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="neo-btn p-2 text-muted-foreground hover:text-foreground">
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border flex flex-col gap-4">
                <div className="text-xl font-bold text-primary mb-4">Navigation</div>
                <NavLinks />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

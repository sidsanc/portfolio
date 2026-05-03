import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Moon, Sun, Command, Menu } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
          <span className={`block px-4 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
            location === link.href
              ? "gradient-accent font-semibold"
              : "text-foreground/70 hover:text-foreground"
          }`}>
            {link.label}
          </span>
        </Link>
      ))}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto liquid-glass rounded-2xl px-5 py-3 flex items-center justify-between"
      >
        {/* Logo */}
        <Link href="/">
          <img
            src="/logo.png"
            alt="Siddhant Sancheti"
            className="h-9 w-9 rounded-full cursor-pointer select-none object-cover"
          />
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={`relative px-3.5 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer font-medium ${
                location === link.href
                  ? "gradient-accent"
                  : "text-foreground/60 hover:text-foreground"
              }`}>
                {link.label}
                {location === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg neo-inset -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </span>
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCommand}
            className="neo-btn p-2.5 rounded-xl text-foreground/50 hover:text-foreground transition-colors"
            aria-label="Open command bar"
          >
            <Command className="h-4 w-4" />
          </button>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="neo-btn p-2.5 rounded-xl text-foreground/50 hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark"
              ? <Sun className="h-4 w-4" />
              : <Moon className="h-4 w-4" />
            }
          </button>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="neo-btn p-2.5 rounded-xl text-foreground/50 hover:text-foreground transition-colors">
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/90 backdrop-blur-xl border-border/40 flex flex-col gap-2 pt-12">
                <SheetTitle className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-4 mb-2 sr-only">Navigation</SheetTitle>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-4 mb-2" aria-hidden>Navigation</p>
                <NavLinks />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </header>
  );
}

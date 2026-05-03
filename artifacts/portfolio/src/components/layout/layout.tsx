import { useState } from "react";
import { Navbar } from "./navbar";
import { CommandBar } from "./command-bar";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <CommandBar open={commandOpen} setOpen={setCommandOpen} />
      
      <main className="pt-28 pb-16 px-4 md:px-8 max-w-6xl mx-auto min-h-[calc(100vh-100px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Code,
  FileText,
  Github,
  Home,
  Linkedin,
  Mail,
  MessageSquare,
  User,
  Briefcase,
  Layers,
  Twitter,
  Instagram
} from "lucide-react";

export function CommandBar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => setLocation("/"))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setLocation("/about"))}>
            <User className="mr-2 h-4 w-4" />
            <span>About</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setLocation("/skills"))}>
            <Code className="mr-2 h-4 w-4" />
            <span>Skills</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setLocation("/experience"))}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Experience</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setLocation("/projects"))}>
            <Layers className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setLocation("/blog"))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Blog</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setLocation("/chat"))}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Jarvis</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setLocation("/contact"))}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Contact</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Social Links">
          <CommandItem
            onSelect={() => runCommand(() => window.open("https://github.com/sidsanc", "_blank"))}
          >
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => window.open("https://www.linkedin.com/in/siddhant-sancheti/", "_blank"))
            }
          >
            <Linkedin className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => window.open("https://www.instagram.com/sid_sanc4998_/", "_blank"))
            }
          >
            <Instagram className="mr-2 h-4 w-4" />
            <span>Instagram</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => window.open("https://hashnode.com/@sidsanc", "_blank"))
            }
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Hashnode Blog</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => (window.location.href = "mailto:siddhantsanchetik@gmail.com"))
            }
          >
            <Mail className="mr-2 h-4 w-4" />
            <span>Email</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

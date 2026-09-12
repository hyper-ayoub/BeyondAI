"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "/#agent", label: "The agent" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#demo", label: "Live demo" },
  { href: "/#platforms", label: "Platforms" },
  { href: "/#use-cases", label: "Use cases" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/#hr", label: "For HR teams" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg"
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <Image src="/logo-mark.png" alt="Momentum" width={30} height={27} className="h-8 w-auto" priority />
          <span className="text-base">Momentum</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#demo"
          className="rounded-full border border-border-strong px-4 py-2 text-sm font-medium transition-colors hover:bg-surface"
        >
          Try the demo
        </Link>
      </Container>
    </motion.header>
  );
}

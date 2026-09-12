"use client";

import { motion } from "framer-motion";
import { AppWindow, ArrowRight, Puzzle } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const platforms = [
  {
    icon: AppWindow,
    title: "Desktop app",
    tagline: "macOS & Windows",
    copy: "Runs quietly in the background to read system-level signals — active window, idle time — the context a browser alone can't see.",
    cta: "Start now",
    href: "/desktop",
  },
  {
    icon: Puzzle,
    title: "Browser extension",
    tagline: "Chrome, Edge & Brave",
    copy: "Watches tab and domain changes in real time and is what powers the distraction detection you just tried above.",
    cta: "Get the extension",
    href: "/extension",
  },
];

export function PlatformCTA() {
  return (
    <section id="platforms" className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="Beyond the browser tab"
          title="The dashboard is the control center. Two lightweight companions feed it."
          description="The live demo above simulates context in the page. In real use, that same context — and the same intervention loop — is produced by a desktop app and a browser extension talking to this dashboard."
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          {platforms.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7"
                >
                  <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent"
                  >
                    <Icon size={22} />
                  </motion.span>
                  <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-2">{p.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.copy}</p>
                  <Link
                    href={p.href}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
                  >
                    {p.cta} <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-center text-xs text-muted-2">
            Both companions are early access — join now and we&apos;ll notify you the moment your platform is ready.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

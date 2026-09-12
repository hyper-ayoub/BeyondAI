"use client";

import { motion } from "framer-motion";
import { Eye, HandHelping, Lock, MapPinOff, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";

const principles = [
  { icon: Eye, title: "Transparency", copy: "You always know what's collected and why." },
  { icon: HandHelping, title: "Consent", copy: "Every capability is explicitly granted, never assumed." },
  { icon: SlidersHorizontal, title: "Control", copy: "Disable any context source — browser, calendar, anything — at any time." },
  { icon: Lock, title: "Data minimization", copy: "Only what the loop actually needs, nothing collected on speculation." },
  { icon: ShieldCheck, title: "Local-first", copy: "Raw events can stay on-device; only summarized context reaches the model." },
  { icon: MapPinOff, title: "No hidden surveillance", copy: "A personal tool for you — never a monitoring layer aimed at you." },
];

export function Privacy() {
  return (
    <section id="privacy" className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="Privacy & ethics"
          title="This is behavioral data. It has to be treated like it."
          description="The user owns the data. Full stop. That principle is a design constraint, not a footnote."
          align="center"
        />

        <RevealGroup className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={revealItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.copy}</p>
              </motion.div>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}

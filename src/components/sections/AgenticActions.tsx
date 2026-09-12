"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FolderOpen, PauseCircle, RotateCcw, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";

const actions = [
  {
    icon: RotateCcw,
    title: "Return to work",
    copy: "Hides the distraction and brings back the last productive site.",
  },
  {
    icon: FolderOpen,
    title: "Open workspace",
    copy: "Opens the project, its docs, and the relevant GitHub repo in one move.",
  },
  {
    icon: PauseCircle,
    title: "Pause",
    copy: "The user can always ask for a break — the agent never overrides that.",
  },
  {
    icon: CheckCircle2,
    title: "End session",
    copy: "Closes the session cleanly and saves everything for analytics.",
  },
];

export function AgenticActions() {
  return (
    <section className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="Agentic actions"
          title="Real actions, not just messages."
          description="The MVP demonstrates four concrete actions the agent can take in your environment — each one reversible, each one visible."
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                variants={revealItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.copy}</p>
              </motion.div>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.15}>
          <div className="mt-8 flex items-center gap-2 text-xs text-muted-2">
            <ShieldCheck size={14} /> Every action above requires explicit approval before it runs. See
            human-in-the-loop below.
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

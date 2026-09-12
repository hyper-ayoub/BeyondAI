"use client";

import { motion } from "framer-motion";
import { Brain, CalendarClock, Compass, GraduationCap, HelpCircle, Sunset } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";

const cases = [
  {
    icon: Compass,
    title: "Deep work",
    copy: "“I want two uninterrupted hours.” Momentum sets up the workspace, watches context, and intervenes on drift.",
  },
  {
    icon: GraduationCap,
    title: "Learning",
    copy: "“I want to learn Python.” Momentum clarifies the goal, finds resources, and builds a path with real sessions.",
  },
  {
    icon: HelpCircle,
    title: "Procrastination",
    copy: "15 minutes into a session, the agent notices you're on social media and names exactly how long you've been gone.",
  },
  {
    icon: Brain,
    title: "Stuck, not distracted",
    copy: "No tab switch, no progress for 18 minutes. Momentum asks if you're stuck and offers to look at the problem with you.",
  },
  {
    icon: Sunset,
    title: "End-of-day reflection",
    copy: "Completed goals, abandoned ones, distractions, and the periods where you actually did your best work.",
  },
  {
    icon: CalendarClock,
    title: "Weekly review",
    copy: "Focus +18%, best day Tuesday, 6/8 goals completed, and a pattern: you perform better before 14:00.",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="Use cases"
          title="Same loop, different intentions."
          description="Goal, context, agent, intervention, action, measurement — the loop doesn't change. What changes is what counts as drift."
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                variants={revealItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.copy}</p>
              </motion.div>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}

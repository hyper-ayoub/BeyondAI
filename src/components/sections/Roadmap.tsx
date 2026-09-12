"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";

const phases = [
  {
    phase: "Phase 1",
    title: "Focus agent",
    items: ["Goals", "Focus sessions", "Browser context", "Distraction detection", "Interventions", "Analytics"],
    current: true,
  },
  {
    phase: "Phase 2",
    title: "Personal productivity agent",
    items: ["Calendar", "Tasks", "Email", "Slack / Teams", "Notifications", "Documents"],
  },
  {
    phase: "Phase 3",
    title: "Personal learning agent",
    items: ["Research", "Learning paths", "Adaptive learning", "Spaced repetition", "Resource recommendations"],
  },
  {
    phase: "Phase 4",
    title: "Life operating system",
    items: ["Calendar", "Tasks", "Browser", "Work apps", "Learning", "Personal goals — one behavior model"],
  },
];

export function Roadmap() {
  return (
    <section className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="Where this goes"
          title="The MVP proves one loop. The vision is bigger."
          description="From a focus agent to a system that optimizes the gap between the life you want and the behavior you actually have."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((p, i) => (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`rounded-2xl border p-6 ${
                p.current ? "border-accent/40 bg-accent-soft" : "border-border bg-surface"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-muted">
                {p.phase}
                {p.current && <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] text-white">now</span>}
              </div>
              <h3 className="mt-3 font-semibold">{p.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

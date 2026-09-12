"use client";

import { ArrowRight, Brain, Eye, Gauge, Target, Wand2, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Target,
    title: "Goal",
    copy: "“Finish my project MVP in the next 90 minutes.” Momentum parses intent, target date, and daily focus target.",
  },
  {
    icon: Eye,
    title: "Context",
    copy: "The Context Engine turns raw events — tab changes, idle time, elapsed minutes — into a structured state the agent can reason over.",
  },
  {
    icon: Brain,
    title: "Agent",
    copy: "A decision engine evaluates that context against the active session and decides whether an intervention is actually warranted.",
  },
  {
    icon: Zap,
    title: "Intervention",
    copy: "A specific, human message — never a generic nudge — proposing a concrete next action.",
  },
  {
    icon: Wand2,
    title: "Action",
    copy: "With your approval, Momentum acts: returns to your workspace, starts a break, or ends the session cleanly.",
  },
  {
    icon: Gauge,
    title: "Measurement",
    copy: "Every session produces analytics that feed back into the model of how you actually work.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="One loop, closed end to end."
          description="This is the entire MVP surface area: a single loop, demonstrated completely, rather than a dozen half-built features."
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={revealItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={18} />
                  </span>
                  <span className="font-mono text-xs text-muted-2">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.copy}</p>
                {i < steps.length - 1 && (
                  <ArrowRight
                    size={16}
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-muted-2 lg:block"
                  />
                )}
              </motion.div>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}

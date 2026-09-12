"use client";

import { motion } from "framer-motion";
import { ArrowDown, Brain, Database, Eye, LayoutDashboard, User, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";

const layers = [
  { icon: User, title: "User", subtitle: "Sets a goal, starts a session, approves actions" },
  { icon: LayoutDashboard, title: "Web app", subtitle: "Next.js dashboard, goals, live session view" },
  { icon: Eye, title: "Context engine", subtitle: "Events, session state, user goals" },
  { icon: Brain, title: "AI agent", subtitle: "Reasoning, decision, intervention" },
  { icon: Zap, title: "Action layer", subtitle: "Browser, timer, notifications" },
  { icon: Database, title: "Event / data store", subtitle: "Everything the model learns from" },
];

export function Architecture() {
  return (
    <section className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="Architecture"
          title="Small surface area, real feedback loop."
          description="Six layers, one direction of data flow, and a store that turns every session into training signal for the next one."
          align="center"
        />

        <div className="mx-auto mt-14 flex max-w-md flex-col items-center gap-2">
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="w-full"
              >
                <div className="flex w-full items-center gap-4 rounded-xl border border-border bg-surface p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-medium leading-tight">{layer.title}</p>
                    <p className="text-xs leading-tight text-muted">{layer.subtitle}</p>
                  </div>
                </div>
                {i < layers.length - 1 && (
                  <div className="flex justify-center py-1.5">
                    <ArrowDown size={16} className="text-muted-2" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

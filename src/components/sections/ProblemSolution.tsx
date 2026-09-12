"use client";

import { ArrowDown, Check, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const oldFlow = ["Goal", "Application", "Advice / statistics", "User", "Action (maybe)"];
const newFlow = ["Goal", "Context understanding", "Agent", "Action in the environment", "Observed result", "Learning"];

function FlowColumn({
  title,
  steps,
  tone,
}: {
  title: string;
  steps: string[];
  tone: "muted" | "accent";
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="mb-2 text-sm font-medium text-muted">{title}</p>
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center gap-2">
          <div
            className={`rounded-xl border px-5 py-3 text-center text-sm font-medium ${
              tone === "accent"
                ? "border-accent/40 bg-accent-soft text-foreground"
                : "border-border bg-surface text-muted"
            }`}
          >
            {step}
          </div>
          {i < steps.length - 1 && <ArrowDown size={16} className="text-muted-2" />}
        </div>
      ))}
    </div>
  );
}

export function ProblemSolution() {
  return (
    <section className="border-t border-border py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="The problem"
          title="Every productivity app still assumes you have the discipline it's meant to give you."
          description="Set goals, build tasks, track behavior, read the dashboard, decide what to do next — the tool only helps if you're already disciplined enough to use it correctly. Momentum inverts that: it understands the context you're working in and acts inside it."
        />

        <div className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-6">
          <Reveal>
            <FlowColumn title="Traditional approach" steps={oldFlow} tone="muted" />
          </Reveal>
          <Reveal delay={0.1}>
            <FlowColumn title="Momentum" steps={newFlow} tone="accent" />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
              <X size={18} className="mt-0.5 shrink-0 text-danger" />
              <p className="text-sm text-muted">
                <span className="text-foreground">&ldquo;You should focus more.&rdquo;</span> — generic advice with no
                awareness of what you&apos;re actually doing right now.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent-soft p-4">
              <Check size={18} className="mt-0.5 shrink-0 text-accent-2" />
              <p className="text-sm text-foreground">
                &ldquo;You planned to finish auth today. You&apos;ve been on YouTube for 8 minutes.&rdquo; — then it
                offers to act.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

"use client";

import { Check, ShieldAlert, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const pending = ["Close YouTube", "Return to GitHub", "Continue focus session"];

export function HumanInLoop() {
  return (
    <section className="border-t border-border py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Human-in-the-loop"
              title="Momentum should never feel like it's controlling you."
              description="Sensitive actions always require your explicit approval. Every capability the agent has can be scoped, reviewed, and revoked — permissions are a first-class part of the product, not an afterthought."
            />
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-2">
              <ShieldAlert size={16} className="text-warning" /> No action runs silently in the background.
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="glow rounded-2xl border border-border bg-surface p-6">
              <p className="text-sm font-medium">Momentum wants to:</p>
              <ul className="mt-4 space-y-2">
                {pending.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-foreground">
                    <Check size={15} className="text-accent-2" /> {p}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 rounded-full bg-foreground py-2 text-sm font-medium text-background">
                  Approve
                </button>
                <button className="flex flex-1 items-center justify-center gap-1 rounded-full border border-border-strong py-2 text-sm font-medium text-muted">
                  <X size={14} /> Cancel
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

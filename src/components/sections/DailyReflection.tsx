"use client";

import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function DailyReflection() {
  return (
    <section className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="Daily reflection"
          title="Tracking data becomes behavioral intelligence."
          description="At the end of the day, Momentum turns raw session data into an actual observation and a recommendation — the beginning of a real behavior model, not just a report."
        />

        <Reveal className="mt-14">
          <div className="glow mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles size={16} className="text-accent" /> Today
            </div>
            <div className="mt-5 space-y-4 text-sm leading-relaxed">
              <p className="text-muted">
                You planned <span className="text-foreground">3 hours</span> of focused work. You completed{" "}
                <span className="text-foreground">2h17</span>.
              </p>
              <p className="text-muted">
                Your strongest session: <span className="text-accent-2">10:00–11:30</span>
              </p>
              <p className="text-muted">
                Your biggest distraction: <span className="text-warning">YouTube</span>
              </p>
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <p className="text-xs uppercase tracking-wide text-muted">Observation</p>
                <p className="mt-1 text-foreground">Your focus decreased significantly after 16:00.</p>
              </div>
              <div className="rounded-xl border border-accent/30 bg-accent-soft p-4">
                <p className="text-xs uppercase tracking-wide text-muted">Recommendation</p>
                <p className="mt-1 text-foreground">Schedule difficult tasks before 15:00 tomorrow.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

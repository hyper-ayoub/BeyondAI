"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const events = [
  "USER_STARTED_SESSION",
  "USER_OPENED_SITE",
  "USER_CHANGED_TAB",
  "USER_IDLE",
  "USER_RETURNED",
  "SESSION_ENDED",
];

const contextJson = `{
  "goal": "Build MVP",
  "session_duration": 90,
  "elapsed": 32,
  "current_domain": "youtube.com",
  "productive": false,
  "distraction_duration": 420,
  "last_productive_activity": 180
}`;

export function ContextEngine() {
  return (
    <section className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="Context engine"
          title="Raw events in. A reasoning-ready state out."
          description="The agent never sees a firehose of tab-switch events — it sees a compact, structured snapshot of what's actually happening."
        />

        <div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_auto_1.2fr]">
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">Raw events</p>
              <div className="space-y-2 font-mono text-xs">
                {events.map((e) => (
                  <div key={e} className="rounded-lg border border-border bg-background/40 px-3 py-2 text-muted">
                    {e}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex justify-center">
            <ArrowRight size={28} className="rotate-90 text-accent lg:rotate-0" />
          </Reveal>

          <Reveal delay={0.2}>
            <div className="overflow-hidden rounded-2xl border border-accent/30 bg-surface">
              <div className="border-b border-border bg-surface-2 px-4 py-2 text-xs font-medium text-muted">
                context.json
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-accent-2">
                {contextJson}
              </pre>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

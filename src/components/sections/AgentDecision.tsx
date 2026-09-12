"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function AgentDecision() {
  return (
    <section className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="Decision engine"
          title="The agent decides whether to speak at all."
          description="Most of the time, the right move is silence. An intervention only fires when the rule actually matches — and the message is generated from the live context, not a template."
        />

        <Reveal className="mt-14">
          <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-5 sm:p-7">
            <p className="font-hand mb-2 -rotate-1 text-lg text-accent">the whole pipeline, in one breath →</p>
            <svg viewBox="0 0 900 150" className="h-auto w-full">
              <defs>
                <marker id="pipe-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 Z" className="fill-muted-2" />
                </marker>
              </defs>

              <g transform="rotate(-1.5 95 75)">
                <rect x="15" y="45" width="160" height="60" rx="10" className="fill-surface-2 stroke-accent-2" strokeWidth="1.5" strokeDasharray="5 4" />
                <text x="95" y="70" textAnchor="middle" className="fill-foreground font-mono text-[12px] font-semibold">CONTEXT.JSON</text>
                <text x="95" y="88" textAnchor="middle" className="font-hand fill-muted text-[13px]">what&apos;s happening now</text>
              </g>
              <path d="M175,75 Q205,75 225,75" fill="none" className="stroke-muted-2" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#pipe-arrow)" />

              <g transform="rotate(1 320 75)">
                <rect x="230" y="35" width="180" height="80" rx="12" className="fill-surface-2 stroke-foreground" strokeWidth="1.5" strokeDasharray="7 3" />
                <text x="320" y="65" textAnchor="middle" className="fill-accent text-[18px]">✦</text>
                <text x="320" y="85" textAnchor="middle" className="fill-foreground font-mono text-[12px] font-semibold">LLM REASONING</text>
                <text x="320" y="102" textAnchor="middle" className="font-hand fill-muted-2 text-[12px]">context + rule + goal</text>
              </g>
              <path d="M410,75 Q440,75 460,75" fill="none" className="stroke-muted-2" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#pipe-arrow)" />

              <g transform="rotate(-1 535 75)">
                <rect x="465" y="45" width="140" height="60" rx="10" className="fill-surface-2 stroke-warning" strokeWidth="1.5" />
                <text x="535" y="70" textAnchor="middle" className="fill-foreground font-mono text-[12px] font-semibold">DECISION</text>
                <text x="535" y="88" textAnchor="middle" className="font-hand fill-muted text-[13px]">speak? act? stay quiet?</text>
              </g>
              <path d="M605,75 Q635,75 655,75" fill="none" className="stroke-accent" strokeWidth="1.5" markerEnd="url(#pipe-arrow)" />

              <g transform="rotate(1.5 775 75)">
                <rect x="660" y="45" width="220" height="60" rx="10" className="fill-surface-2 stroke-accent" strokeWidth="1.5" />
                <text x="775" y="70" textAnchor="middle" className="fill-foreground font-mono text-[12px] font-semibold">MESSAGE OR ACTION</text>
                <text x="775" y="88" textAnchor="middle" className="font-hand fill-muted text-[13px]">one specific line, not a template</text>
              </g>
            </svg>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-surface p-6">
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted">Trigger rule</p>
              <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-foreground">
{`IF
  focus_session = active
  AND current_domain = distraction
  AND distraction_duration > threshold

THEN
  generate intervention`}
              </pre>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-accent/30 bg-accent-soft p-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">Generated intervention</p>
              <p className="text-lg leading-relaxed text-foreground">
                &ldquo;You planned to finish the authentication module today. You&apos;ve been on YouTube for 8
                minutes. Want to head back?&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

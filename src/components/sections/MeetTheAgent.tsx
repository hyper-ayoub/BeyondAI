"use client";

import { motion } from "framer-motion";
import { Eye, MessageSquareOff, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const traits = [
  {
    icon: Eye,
    title: "Reads context, not conversation.",
    copy: "It never waits for you to type — it watches your goal and your environment.",
  },
  {
    icon: MessageSquareOff,
    title: "Silence is the default.",
    copy: "Most sessions get zero messages. It only speaks when a rule actually fires.",
  },
  {
    icon: ShieldCheck,
    title: "Never acts without you.",
    copy: "Every intervention ends in a choice you make, never a command it runs alone.",
  },
];

export function MeetTheAgent() {
  return (
    <section id="agent" className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="The agent"
          title="Meet the agent — not a chatbot."
          description="No chat window, no prompt box. Under the hood it's a small, boring loop: look at what's happening, decide if it's worth saying anything, and — rarely — ask to act."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:items-center">
          <Reveal>
            <div className="space-y-6">
              {traits.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{t.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{t.copy}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-5 sm:p-7">
              <p className="font-hand mb-1 -rotate-1 text-lg text-accent">how the agent actually thinks →</p>
              <motion.svg
                viewBox="0 0 600 320"
                className="h-auto w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <defs>
                  <marker id="agent-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M0,0 L10,5 L0,10 Z" className="fill-muted-2" />
                  </marker>
                </defs>

                {/* Goal box */}
                <g transform="rotate(-2 96 52)">
                  <rect x="16" y="24" width="160" height="56" rx="10" className="fill-surface-2 stroke-accent" strokeWidth="1.5" strokeDasharray="5 4" />
                  <text x="96" y="48" textAnchor="middle" className="fill-foreground font-mono text-[13px] font-semibold">GOAL</text>
                  <text x="96" y="65" textAnchor="middle" className="font-hand fill-muted text-[13px]">&ldquo;finish auth today&rdquo;</text>
                </g>

                {/* Context box */}
                <g transform="rotate(1.5 96 158)">
                  <rect x="16" y="130" width="160" height="56" rx="10" className="fill-surface-2 stroke-accent-2" strokeWidth="1.5" strokeDasharray="5 4" />
                  <text x="96" y="154" textAnchor="middle" className="fill-foreground font-mono text-[13px] font-semibold">CONTEXT</text>
                  <text x="96" y="171" textAnchor="middle" className="font-hand fill-muted text-[13px]">tab · idle · elapsed</text>
                </g>

                {/* Connectors into the agent */}
                <path d="M176,52 Q216,58 238,88" fill="none" className="stroke-muted-2" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#agent-arrow)" />
                <path d="M176,158 Q216,148 238,122" fill="none" className="stroke-muted-2" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#agent-arrow)" />

                {/* Agent node */}
                <g>
                  <circle cx="300" cy="106" r="64" className="fill-surface stroke-foreground" strokeWidth="1.5" strokeDasharray="7 3" />
                  <text x="300" y="94" textAnchor="middle" className="fill-accent text-[20px]">✦</text>
                  <text x="300" y="116" textAnchor="middle" className="fill-foreground font-mono text-[13px] font-semibold">AGENT</text>
                  <text x="300" y="133" textAnchor="middle" className="font-hand fill-muted-2 text-[12px]">decide, then maybe act</text>
                </g>

                {/* Outcome 1 — silent */}
                <path d="M362,88 Q398,50 428,36" fill="none" className="stroke-muted-2" strokeWidth="1.5" strokeDasharray="3 5" markerEnd="url(#agent-arrow)" />
                <g transform="rotate(-1 506 35)">
                  <rect x="428" y="8" width="156" height="56" rx="10" className="fill-surface-2 stroke-border-strong" strokeWidth="1.5" strokeDasharray="2 3" />
                  <text x="506" y="30" textAnchor="middle" className="fill-foreground font-mono text-[12px] font-semibold">STAYS SILENT</text>
                  <text x="506" y="47" textAnchor="middle" className="font-hand fill-muted text-[13px]">~70% of sessions</text>
                </g>

                {/* Outcome 2 — one message */}
                <path d="M364,110 Q398,120 428,127" fill="none" className="stroke-accent-2" strokeWidth="1.5" markerEnd="url(#agent-arrow)" />
                <g transform="rotate(1 506 129)">
                  <rect x="428" y="101" width="156" height="56" rx="10" className="fill-surface-2 stroke-accent-2" strokeWidth="1.5" />
                  <text x="506" y="123" textAnchor="middle" className="fill-foreground font-mono text-[12px] font-semibold">SENDS ONE MESSAGE</text>
                  <text x="506" y="140" textAnchor="middle" className="font-hand fill-muted text-[13px]">a specific, not generic, nudge</text>
                </g>

                {/* Outcome 3 — acts with approval */}
                <path d="M358,132 Q396,180 428,216" fill="none" className="stroke-warning" strokeWidth="1.5" markerEnd="url(#agent-arrow)" />
                <g transform="rotate(-1.5 506 223)">
                  <rect x="428" y="195" width="156" height="56" rx="10" className="fill-surface-2 stroke-warning" strokeWidth="1.5" />
                  <text x="506" y="217" textAnchor="middle" className="fill-foreground font-mono text-[12px] font-semibold">ACTS, WITH APPROVAL</text>
                  <text x="506" y="234" textAnchor="middle" className="font-hand fill-muted text-[13px]">you always confirm first</text>
                </g>
              </motion.svg>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const hourly = [
  { hour: "9", value: 30 },
  { hour: "10", value: 78 },
  { hour: "11", value: 92 },
  { hour: "12", value: 55 },
  { hour: "13", value: 20 },
  { hour: "14", value: 40 },
  { hour: "15", value: 62 },
  { hour: "16", value: 35 },
  { hour: "17", value: 18 },
];

const metrics = [
  { label: "Planned", value: "90 min" },
  { label: "Productive", value: "71 min", tone: "text-accent-2" },
  { label: "Distraction", value: "12 min", tone: "text-warning" },
  { label: "Idle", value: "7 min" },
];

export function Analytics() {
  return (
    <section id="analytics" className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="Session analytics"
          title="Every session ends with a real answer, not a streak counter."
          description="Planned vs. actual, where the time actually went, and when you were at your best today."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted">Today&apos;s session</p>
                <p className="font-mono text-2xl font-semibold text-accent-2">79%</p>
              </div>
              <div className="mt-6 grid grid-cols-4 gap-3">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-xs text-muted">{m.label}</p>
                    <p className={`mt-1 font-mono text-lg font-semibold ${m.tone ?? "text-foreground"}`}>
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex h-32 items-end gap-2">
                {hourly.map((h, i) => (
                  <div key={h.hour} className="flex flex-1 flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h.value}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-full rounded-t-sm ${
                        h.value >= 75 ? "bg-accent-2" : "bg-white/10"
                      }`}
                    />
                    <span className="font-mono text-[10px] text-muted-2">{h.hour}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-2">Most productive period: 09:15–10:05 &amp; 11:00–11:45</p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <p className="text-xs text-muted">Main distraction</p>
                <p className="mt-1 text-lg font-semibold">YouTube</p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-5">
                <p className="text-xs text-muted">Interruptions</p>
                <p className="mt-1 text-lg font-semibold">3</p>
              </div>
              <div className="flex-1 rounded-2xl border border-accent/30 bg-accent-soft p-5">
                <p className="text-xs text-muted">Task progress</p>
                <p className="mt-1 text-lg font-semibold">Authentication → 70%</p>
                <p className="mt-3 text-sm text-muted">
                  Next recommended action: finish the OAuth callback tomorrow morning.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, GraduationCap, ShieldAlert, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";

const stats = [
  { value: "75%", label: "of employees leave without ever getting a single promotion", source: "ADP Research Institute" },
  { value: "$35M/yr", label: "spent on review cycles at a 10,000-person company", source: "CEB / Washington Post" },
  { value: "14% → 77%", label: "feel inspired to improve after an annual review vs. after continuous feedback", source: "CEB, SHRM" },
  { value: "69%", label: "of companies use no AI at all in their evaluation process", source: "industry survey" },
];

const pillars = [
  {
    icon: TrendingUp,
    title: "Activity optimization",
    copy: "The agent reads real workload, task complexity, and project contribution — not a status update someone typed at 5pm.",
  },
  {
    icon: GraduationCap,
    title: "Talent management",
    copy: "That activity data feeds reviews, targets training at real skill gaps, and surfaces internal mobility before someone quits to get it elsewhere.",
  },
];

const impact = [
  { issue: "Talent detection", before: "One manager's yearly judgment call", after: "Continuous, objective tracking" },
  { issue: "Training", before: "Generic, based on stated wishes", after: "Targeted, based on real activity" },
  { issue: "Internal mobility", before: "Barely visible, decisions come late", after: "Detected proactively, before someone leaves" },
  { issue: "Avoidable turnover cost", before: "Lost talent that was never promoted (75% of exits)", after: "Reduced through real visibility" },
];

export function EnterpriseHR() {
  return (
    <section id="hr" className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="Beyond personal focus"
          title="The same loop works inside a company, not just for one person."
          description="Momentum's core mechanic — watch real activity instead of trusting what people self-report — happens to solve one of HR's oldest problems: nobody has real visibility, so promotion, training, and mobility decisions ride on one manager's judgment, once a year."
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <motion.div key={s.label} variants={revealItem} className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-mono text-2xl font-semibold text-accent-2">{s.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.label}</p>
              <p className="mt-3 text-xs text-muted-2">{s.source}</p>
            </motion.div>
          ))}
        </RevealGroup>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-accent/30 bg-accent-soft p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/40 text-accent">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-4 font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.copy}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-8">
          <div className="rounded-2xl border border-warning/30 bg-warning-soft p-6">
            <div className="flex items-start gap-3">
              <ShieldAlert size={18} className="mt-0.5 shrink-0 text-warning" />
              <div>
                <p className="font-medium text-foreground">The whole thing lives or dies on trust.</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  42% of monitored employees are job-hunting within a year, vs. 23% of those who aren&apos;t. But 90%
                  accept the exact same data collection when it&apos;s tied to a concrete career benefit. Same
                  principle as the personal product: transparency and a real benefit for the person being observed
                  come first — never bolted on afterward as a compliance checkbox.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                  <th className="px-5 py-3 font-medium">Issue</th>
                  <th className="px-5 py-3 font-medium">Today</th>
                  <th className="px-5 py-3 font-medium">With the agent</th>
                </tr>
              </thead>
              <tbody>
                {impact.map((row) => (
                  <tr key={row.issue} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 font-medium text-foreground">{row.issue}</td>
                    <td className="px-5 py-4 text-muted">{row.before}</td>
                    <td className="px-5 py-4 text-accent-2">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-6 flex items-start gap-2 text-xs text-muted-2">
          <ArrowLeftRight size={14} className="mt-0.5 shrink-0" />
          Internal mobility also costs 18–20% less than external hiring, and reaches full performance 2–3 years
          faster — the same visibility gap Momentum closes for one person closes it for an entire org.
        </Reveal>
      </Container>
    </section>
  );
}

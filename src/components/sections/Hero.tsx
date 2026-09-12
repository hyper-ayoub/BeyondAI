"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, GitBranch, PlayCircle } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Eyebrow } from "@/components/ui/Eyebrow";

const words = "From intention to behavior.".split(" ");

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="top" ref={sectionRef} className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      <motion.div
        style={{ y: gridY }}
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]"
      />
      <motion.div
        style={{ y: blobY }}
        className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
      />

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Eyebrow>Personal behavior intelligence</Eyebrow>
          </motion.div>

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`inline-block ${word === "behavior." ? "text-gradient" : ""}`}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 max-w-2xl text-lg text-muted leading-relaxed"
          >
            Momentum is a contextual agent, not a chatbot. It turns a goal like
            <span className="text-foreground"> &ldquo;work on my project for 90 minutes&rdquo;</span> into a
            structured focus session — then watches your real working context, catches drift the moment it
            happens, and intervenes before the moment is lost.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}>
              <PlayCircle size={16} /> Start a focus session <ArrowRight size={14} />
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>
              <GitBranch size={16} /> See how it works
            </MagneticButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-5 text-xs text-muted-2"
          >
            No install for this preview — the live demo below simulates a real session end-to-end.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ y: -6 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="glow overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent-2/70" />
              </div>
              <span className="mx-auto font-mono text-xs text-muted-2">momentum.app / focus session</span>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <p className="text-xs text-muted">Focus session</p>
                <p className="mt-2 font-mono text-3xl font-semibold">42:18</p>
                <p className="mt-1 text-xs text-muted-2">remaining · 90 min planned</p>
              </div>
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <p className="text-xs text-muted">Goal progress</p>
                <p className="mt-2 font-mono text-3xl font-semibold text-accent-2">68%</p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "68%" }}
                    transition={{ delay: 1.1, duration: 1 }}
                    className="h-full rounded-full bg-accent-2"
                  />
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <p className="text-xs text-muted">Current context</p>
                <p className="mt-2 text-lg font-semibold">github.com</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-accent-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-2" /> Focused
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

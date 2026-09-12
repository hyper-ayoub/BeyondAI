"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Camera,
  Coffee,
  FileText,
  Film,
  GitBranch,
  LogOut,
  RotateCcw,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { MagneticButton } from "@/components/ui/MagneticButton";

const TOTAL_DEMO_MS = 34000;
const TICK_MS = 200;
const DISTRACTION_THRESHOLD_MS = 2600;

type Phase = "setup" | "running" | "break" | "summary";
type TabId = "github" | "docs" | "youtube" | "instagram";

const goals = [
  { id: "mvp", label: "Build my MVP", icon: Rocket },
  { id: "auth", label: "Finish the auth module", icon: ShieldCheck },
  { id: "learn", label: "Learn AI agents", icon: BookOpen },
];

const durations = [25, 50, 90];

const tabs: { id: TabId; label: string; icon: typeof GitBranch; productive: boolean }[] = [
  { id: "github", label: "github.com", icon: GitBranch, productive: true },
  { id: "docs", label: "docs.google.com", icon: FileText, productive: true },
  { id: "youtube", label: "youtube.com", icon: Film, productive: false },
  { id: "instagram", label: "instagram.com", icon: Camera, productive: false },
];

function formatClock(totalSeconds: number) {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export function FocusSessionDemo() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [goalId, setGoalId] = useState(goals[0].id);
  const [durationMin, setDurationMin] = useState(90);
  const [activeTab, setActiveTab] = useState<TabId>("github");
  const [showIntervention, setShowIntervention] = useState(false);

  const [elapsedMs, setElapsedMs] = useState(0);
  const [focusedMs, setFocusedMs] = useState(0);
  const [distractionStreakMs, setDistractionStreakMs] = useState(0);
  const [usedBreak, setUsedBreak] = useState(false);
  const [ignoredIntervention, setIgnoredIntervention] = useState(false);

  const [summary, setSummary] = useState({
    focusedMin: 0,
    distractionMin: 0,
    idleMin: 0,
    score: 0,
    progressBefore: 40,
    progressAfter: 40,
  });

  // Mutable bookkeeping for the running tick loop. Kept out of state so the
  // interval callback always reads/writes the latest values synchronously,
  // without depending on React's batched state updates.
  const stats = useRef({ elapsedMs: 0, focusedMs: 0, distractionMs: 0, breakEndsAt: 0 });

  const goal = goals.find((g) => g.id === goalId)!;
  const progressBefore = 40;
  const liveProgress = Math.min(97, progressBefore + Math.round((focusedMs / TOTAL_DEMO_MS) * 70));

  const finishSession = (finalElapsedMs: number, finalFocusedMs: number, finalDistractionMs: number) => {
    const actualElapsedMin = (finalElapsedMs / TOTAL_DEMO_MS) * durationMin || 0.01;
    const focusedMin = Math.round((finalFocusedMs / Math.max(finalElapsedMs, 1)) * actualElapsedMin);
    const distractionMin = Math.round((finalDistractionMs / Math.max(finalElapsedMs, 1)) * actualElapsedMin);
    const idleMin = Math.max(0, Math.round(actualElapsedMin - focusedMin - distractionMin));
    const score = Math.min(100, Math.round((focusedMin / Math.max(actualElapsedMin, 0.01)) * 100));
    const progressAfter = Math.min(97, progressBefore + Math.round((finalFocusedMs / TOTAL_DEMO_MS) * 70));

    setSummary({
      focusedMin: Math.max(focusedMin, 0),
      distractionMin: Math.max(distractionMin, 0),
      idleMin,
      score,
      progressBefore,
      progressAfter,
    });
    setPhase("summary");
  };

  useEffect(() => {
    if (phase !== "running" && phase !== "break") return;

    const id = setInterval(() => {
      const s = stats.current;
      s.elapsedMs += TICK_MS;

      if (phase === "break") {
        if (s.elapsedMs >= s.breakEndsAt) {
          setPhase("running");
          setActiveTab("github");
          setDistractionStreakMs(0);
        }
      } else {
        const productive = tabs.find((t) => t.id === activeTab)?.productive;
        if (productive) {
          s.focusedMs += TICK_MS;
          setDistractionStreakMs(0);
        } else {
          s.distractionMs += TICK_MS;
          setDistractionStreakMs((v) => {
            const next = v + TICK_MS;
            if (next >= DISTRACTION_THRESHOLD_MS) setShowIntervention(true);
            return next;
          });
        }
      }

      setElapsedMs(s.elapsedMs);
      setFocusedMs(s.focusedMs);

      if (s.elapsedMs >= TOTAL_DEMO_MS) {
        clearInterval(id);
        finishSession(s.elapsedMs, s.focusedMs, s.distractionMs);
      }
    }, TICK_MS);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, activeTab]);

  const start = () => {
    stats.current = { elapsedMs: 0, focusedMs: 0, distractionMs: 0, breakEndsAt: 0 };
    setPhase("running");
    setActiveTab("github");
    setElapsedMs(0);
    setFocusedMs(0);
    setDistractionStreakMs(0);
    setShowIntervention(false);
    setUsedBreak(false);
    setIgnoredIntervention(false);
  };

  const reset = () => setPhase("setup");

  const endEarly = () => finishSession(stats.current.elapsedMs, stats.current.focusedMs, stats.current.distractionMs);

  const returnToWork = () => {
    setActiveTab("github");
    setShowIntervention(false);
    setDistractionStreakMs(0);
  };

  const takeBreak = () => {
    setUsedBreak(true);
    setShowIntervention(false);
    stats.current.breakEndsAt = stats.current.elapsedMs + 4200;
    setPhase("break");
  };

  const selectTab = (id: TabId) => {
    if (phase !== "running") return;
    setActiveTab(id);
    const productive = tabs.find((t) => t.id === id)?.productive;
    if (productive) {
      setShowIntervention(false);
      setDistractionStreakMs(0);
    } else {
      setIgnoredIntervention(false);
    }
  };

  const awayMinutes = Math.max(1, Math.round((distractionStreakMs / TOTAL_DEMO_MS) * durationMin));
  const remainingSeconds = Math.max(0, ((TOTAL_DEMO_MS - elapsedMs) / TOTAL_DEMO_MS) * durationMin * 60);
  const activeTabMeta = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="demo" className="border-t border-border py-24">
      <Container>
        <SectionHeading
          eyebrow="Live demo — simulated"
          title="Run a focus session, right here."
          description="This widget compresses a full session into about 30 seconds. Pick a goal, start the session, then switch into YouTube or Instagram to see Momentum notice and intervene."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="glow overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent-2/70" />
              </div>
              <span className="font-mono text-xs text-muted-2">
                {phase === "setup" && "new focus session"}
                {phase === "running" && `session running · ${formatClock(remainingSeconds)} left`}
                {phase === "break" && "on a short break"}
                {phase === "summary" && "session complete"}
              </span>
              {phase !== "setup" && phase !== "summary" ? (
                <button
                  onClick={endEarly}
                  className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-foreground"
                >
                  <LogOut size={12} /> End session
                </button>
              ) : (
                <span className="w-16" />
              )}
            </div>

            <div className="p-5 sm:p-6">
              <AnimatePresence mode="wait">
                {phase === "setup" && (
                  <motion.div
                    key="setup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">Goal</p>
                      <div className="flex flex-wrap gap-2">
                        {goals.map((g) => {
                          const Icon = g.icon;
                          const selected = g.id === goalId;
                          return (
                            <button
                              key={g.id}
                              onClick={() => setGoalId(g.id)}
                              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                                selected
                                  ? "border-accent/50 bg-accent-soft text-foreground"
                                  : "border-border text-muted hover:border-border-strong"
                              }`}
                            >
                              <Icon size={14} /> {g.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">Duration</p>
                      <div className="flex flex-wrap gap-2">
                        {durations.map((d) => (
                          <button
                            key={d}
                            onClick={() => setDurationMin(d)}
                            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                              d === durationMin
                                ? "border-accent/50 bg-accent-soft text-foreground"
                                : "border-border text-muted hover:border-border-strong"
                            }`}
                          >
                            {d} min
                          </button>
                        ))}
                      </div>
                    </div>
                    <MagneticButton onClick={start} className="w-full sm:w-auto">
                      <Rocket size={16} /> Start focus session
                    </MagneticButton>
                  </motion.div>
                )}

                {(phase === "running" || phase === "break") && (
                  <motion.div
                    key="running"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="flex flex-wrap gap-2 border-b border-border pb-4">
                      {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const selected = tab.id === activeTab;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => selectTab(tab.id)}
                            disabled={phase === "break"}
                            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors disabled:opacity-40 ${
                              selected
                                ? tab.productive
                                  ? "border-accent-2/40 bg-accent-2/10 text-foreground"
                                  : "border-warning/40 bg-warning-soft text-foreground"
                                : "border-border text-muted hover:border-border-strong"
                            }`}
                          >
                            <Icon size={13} /> {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-[1.1fr_1fr]">
                      <div className="rounded-xl border border-border bg-background/40 p-5">
                        {phase === "break" ? (
                          <div className="flex h-full flex-col items-center justify-center gap-2 py-6 text-center">
                            <Coffee size={22} className="text-warning" />
                            <p className="text-sm font-medium">On a short break</p>
                            <p className="text-xs text-muted">Resuming automatically in a few seconds…</p>
                          </div>
                        ) : (
                          <div className="flex h-full flex-col justify-center gap-3 py-4">
                            <p className="text-xs text-muted">Goal</p>
                            <p className="text-lg font-semibold">{goal.label}</p>
                            <p className="mt-2 text-xs text-muted">Current context</p>
                            <p className="font-mono text-sm">{activeTabMeta.label}</p>
                            <span
                              className={`mt-1 inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-xs ${
                                activeTabMeta.productive ? "text-accent-2" : "text-warning"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  activeTabMeta.productive ? "bg-accent-2" : "bg-warning"
                                }`}
                              />
                              {activeTabMeta.productive ? "Focused" : "Distraction detected"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="rounded-xl border border-border bg-background/40 p-5">
                        <p className="text-xs text-muted">Goal progress</p>
                        <p className="mt-1 font-mono text-2xl font-semibold text-accent-2">{liveProgress}%</p>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            className="h-full rounded-full bg-accent-2"
                            animate={{ width: `${liveProgress}%` }}
                            transition={{ ease: "linear", duration: 0.2 }}
                          />
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="text-muted">Session</p>
                            <p className="font-mono text-foreground">{durationMin} min</p>
                          </div>
                          <div>
                            <p className="text-muted">Time left</p>
                            <p className="font-mono text-foreground">{formatClock(remainingSeconds)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {showIntervention && (
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="rounded-xl border border-warning/40 bg-warning-soft p-4"
                        >
                          <p className="text-sm text-foreground">
                            You&apos;re in a focus session for <span className="font-medium">{goal.label}</span>.
                            You&apos;ve been on{" "}
                            <span className="font-medium">{activeTabMeta.label}</span> for about {awayMinutes} min.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              onClick={returnToWork}
                              className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background"
                            >
                              Return to work
                            </button>
                            <button
                              onClick={takeBreak}
                              className="rounded-full border border-border-strong px-4 py-1.5 text-xs font-medium text-foreground"
                            >
                              Take 5 min
                            </button>
                            <button
                              onClick={() => {
                                setShowIntervention(false);
                                setIgnoredIntervention(true);
                              }}
                              className="px-4 py-1.5 text-xs text-muted hover:text-foreground"
                            >
                              Dismiss
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {phase === "summary" && (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        { label: "Planned", value: `${durationMin} min` },
                        { label: "Focused", value: `${summary.focusedMin} min`, tone: "text-accent-2" },
                        { label: "Distraction", value: `${summary.distractionMin} min`, tone: "text-warning" },
                        { label: "Idle", value: `${summary.idleMin} min` },
                      ].map((m) => (
                        <div key={m.label} className="rounded-xl border border-border bg-background/40 p-4">
                          <p className="text-xs text-muted">{m.label}</p>
                          <p className={`mt-1 font-mono text-xl font-semibold ${m.tone ?? "text-foreground"}`}>
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-border bg-background/40 p-5">
                        <p className="text-xs text-muted">Productivity score</p>
                        <p className="mt-1 font-mono text-4xl font-semibold text-accent-2">{summary.score}%</p>
                      </div>
                      <div className="rounded-xl border border-border bg-background/40 p-5">
                        <p className="text-xs text-muted">Goal progress</p>
                        <p className="mt-1 font-mono text-xl font-semibold">
                          {summary.progressBefore}% <span className="text-muted-2">→</span> {summary.progressAfter}%
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-accent/30 bg-accent-soft p-4 text-sm text-foreground">
                      <span className="font-medium">Momentum learned: </span>
                      {summary.distractionMin === 0
                        ? "you stayed fully focused this session — this goal is a good fit for long, uninterrupted blocks."
                        : usedBreak
                        ? "you recover quickly when offered a short, concrete break instead of a plain reminder."
                        : ignoredIntervention
                        ? "a single prompt wasn't enough this time — next session, Momentum will suggest closing the distraction directly."
                        : "you respond well to being told exactly how long you've drifted, not just that you have."}
                    </div>

                    <MagneticButton onClick={reset} variant="ghost">
                      <RotateCcw size={14} /> Run another session
                    </MagneticButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

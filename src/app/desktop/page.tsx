import { AppWindow, Eye, MonitorCheck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/CTAFooter";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

export const metadata: Metadata = {
  title: "Momentum Desktop — early access",
  description: "The Momentum desktop app brings system-level context — active window, idle time — into your focus sessions.",
};

const features = [
  { icon: MonitorCheck, title: "Active window detection", copy: "Knows whether you're in your editor, docs, or somewhere else — no browser tab required." },
  { icon: Eye, title: "Idle detection", copy: "Notices real inactivity, not just tab switches, and folds it into your session analytics." },
  { icon: ShieldCheck, title: "Local-first", copy: "Raw activity stays on your machine — only the summarized context is sent to the agent." },
];

export default function DesktopPage() {
  return (
    <>
      <Nav />
      <main className="pt-20 pb-24">
        <Container className="flex flex-col items-center text-center">
          <Eyebrow>Desktop app · early access</Eyebrow>
          <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
            <AppWindow size={26} />
          </span>
          <h1 className="mt-6 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Momentum, running quietly on your machine.
          </h1>
          <p className="mt-4 max-w-lg text-muted">
            The desktop app is what turns Momentum from a browser demo into a real agent — it sees the window you&apos;re
            actually working in and feeds that straight into the same focus sessions you tried on the homepage.
          </p>
          <div className="mt-4 flex gap-2 text-xs text-muted-2">
            <span className="rounded-full border border-border px-3 py-1">macOS</span>
            <span className="rounded-full border border-border px-3 py-1">Windows</span>
          </div>

          <div className="mt-8 w-full">
            <WaitlistForm platform="the desktop app" />
          </div>

          <div className="mt-16 grid w-full gap-5 text-left sm:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded-2xl border border-border bg-surface p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={16} />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{f.copy}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

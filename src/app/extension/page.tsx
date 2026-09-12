import { Ban, Puzzle, TabletSmartphone, Zap } from "lucide-react";
import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/CTAFooter";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

export const metadata: Metadata = {
  title: "Momentum Extension — early access",
  description: "The Momentum browser extension detects tab and domain changes and powers real-time distraction detection.",
};

const features = [
  { icon: TabletSmartphone, title: "Real-time tab context", copy: "Sees the current domain the moment you switch — exactly what the live demo simulates." },
  { icon: Zap, title: "Instant interventions", copy: "Distraction thresholds fire in-browser, so the prompt shows up right where the drift happened." },
  { icon: Ban, title: "Customizable domains", copy: "You define what counts as productive vs. distraction — the extension just enforces it." },
];

export default function ExtensionPage() {
  return (
    <>
      <Nav />
      <main className="pt-20 pb-24">
        <Container className="flex flex-col items-center text-center">
          <Eyebrow>Browser extension · early access</Eyebrow>
          <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
            <Puzzle size={26} />
          </span>
          <h1 className="mt-6 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            The signal behind every intervention.
          </h1>
          <p className="mt-4 max-w-lg text-muted">
            The extension is what actually watches your tabs and domains in real use — it&apos;s the real-world version
            of the browser chrome you clicked through in the live demo.
          </p>
          <div className="mt-4 flex gap-2 text-xs text-muted-2">
            <span className="rounded-full border border-border px-3 py-1">Chrome</span>
            <span className="rounded-full border border-border px-3 py-1">Edge</span>
            <span className="rounded-full border border-border px-3 py-1">Brave</span>
          </div>

          <div className="mt-8 w-full">
            <WaitlistForm platform="the extension" />
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

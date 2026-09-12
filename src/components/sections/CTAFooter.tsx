"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-border py-28 text-center">
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[120px]" />
      <Container className="relative">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Stop measuring intentions.
            <br />
            Start acting on them.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Momentum from intention to behavior — one focus session at a time.
          </p>
          <div className="mt-8">
            <MagneticButton onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}>
              Try the live demo <ArrowRight size={14} />
            </MagneticButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Link href="/#top" className="flex items-center gap-2 text-sm font-semibold">
          <Image src="/logo-mark.png" alt="Momentum" width={30} height={27} className="h-6 w-auto" />
          <span>Momentum</span>
        </Link>
        <p className="text-xs text-muted-2">From intention to behavior.</p>
      </Container>
    </footer>
  );
}

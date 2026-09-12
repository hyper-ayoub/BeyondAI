"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function WaitlistForm({ platform }: { platform: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-5 py-3 text-sm text-foreground"
      >
        <CheckCircle2 size={16} className="text-accent-2" />
        You&apos;re on the list — we&apos;ll email you when {platform} is ready.
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="w-full rounded-full border border-border-strong bg-surface px-5 py-3 text-sm text-foreground outline-none placeholder:text-muted-2 focus:border-accent"
      />
      <MagneticButton type="submit" className="shrink-0">
        Join the waitlist
      </MagneticButton>
    </form>
  );
}

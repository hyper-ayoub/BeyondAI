import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { MeetTheAgent } from "@/components/sections/MeetTheAgent";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FocusSessionDemo } from "@/components/sections/FocusSessionDemo";
import { PlatformCTA } from "@/components/sections/PlatformCTA";
import { ContextEngine } from "@/components/sections/ContextEngine";
import { AgentDecision } from "@/components/sections/AgentDecision";
import { AgenticActions } from "@/components/sections/AgenticActions";
import { HumanInLoop } from "@/components/sections/HumanInLoop";
import { Analytics } from "@/components/sections/Analytics";
import { DailyReflection } from "@/components/sections/DailyReflection";
import { Architecture } from "@/components/sections/Architecture";
import { UseCases } from "@/components/sections/UseCases";
import { Privacy } from "@/components/sections/Privacy";
import { Roadmap } from "@/components/sections/Roadmap";
import { EnterpriseHR } from "@/components/sections/EnterpriseHR";
import { CTA, Footer } from "@/components/sections/CTAFooter";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemSolution />
        <MeetTheAgent />
        <HowItWorks />
        <FocusSessionDemo />
        <PlatformCTA />
        <ContextEngine />
        <AgentDecision />
        <AgenticActions />
        <HumanInLoop />
        <Analytics />
        <DailyReflection />
        <Architecture />
        <UseCases />
        <Privacy />
        <Roadmap />
        <EnterpriseHR />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

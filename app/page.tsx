import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { PerformanceTax } from "@/components/sections/PerformanceTax";
import { WhatThisIs } from "@/components/sections/WhatThisIs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Framework } from "@/components/sections/Framework";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Outcomes } from "@/components/sections/Outcomes";
import { About } from "@/components/sections/About";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { FAQ } from "@/components/sections/FAQ";
import { BottomCTA } from "@/components/sections/BottomCTA";
import { Footer } from "@/components/sections/Footer";
import { SectionTracker } from "@/components/SectionTracker";

export default function Home() {
  return (
    <>
      <SectionTracker />
      <Header />
      <main>
        <Hero />
        <PerformanceTax />
        <WhatThisIs />
        <Testimonials />
        <Framework />
        <HowItWorks />
        <Outcomes />
        <About />
        <WhoItsFor />
        <FAQ />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}

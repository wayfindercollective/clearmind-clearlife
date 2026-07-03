import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { PerformanceTax } from "@/components/sections/PerformanceTax";
import { WhatThisIs } from "@/components/sections/WhatThisIs";
import { Framework } from "@/components/sections/Framework";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Outcomes } from "@/components/sections/Outcomes";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyItWorks } from "@/components/sections/WhyItWorks";
import { About } from "@/components/sections/About";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { Application } from "@/components/sections/Application";
import { FAQ } from "@/components/sections/FAQ";
import { BottomCTA } from "@/components/sections/BottomCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PerformanceTax />
        <WhatThisIs />
        <Framework />
        <HowItWorks />
        <Outcomes />
        <Testimonials />
        <WhyItWorks />
        <About />
        <WhoItsFor />
        <Application />
        <FAQ />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}

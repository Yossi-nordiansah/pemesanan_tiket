"use client"
import Hero from "./_components/hero.jsx";
import Faq from "./_components/FAQPage.jsx";
import StatsPage from "./_components/StatsPage.jsx";

export default function Home() {
  return (
    <div className="h-full">
      <Hero/>
      <StatsPage/>
      <Faq/>
    </div>
  );
}

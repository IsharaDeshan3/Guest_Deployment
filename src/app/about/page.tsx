import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import IsaraFacilities from "@/components/IsaraFacilities";

export default function Home() {
  return (
    <main className="min-h-screen bg-nature-50 text-nature-900 font-sans selection:bg-nature-300 selection:text-nature-900">
      
      {/* Navigation Bar */}
      <Navigation />

      <HeroSection />

      <AboutSection />

      {/* Facilities Grid */}
      <IsaraFacilities/>

    </main>
  );
}

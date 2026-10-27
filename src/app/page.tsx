import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import IsaraFacilities from "@/components/IsaraFacilities";

export const metadata: Metadata = {
  title: "Guest House In Polonnaruwa",
  description:
    "ISARA Residence offers peaceful rooms near Polonnaruwa Ancient City with modern comfort, local hospitality, and quick access to major attractions.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-nature-50 text-nature-900 font-sans selection:bg-nature-300 selection:text-nature-900">
      
      {/* Navigation Bar */}
      <Navigation />

      <HeroSection />

      <AboutSection />

      {/* Facilities Grid */}
      <IsaraFacilities/>

      <section className="bg-nature-900 text-nature-100 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl">Plan Your Polonnaruwa Stay</h2>
          <p className="mt-3 max-w-3xl text-nature-200">
            Start with your room, map nearby landmarks, and contact us directly for travel support.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/rooms" className="rounded-lg bg-nature-100 px-4 py-2 text-sm font-medium text-nature-900 hover:bg-white">
              Browse Rooms
            </Link>
            <Link href="/locations" className="rounded-lg border border-nature-400 px-4 py-2 text-sm font-medium text-nature-100 hover:border-nature-200">
              Nearby Attractions
            </Link>
            <Link href="/contact" className="rounded-lg border border-nature-400 px-4 py-2 text-sm font-medium text-nature-100 hover:border-nature-200">
              Contact ISARA Residence
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

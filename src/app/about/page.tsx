import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "About Us | Top Choice Among Polonnaruwa Hotels",
  description:
    "Learn the story behind ISARA Residence, an inviting choice among Polonnaruwa hotels and guest houses, offering restful stays near the ancient city.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ISARA Residence | Polonnaruwa Hotels & Guest House",
    description:
      "Discover our guest house story, values, and why travelers consider ISARA Residence one of the most welcoming places to stay in Polonnaruwa.",
    url: "/about",
    images: [
      {
        url: "/about-sec-lnd.jpg",
        width: 1200,
        height: 630,
        alt: "Garden and peaceful atmosphere at ISARA Residence",
      },
    ],
  },
  twitter: {
    title: "About ISARA Residence | Polonnaruwa Hotels",
    description: "Our story and hospitality philosophy among hotels in Polonnaruwa.",
    images: ["/about-sec-lnd.jpg"],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-nature-950 text-nature-50 font-sans selection:bg-nature-300 selection:text-nature-900">
      <Navigation />

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-36 md:pt-40">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-nature-300">About ISARA Residence</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
            Your Welcoming Sanctuary Among Polonnaruwa Hotels
          </h1>
          <p className="mt-5 text-base md:text-lg text-nature-200 leading-relaxed">
            When comparing Polonnaruwa hotels and boutique guest houses, ISARA Residence is dedicated to giving travelers a restful, nature-wrapped stay close to the historical heart of the kingdom. We combine practical comfort with local guidance so your trip feels easy, personal, and memorable.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-nature-700/60 bg-nature-900/60 p-6">
            <h2 className="font-serif text-2xl">Our Story</h2>
            <p className="mt-3 text-nature-200 leading-relaxed">
              What began as a family-hosted residence grew into one of the most loved guest houses in Polonnaruwa for visitors seeking meaningful time in Sri Lanka&apos;s cultural triangle. Our team focuses on simple things done exceptionally well: pristine rooms, responsive support, and thoughtful local recommendations.
            </p>
          </article>

          <article className="rounded-2xl border border-nature-700/60 bg-nature-900/60 p-6">
            <h2 className="font-serif text-2xl">Hospitality Philosophy</h2>
            <p className="mt-3 text-nature-200 leading-relaxed">
              We believe the best hotels in Polonnaruwa should be quiet, warm, and dependable. From check-in to departure, we help guests move smoothly between rest and discovery, whether you&apos;re here for heritage travel, family vacation, or a scenic stopover.
            </p>
          </article>

          <article className="rounded-2xl border border-nature-700/60 bg-nature-900/60 p-6">
            <h2 className="font-serif text-2xl">Close To What Matters</h2>
            <p className="mt-3 text-nature-200 leading-relaxed">
              Conveniently situated roadside for effortless travel access, ISARA Residence also features peaceful views of the historic Parakrama Samudra reservoir directly from our backyard. We are located just minutes from archaeological landmarks, museums, and sacred temples.
            </p>
          </article>

          <article className="rounded-2xl border border-nature-700/60 bg-nature-900/60 p-6">
            <h2 className="font-serif text-2xl">Stay & Gatherings</h2>
            <p className="mt-3 text-nature-200 leading-relaxed">
              In addition to comfortable guest rooms with free Wi-Fi and air conditioning, our serene lakeside garden accommodates small parties, private celebrations, and business meetings. Check-in is from 3:00 PM and check-out is by 10:00 AM. Fresh Sri Lankan breakfast is optional upon request.
            </p>
          </article>
        </div>

        <section className="mt-12 rounded-2xl border border-nature-600/60 bg-nature-900/50 p-6">
          <h2 className="font-serif text-2xl">Plan Your Polonnaruwa Accommodation Booking</h2>
          <p className="mt-3 text-nature-200 leading-relaxed max-w-3xl">
            Ready to secure your stay? Explore our available rooms, discover nearby highlights, or contact our team directly for seamless booking assistance.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/rooms" className="rounded-lg bg-nature-100 px-4 py-2 text-sm font-medium text-nature-900 hover:bg-white">
              View Rooms &amp; Availability
            </Link>
            <Link href="/locations" className="rounded-lg border border-nature-400 px-4 py-2 text-sm font-medium text-nature-100 hover:border-nature-200">
              Explore Nearby Locations
            </Link>
            <Link href="/contact" className="rounded-lg border border-nature-400 px-4 py-2 text-sm font-medium text-nature-100 hover:border-nature-200">
              Contact &amp; Book Directly
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

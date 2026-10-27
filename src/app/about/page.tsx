import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "About ISARA Residence",
  description:
    "Learn the story behind ISARA Residence in Polonnaruwa, our hospitality values, and how we help guests explore Sri Lanka's ancient city with comfort.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ISARA Residence",
    description:
      "Discover our guest house story, values, and local host experience in Polonnaruwa.",
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
    title: "About ISARA Residence",
    description: "Our story and hospitality philosophy in Polonnaruwa.",
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
            A Calm Base For Exploring Ancient Polonnaruwa
          </h1>
          <p className="mt-5 text-base md:text-lg text-nature-200 leading-relaxed">
            ISARA Residence was built to give travelers a restful, nature-wrapped stay close to the historical heart of Polonnaruwa. We combine practical comfort with local guidance so your trip feels easy, personal, and memorable.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-nature-700/60 bg-nature-900/60 p-6">
            <h2 className="font-serif text-2xl">Our Story</h2>
            <p className="mt-3 text-nature-200 leading-relaxed">
              What began as a family-hosted residence grew into a welcoming guest house for visitors seeking meaningful time in Sri Lanka&apos;s cultural triangle. Our team focuses on simple things done well: clean rooms, responsive support, and thoughtful local recommendations.
            </p>
          </article>

          <article className="rounded-2xl border border-nature-700/60 bg-nature-900/60 p-6">
            <h2 className="font-serif text-2xl">Hospitality Philosophy</h2>
            <p className="mt-3 text-nature-200 leading-relaxed">
              We believe good stays are quiet, warm, and dependable. From check-in to departure, we help guests move smoothly between rest and discovery, whether you&apos;re here for heritage travel, family time, or a short stopover.
            </p>
          </article>

          <article className="rounded-2xl border border-nature-700/60 bg-nature-900/60 p-6">
            <h2 className="font-serif text-2xl">Close To What Matters</h2>
            <p className="mt-3 text-nature-200 leading-relaxed">
              ISARA Residence is positioned for quick access to temples, museums, and archaeological landmarks while still offering a peaceful environment to unwind in the evening.
            </p>
          </article>

          <article className="rounded-2xl border border-nature-700/60 bg-nature-900/60 p-6">
            <h2 className="font-serif text-2xl">Our Promise</h2>
            <p className="mt-3 text-nature-200 leading-relaxed">
              Every guest receives attentive service, clear travel guidance, and a comfortable room prepared with care. We&apos;re committed to making your Polonnaruwa visit smooth from the moment you arrive.
            </p>
          </article>
        </div>

        <section className="mt-12 rounded-2xl border border-nature-600/60 bg-nature-900/50 p-6">
          <h2 className="font-serif text-2xl">Plan Your Stay</h2>
          <p className="mt-3 text-nature-200 leading-relaxed max-w-3xl">
            Ready to continue? Explore room options, discover nearby highlights, or contact us directly for availability and local travel help.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/rooms" className="rounded-lg bg-nature-100 px-4 py-2 text-sm font-medium text-nature-900 hover:bg-white">
              View Rooms
            </Link>
            <Link href="/locations" className="rounded-lg border border-nature-400 px-4 py-2 text-sm font-medium text-nature-100 hover:border-nature-200">
              Explore Nearby Locations
            </Link>
            <Link href="/contact" className="rounded-lg border border-nature-400 px-4 py-2 text-sm font-medium text-nature-100 hover:border-nature-200">
              Contact ISARA Residence
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

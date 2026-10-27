import type { Metadata } from "next";
import Link from "next/link";
import AnimationRepair from "@/components/AnimationRepair";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Dining At ISARA Residence",
  description:
    "Discover the dining experience at ISARA Residence in Polonnaruwa, featuring local Sri Lankan flavors, guest-friendly meal options, and personalized service.",
  alternates: {
    canonical: "/restaurant",
  },
  openGraph: {
    title: "Dining At ISARA Residence",
    description:
      "Learn about our dining style, meal highlights, and how to request custom meal support during your stay.",
    url: "/restaurant",
    images: [
      {
        url: "/restaurant-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Dining atmosphere at ISARA Residence",
      },
    ],
  },
  twitter: {
    title: "Dining At ISARA Residence",
    description:
      "Fresh local flavors and guest-friendly meal options in Polonnaruwa.",
    images: ["/restaurant-bg.jpg"],
  },
};

export default function RestaurantPage() {
  return (
    <main className="relative min-h-screen text-nature-900 font-sans selection:bg-nature-300 selection:text-nature-900">
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/restaurant-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(3px)",
        }}
      />

      <Navigation />

      <section className="max-w-6xl mx-auto px-6 pt-36 pb-16 text-white">
        <h1 className="font-serif text-4xl md:text-5xl">Dining At ISARA Residence</h1>
        <p className="mt-4 max-w-3xl text-white/90 leading-relaxed">
          Our dining experience is designed for travelers who want authentic Sri Lankan taste with practical flexibility. From local breakfast favorites to simple comfort meals, we focus on fresh preparation and warm hospitality.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-white/25 bg-black/25 p-5 backdrop-blur-sm">
            <h2 className="font-serif text-2xl">Local Flavor</h2>
            <p className="mt-2 text-sm text-white/90">
              Expect seasonal ingredients, home-style preparation, and regional character inspired by Polonnaruwa&apos;s food culture.
            </p>
          </article>
          <article className="rounded-2xl border border-white/25 bg-black/25 p-5 backdrop-blur-sm">
            <h2 className="font-serif text-2xl">Guest Flexibility</h2>
            <p className="mt-2 text-sm text-white/90">
              Meal timing and dietary preferences can be discussed in advance to support family travel, early excursions, and custom schedules.
            </p>
          </article>
          <article className="rounded-2xl border border-white/25 bg-black/25 p-5 backdrop-blur-sm">
            <h2 className="font-serif text-2xl">Easy Planning</h2>
            <p className="mt-2 text-sm text-white/90">
              Contact us before arrival for meal arrangements and local recommendations that match your itinerary.
            </p>
          </article>
        </div>

        <div className="mt-10 rounded-2xl border border-white/25 bg-black/25 p-6 backdrop-blur-sm">
          <p className="text-white/90">
            A dedicated full restaurant service area is still being refined. In the meantime, guests continue to receive curated meal support and practical dining options during their stay.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-nature-900 hover:bg-nature-100">
              Ask About Meal Options
            </Link>
            <Link href="/rooms" className="rounded-lg border border-white/40 px-4 py-2 text-sm font-medium text-white hover:border-white">
              View Rooms
            </Link>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center">
          <AnimationRepair />
        </div>
      </section>
    </main>
  );
}

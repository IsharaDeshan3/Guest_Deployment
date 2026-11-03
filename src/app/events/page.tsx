import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { Users, Briefcase, Sparkles, MapPin, Wifi, Coffee, Calendar, Phone, MessageSquare } from "lucide-react";
import { getWhatsAppEventUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Events, Small Parties & Meetings | ISARA Residence Polonnaruwa",
  description:
    "Host intimate celebrations, small parties, business meetings, and gatherings at ISARA Residence in Polonnaruwa. Roadside convenience with scenic Parakrama Samudra backyard views.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Events, Small Parties & Meetings | ISARA Residence Polonnaruwa",
    description:
      "Host intimate celebrations, small parties, corporate meetings, and private gatherings at ISARA Residence with peaceful Parakrama Samudra backyard views.",
    url: "/events",
    images: [
      {
        url: "/about-sec-lnd.jpg",
        width: 1200,
        height: 630,
        alt: "Events and garden venue at ISARA Residence Polonnaruwa",
      },
    ],
  },
  twitter: {
    title: "Events, Small Parties & Meetings | ISARA Residence",
    description:
      "Small parties, corporate meetings, and gatherings with lakeside views in Polonnaruwa.",
    images: ["/about-sec-lnd.jpg"],
  },
};

const eventsJsonLd = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "ISARA Residence Event & Meeting Space",
  description:
    "Boutique event space for small parties, business meetings, and private gatherings with backyard views of Parakrama Samudra.",
  url: "https://www.isararesidence.lk/events",
  telephone: "+94706801910",
  address: {
    "@type": "PostalAddress",
    streetAddress: "26th Mile Post, Bendiwewa",
    addressLocality: "Polonnaruwa",
    postalCode: "51000",
    addressCountry: "LK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 7.9594659,
    longitude: 80.9940749,
  },
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Free Wi-Fi",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Free On-Site Parking",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Parakrama Samudra Backyard View",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Optional Refreshments & Meals Upon Request",
      value: true,
    },
  ],
};

export default function EventsPage() {
  const whatsappUrl = getWhatsAppEventUrl();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventsJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="min-h-screen bg-nature-950 text-nature-50 font-sans selection:bg-nature-300 selection:text-nature-900">
        <Navigation />

        {/* Hero Section */}
        <section className="relative px-6 pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
            style={{
              backgroundImage: "url('/about-sec-lnd.jpg')",
              filter: "blur(2px)",
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-nature-950/90 via-nature-950/85 to-nature-950" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nature-800/80 border border-nature-600/40 text-xs uppercase tracking-[0.25em] text-nature-300">
              <Sparkles className="h-3.5 w-3.5 text-nature-400" />
              Private Gatherings & Meetings
            </span>

            <h1 className="mt-6 font-serif text-3xl sm:text-5xl md:text-6xl text-nature-50 leading-tight">
              Host Your Gathering at <br />
              <span className="italic text-nature-300">ISARA Residence</span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-nature-200 text-base sm:text-lg leading-relaxed">
              Experience the perfect setting for intimate celebrations, small parties, and focused business meetings in Polonnaruwa. With scenic Parakrama Samudra views from our backyard and easy roadside access, we provide a welcoming, peaceful environment tailored to your event.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact?type=meeting"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-nature-600 to-nature-700 hover:from-nature-500 hover:to-nature-600 text-white font-semibold uppercase tracking-wider text-xs transition-all shadow-xl hover:shadow-nature-600/30 flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Submit Event Inquiry
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold uppercase tracking-wider text-xs transition-all shadow-xl hover:shadow-emerald-600/30 flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Suitable Gathering Types */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-nature-50">
              Events We Accommodate
            </h2>
            <p className="mt-3 text-nature-300 text-sm sm:text-base max-w-2xl mx-auto">
              Our venue is designed for smaller, thoughtful gatherings where personal service and calm ambiance make the difference.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Small Parties */}
            <article className="rounded-3xl border border-nature-700/60 bg-nature-900/50 p-8 backdrop-blur-sm hover:border-nature-500/60 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-nature-500 to-nature-700 flex items-center justify-center mb-6 shadow-md text-white">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl text-nature-50 mb-3">Small Parties & Celebrations</h3>
                <p className="text-sm text-nature-300 leading-relaxed mb-6">
                  Celebrate birthdays, family reunions, anniversaries, or friendly get-togethers in a private, natural setting with lush greenery and fresh reservoir breezes.
                </p>
              </div>
              <Link
                href="/contact?type=small_party"
                className="text-xs uppercase tracking-wider font-semibold text-nature-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                Plan a party &rarr;
              </Link>
            </article>

            {/* Business Meetings */}
            <article className="rounded-3xl border border-nature-700/60 bg-nature-900/50 p-8 backdrop-blur-sm hover:border-nature-500/60 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-nature-500 to-nature-700 flex items-center justify-center mb-6 shadow-md text-white">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl text-nature-50 mb-3">Business Meetings & Workshops</h3>
                <p className="text-sm text-nature-300 leading-relaxed mb-6">
                  Conduct quiet executive discussions, team brainstorming sessions, or educational workshops away from city distractions, supported by high-speed Wi-Fi.
                </p>
              </div>
              <Link
                href="/contact?type=meeting"
                className="text-xs uppercase tracking-wider font-semibold text-nature-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                Inquire about meetings &rarr;
              </Link>
            </article>

            {/* Private Gatherings */}
            <article className="rounded-3xl border border-nature-700/60 bg-nature-900/50 p-8 backdrop-blur-sm hover:border-nature-500/60 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-nature-500 to-nature-700 flex items-center justify-center mb-6 shadow-md text-white">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl text-nature-50 mb-3">Private Gatherings & Dinners</h3>
                <p className="text-sm text-nature-300 leading-relaxed mb-6">
                  Host intimate dinners, community meetups, or traveler retreats with custom tea, coffee, and traditional Sri Lankan meal arrangements upon advance request.
                </p>
              </div>
              <Link
                href="/contact?type=gathering"
                className="text-xs uppercase tracking-wider font-semibold text-nature-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                Arrange a gathering &rarr;
              </Link>
            </article>
          </div>
        </section>

        {/* Venue Amenities & Highlights */}
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-nature-800/60">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-nature-50">
              Why Host With Us
            </h2>
            <p className="mt-3 text-nature-300 text-sm sm:text-base max-w-2xl mx-auto">
              Everything you need for a comfortable, stress-free gathering in Polonnaruwa.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-2xl bg-nature-900/40 border border-nature-800">
              <MapPin className="h-6 w-6 text-nature-300 mb-3" />
              <h4 className="font-semibold text-nature-100 text-base mb-2">Backyard Reservoir View</h4>
              <p className="text-xs text-nature-300/90 leading-relaxed">
                Enjoy tranquil vistas overlooking the historic Parakrama Samudra reservoir from our garden backyard.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-nature-900/40 border border-nature-800">
              <MapPin className="h-6 w-6 text-nature-300 mb-3" />
              <h4 className="font-semibold text-nature-100 text-base mb-2">Roadside Convenience</h4>
              <p className="text-xs text-nature-300/90 leading-relaxed">
                Convenient roadside location with straightforward road access and hassle-free vehicle parking for all attendees.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-nature-900/40 border border-nature-800">
              <Wifi className="h-6 w-6 text-nature-300 mb-3" />
              <h4 className="font-semibold text-nature-100 text-base mb-2">Free High-Speed Wi-Fi</h4>
              <p className="text-xs text-nature-300/90 leading-relaxed">
                Complimentary Wi-Fi connectivity for presentations, video streaming, and seamless online collaboration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-nature-900/40 border border-nature-800">
              <Coffee className="h-6 w-6 text-nature-300 mb-3" />
              <h4 className="font-semibold text-nature-100 text-base mb-2">Refreshments on Request</h4>
              <p className="text-xs text-nature-300/90 leading-relaxed">
                Fresh Ceylon tea, coffee, and authentic Sri Lankan catering can be coordinated upon advance request.
              </p>
            </div>
          </div>
        </section>

        {/* Accommodation Pairing */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="rounded-3xl border border-nature-700/60 bg-gradient-to-br from-nature-900 via-nature-900/90 to-nature-800/80 p-8 sm:p-12 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="font-serif text-2xl sm:text-3xl text-nature-50">
                Need Rooms For Your Guests?
              </h3>
              <p className="mt-3 text-nature-200 text-sm sm:text-base leading-relaxed">
                Pair your event with our on-site air-conditioned rooms and family accommodations. Overnight attendees can relax in comfort with hot water, private bathrooms, and peaceful garden surroundings.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link
                href="/rooms"
                className="px-6 py-3.5 rounded-xl border border-nature-400 hover:border-white text-white font-medium text-xs uppercase tracking-wider text-center transition-all"
              >
                Explore Rooms
              </Link>
              <Link
                href="/contact?type=meeting"
                className="px-6 py-3.5 rounded-xl bg-nature-100 hover:bg-white text-nature-950 font-semibold text-xs uppercase tracking-wider text-center transition-all shadow-lg"
              >
                Inquire For Group Stay
              </Link>
            </div>
          </div>
        </section>

        {/* Direct Contact Banner */}
        <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
          <h3 className="font-serif text-2xl sm:text-3xl text-nature-50 mb-3">
            Speak With Us Directly
          </h3>
          <p className="text-sm text-nature-300 max-w-xl mx-auto mb-8">
            Every event is unique. Contact us directly to discuss your specific requirements, guest count, and preferred dates.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+94706801910"
              className="px-6 py-3 rounded-xl bg-nature-800/70 hover:bg-nature-700/70 border border-nature-600/40 text-nature-100 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Phone className="h-4 w-4 text-nature-300" />
              +94 70 680 1910
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

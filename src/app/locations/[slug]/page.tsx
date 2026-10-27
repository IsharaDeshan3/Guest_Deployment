import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AttractionDetailClient from "./AttractionDetailClient";
import {
  nearbyLocations,
  getLocationSlug,
  getLocationBySlugOrId,
  getRelatedLocations,
  guesthouseOrigin,
} from "@/data/nearbyLocations";
import { haversineKm, estimateDriveMinutes } from "@/lib/geo";
import {
  MapPin,
  Clock,
  Landmark,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CalendarCheck,
  Shirt,
  Sun,
  Camera,
} from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return nearbyLocations.map((loc) => ({
    slug: getLocationSlug(loc),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlugOrId(slug);

  if (!location) {
    return {
      title: "Attraction Not Found | ISARA Residence",
      description: "The requested Polonnaruwa attraction could not be found.",
    };
  }

  const distanceKm = haversineKm(
    guesthouseOrigin.lat,
    guesthouseOrigin.lng,
    location.lat,
    location.lng
  );

  const cleanDescription = location.description.en.replace(/\s+/g, " ").trim();
  const metaDescription = `${location.name} is located ${distanceKm.toFixed(
    1
  )} km from ISARA Residence in Polonnaruwa. Explore its history, architectural significance, photos, and visiting guide.`;

  const canonicalUrl = `https://isararesidence.vercel.app/locations/${getLocationSlug(location)}`;
  const primaryImage = location.images?.[0]
    ? `https://isararesidence.vercel.app${location.images[0]}`
    : "https://isararesidence.vercel.app/location-bg.jpg";

  return {
    title: `${location.name} in Polonnaruwa | Visiting Guide & Stay Nearby | ISARA Residence`,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${location.name} – Polonnaruwa Ancient City | ISARA Residence`,
      description: `${cleanDescription.slice(0, 155)}...`,
      url: canonicalUrl,
      siteName: "ISARA Residence Polonnaruwa",
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: `${location.name} archaeological site in Polonnaruwa, Sri Lanka`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${location.name} | Polonnaruwa Guide`,
      description: metaDescription,
      images: [primaryImage],
    },
    keywords: [
      location.name,
      `${location.name} Polonnaruwa`,
      "Polonnaruwa attractions",
      "Polonnaruwa ruins guide",
      "places to visit in Polonnaruwa",
      "guest house near Polonnaruwa ruins",
      "ISARA Residence locations",
      "Sri Lanka cultural triangle",
    ],
  };
}

export default async function AttractionDetailPage({ params }: Props) {
  const { slug } = await params;
  const location = getLocationBySlugOrId(slug);

  if (!location) {
    notFound();
  }

  const canonicalSlug = getLocationSlug(location);
  const distanceKm = haversineKm(
    guesthouseOrigin.lat,
    guesthouseOrigin.lng,
    location.lat,
    location.lng
  );
  const driveMinutes = estimateDriveMinutes(distanceKm);
  const visitMinutes = location.visitMinutes ?? 45;
  const relatedLocations = getRelatedLocations(location.id, 3);

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${guesthouseOrigin.lat},${guesthouseOrigin.lng}&destination=${location.lat},${location.lng}`;

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristAttraction",
        "@id": `https://isararesidence.vercel.app/locations/${canonicalSlug}#attraction`,
        name: location.name,
        description: location.description.en,
        url: `https://isararesidence.vercel.app/locations/${canonicalSlug}`,
        geo: {
          "@type": "GeoCoordinates",
          latitude: location.lat,
          longitude: location.lng,
        },
        image: location.images.map(
          (img) => `https://isararesidence.vercel.app${img}`
        ),
        isAccessibleForFree: false,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Polonnaruwa",
          addressRegion: "North Central Province",
          addressCountry: "LK",
        },
        containedInPlace: {
          "@type": "Place",
          name: "Ancient City of Polonnaruwa UNESCO World Heritage Site",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://isararesidence.vercel.app/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Nearby Attractions",
            item: "https://isararesidence.vercel.app/locations",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: location.name,
            item: `https://isararesidence.vercel.app/locations/${canonicalSlug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-nature-950 text-nature-50 font-sans selection:bg-nature-300 selection:text-nature-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Navigation />

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-32 sm:pt-36 pb-20">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-nature-300/80">
          <Link href="/" className="hover:text-nature-100 transition-colors">
            Home
          </Link>
          <span aria-hidden="true">&gt;</span>
          <Link href="/locations" className="hover:text-nature-100 transition-colors">
            Nearby Attractions
          </Link>
          <span aria-hidden="true">&gt;</span>
          <span className="text-nature-100 font-medium truncate max-w-[200px] sm:max-w-none">
            {location.name}
          </span>
        </nav>

        {/* Hero Landmark Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-nature-500/20 px-3 py-1 text-xs font-medium text-nature-300 border border-nature-500/30">
              <Landmark className="h-3.5 w-3.5" />
              <span>UNESCO World Heritage Site</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-nature-200 border border-white/10">
              <MapPin className="h-3.5 w-3.5" />
              <span>{distanceKm.toFixed(1)} km from ISARA</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-nature-200 border border-white/10">
              <Clock className="h-3.5 w-3.5" />
              <span>~{visitMinutes} min visit</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-nature-50 leading-tight">
            {location.name}
          </h1>
          <p className="mt-4 text-base md:text-lg text-nature-200 max-w-3xl leading-relaxed">
            Discover the history, architecture, and visitor details of {location.name} in Polonnaruwa, located only a short ride from your sanctuary at ISARA Residence.
          </p>
        </header>

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Interactive Gallery & Narrative */}
            <AttractionDetailClient
              location={location}
              distanceKm={distanceKm}
              driveMinutes={driveMinutes}
              googleMapsUrl={googleMapsUrl}
            />

            {/* Practical Visitor Guide */}
            <section className="rounded-3xl border border-nature-700/60 bg-nature-900/60 p-6 md:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl bg-nature-500/20 p-2 text-nature-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-nature-50">
                    Visitor Essentials & Heritage Etiquette
                  </h2>
                  <p className="text-xs text-nature-300">
                    Tips for a respectful and comfortable visit to Polonnaruwa archaeological monuments
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-nature-800 bg-nature-950/60 p-4">
                  <div className="flex items-center gap-2 text-nature-200 font-semibold mb-1.5">
                    <Shirt className="h-4 w-4 text-nature-300" />
                    <span>Modest Dress Code</span>
                  </div>
                  <p className="text-xs text-nature-300 leading-relaxed">
                    Shoulders and knees must be covered at all sacred Buddhist ruins. White or light-colored attire is respectful and keeps you cool under the tropical sun.
                  </p>
                </div>

                <div className="rounded-2xl border border-nature-800 bg-nature-950/60 p-4">
                  <div className="flex items-center gap-2 text-nature-200 font-semibold mb-1.5">
                    <Sun className="h-4 w-4 text-nature-300" />
                    <span>Footwear & Hot Stones</span>
                  </div>
                  <p className="text-xs text-nature-300 leading-relaxed">
                    Shoes and hats must be removed before stepping onto elevated stone platforms and stupa terraces. Bring thick socks to protect feet against warm midday stone.
                  </p>
                </div>

                <div className="rounded-2xl border border-nature-800 bg-nature-950/60 p-4">
                  <div className="flex items-center gap-2 text-nature-200 font-semibold mb-1.5">
                    <Clock className="h-4 w-4 text-nature-300" />
                    <span>Recommended Time of Day</span>
                  </div>
                  <p className="text-xs text-nature-300 leading-relaxed">
                    Early morning (07:30 - 10:00 AM) or late afternoon (03:30 - 05:45 PM) offer gentler temperatures, soft golden light for photos, and fewer tour groups.
                  </p>
                </div>

                <div className="rounded-2xl border border-nature-800 bg-nature-950/60 p-4">
                  <div className="flex items-center gap-2 text-nature-200 font-semibold mb-1.5">
                    <Camera className="h-4 w-4 text-nature-300" />
                    <span>Photography Protocol</span>
                  </div>
                  <p className="text-xs text-nature-300 leading-relaxed">
                    Never turn your back directly to a Buddha statue when posing for photos. Flash photography is restricted in sheltered mural chambers like Tivanka Image House.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-nature-700/60 bg-nature-800/40 p-4 text-xs text-nature-200 leading-relaxed">
                <span className="font-semibold text-nature-100">Ticket Information:</span> Entry is covered by the Central Cultural Fund standard Polonnaruwa Heritage ticket, which can be purchased at the Archaeological Museum (1.5 km from ISARA Residence).
              </div>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Quick Factsheet Card */}
            <div className="rounded-3xl border border-nature-700/60 bg-nature-900/60 p-6 backdrop-blur-md">
              <h3 className="font-serif text-lg text-nature-50 mb-4 pb-3 border-b border-nature-800">
                Landmark Fast Facts
              </h3>

              <dl className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-nature-300">From ISARA Residence</dt>
                  <dd className="font-semibold text-nature-100">{distanceKm.toFixed(1)} km</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-nature-300">Approx. Drive Time</dt>
                  <dd className="font-semibold text-nature-100">~{driveMinutes} mins</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-nature-300">Recommended Visit</dt>
                  <dd className="font-semibold text-nature-100">~{visitMinutes} mins</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-nature-300">Location</dt>
                  <dd className="font-semibold text-nature-100">Polonnaruwa, Sri Lanka</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-nature-300">GPS Coordinates</dt>
                  <dd className="font-mono text-xs text-nature-200">
                    {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 pt-5 border-t border-nature-800">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 px-4 py-3 text-xs font-semibold text-white transition-all"
                >
                  <MapPin className="h-4 w-4 text-nature-300" />
                  <span>Navigate with Google Maps</span>
                </a>
              </div>
            </div>

            {/* Stay at ISARA Residence Conversion Card */}
            <div className="rounded-3xl border border-nature-500/40 bg-gradient-to-br from-nature-900 via-nature-900/90 to-nature-800/80 p-6 shadow-xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-nature-400/10 blur-2xl" />

              <div className="inline-flex items-center gap-1.5 rounded-full bg-nature-400/20 px-3 py-1 text-[11px] font-semibold text-nature-200 border border-nature-400/30 mb-3">
                <Sparkles className="h-3 w-3 text-nature-300" />
                <span>Stay Nearby</span>
              </div>

              <h3 className="font-serif text-xl text-nature-50 mb-2">
                Stay Close To {location.name}
              </h3>
              <p className="text-xs text-nature-200/90 leading-relaxed mb-5">
                ISARA Residence is your peaceful retreat in Polonnaruwa. After exploring {location.name}, return to quiet garden surroundings, cool air-conditioned bedrooms, and freshly prepared local meals.
              </p>

              <ul className="space-y-2 mb-6 text-xs text-nature-200">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-nature-400" />
                  <span>Only {distanceKm.toFixed(1)} km from {location.name}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-nature-400" />
                  <span>Bicycle rentals available for exploring ruins</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-nature-400" />
                  <span>Parakrama Samudra lakeside peaceful vibe</span>
                </li>
              </ul>

              <div className="space-y-2.5">
                <Link
                  href="/rooms"
                  className="flex items-center justify-center gap-2 w-full rounded-2xl bg-nature-500 hover:bg-nature-400 px-4 py-3 text-xs font-semibold text-nature-950 transition-all shadow-md"
                >
                  <CalendarCheck className="h-4 w-4" />
                  <span>Browse Available Rooms</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2.5 text-xs font-medium text-white transition-all"
                >
                  <span>Contact Host Directly</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Return to Map Link */}
            <div className="text-center pt-2">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-xs text-nature-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to Interactive Locations Map</span>
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Nearby Sites Section */}
        {relatedLocations.length > 0 && (
          <section className="mt-16 sm:mt-24 pt-12 border-t border-nature-800/80">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-nature-300 font-semibold">
                  Continue Exploring
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-nature-50 mt-1">
                  More Sites Near {location.name}
                </h2>
              </div>
              <Link
                href="/locations"
                className="inline-flex items-center gap-1.5 text-xs text-nature-300 hover:text-white transition-colors font-medium"
              >
                <span>View all {nearbyLocations.length} attractions</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedLocations.map((rel) => {
                const relSlug = getLocationSlug(rel);
                const relDist = haversineKm(
                  guesthouseOrigin.lat,
                  guesthouseOrigin.lng,
                  rel.lat,
                  rel.lng
                );
                const relImg = rel.images?.[0];

                return (
                  <Link
                    key={rel.id}
                    href={`/locations/${relSlug}`}
                    className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-nature-800 bg-nature-900/40 p-4 transition-all duration-300 hover:border-nature-500 hover:bg-nature-900/70 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div>
                      {relImg && (
                        <div className="relative mb-3.5 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-nature-950">
                          <Image
                            src={relImg}
                            alt={rel.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute top-2.5 right-2.5 rounded-full bg-nature-950/80 px-2.5 py-0.5 text-[11px] font-medium text-nature-100 backdrop-blur-xs border border-white/10">
                            {relDist.toFixed(1)} km away
                          </div>
                        </div>
                      )}
                      <h3 className="font-serif text-lg text-nature-50 group-hover:text-nature-200 transition-colors">
                        {rel.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-nature-300 leading-relaxed">
                        {rel.description.en}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-nature-800/80 pt-3 text-xs text-nature-300">
                      <span>~{rel.visitMinutes ?? 30} min visit</span>
                      <span className="inline-flex items-center gap-1 font-medium text-nature-100 group-hover:translate-x-1 transition-transform">
                        Explore &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

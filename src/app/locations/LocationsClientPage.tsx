"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import LocationsClient from "@/components/locations/LocationsClient";
import { nearbyLocations, getLocationSlug, guesthouseOrigin } from "@/data/nearbyLocations";
import { haversineKm } from "@/lib/geo";

export default function LocationsPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState("translate(0px, 0px) scale(1.05)");

  const target = useRef({ x: 0, y: 0, scale: 1.05 });
  const current = useRef({ x: 0, y: 0, scale: 1.05 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const step = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      current.current.scale += (target.current.scale - current.current.scale) * 0.12;

      setTransformStyle(
        `translate(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px) scale(${current.current.scale.toFixed(4)})`
      );

      rafRef.current = window.requestAnimationFrame(step);
    };

    rafRef.current = window.requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    target.current.x = -relX * 18;
    target.current.y = -relY * 12;
    target.current.scale = 1.07;
  };

  const handleLeave = () => {
    target.current.x = 0;
    target.current.y = 0;
    target.current.scale = 1.05;
  };

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="min-h-screen text-nature-900 font-sans selection:bg-nature-300 selection:text-nature-900 relative overflow-hidden"
    >
      <Navigation />

      {/* Background image behind the map (expects public/location-bg.jpg) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[3px] brightness-95 will-change-transform"
          style={{ backgroundImage: "url('/location-bg.jpg')", transform: transformStyle }}
        />
        <div className="absolute inset-0 bg-nature-50/36 mix-blend-multiply" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-36 pb-10 relative z-10">
        <h1 className="font-serif text-3xl md:text-4xl text-white">Nearby Locations</h1>
        <p className="mt-2 text-sm text-white/90 max-w-2xl">
          Click a pin to view photos and a short description. Use the Translate
          button to switch between English and Sinhala.
        </p>

        <div className="mt-10">
          <LocationsClient />
        </div>

        <section className="mt-14 rounded-3xl border border-white/20 bg-black/35 p-6 md:p-8 text-white backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-nature-300 font-semibold">
                Historical Heritage
              </p>
              <h2 className="font-serif text-2xl md:text-3xl mt-1">
                Polonnaruwa Landmark Guides
              </h2>
            </div>
            <p className="text-xs text-white/70 max-w-md">
              Each attraction below features historical details, photography, estimated travel times from ISARA Residence, and practical visitor tips.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nearbyLocations.map((location) => {
              const dist = haversineKm(
                guesthouseOrigin.lat,
                guesthouseOrigin.lng,
                location.lat,
                location.lng
              );
              const slug = getLocationSlug(location);
              const img = location.images?.[0];

              return (
                <Link
                  key={location.id}
                  href={`/locations/${slug}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 transition-all duration-300 hover:border-nature-300 hover:bg-white/15 hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    {img && (
                      <div className="relative mb-3 aspect-[16/10] w-full overflow-hidden rounded-xl bg-black/40">
                        <Image
                          src={img}
                          alt={location.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-xs">
                          {dist.toFixed(1)} km
                        </div>
                      </div>
                    )}
                    <h3 className="font-medium text-base text-white group-hover:text-nature-200 transition-colors">
                      {location.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-white/80 leading-relaxed">
                      {location.description.en}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-nature-200">
                    <span>~{location.visitMinutes ?? 30} min visit</span>
                    <span className="inline-flex items-center gap-1 font-medium text-white group-hover:translate-x-1 transition-transform">
                      View Guide &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <p className="mt-8 text-sm text-white/85 text-center sm:text-left">
            Planning your itinerary in Polonnaruwa?
            {" "}
            <Link href="/rooms" className="underline underline-offset-4 hover:text-white font-medium">
              Browse available rooms
            </Link>
            {" "}
            or
            {" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-white font-medium">
              get local travel recommendations from our hosts
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

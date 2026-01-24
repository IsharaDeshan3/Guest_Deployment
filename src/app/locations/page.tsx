"use client";

import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import LocationsClient from "@/components/locations/LocationsClient";

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
      </div>
    </main>
  );
}

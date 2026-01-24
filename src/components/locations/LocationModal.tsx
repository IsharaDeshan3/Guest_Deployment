"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { NearbyLocation } from "@/data/nearbyLocations";
import { guesthouseOrigin } from "@/data/nearbyLocations";
import { estimateDriveMinutes, haversineKm } from "@/lib/geo";

export default function LocationModal({
  location,
  onClose,
}: {
  location: NearbyLocation;
  onClose: () => void;
}) {
  const [lang, setLang] = useState<"en" | "si">("en");
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const images = location.images ?? [];
  const hasImages = images.length > 0;

  const description = useMemo(() => {
    return lang === "en" ? location.description.en : location.description.si;
  }, [lang, location.description.en, location.description.si]);

  const distanceKm = useMemo(() => {
    return haversineKm(
      guesthouseOrigin.lat,
      guesthouseOrigin.lng,
      location.lat,
      location.lng
    );
  }, [location.lat, location.lng]);

  const driveMinutes = useMemo(() => estimateDriveMinutes(distanceKm), [distanceKm]);
  const visitMinutes = location.visitMinutes ?? 45;

  const prev = () => {
    if (!hasImages) return;
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  const next = () => {
    if (!hasImages) return;
    setIndex((i) => (i + 1) % images.length);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, hasImages, onClose]);

  useEffect(() => {
    // animate in
    const id = window.setTimeout(() => setVisible(true), 10);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(), 300);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[2147483647] bg-nature-950/70 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${location.name} details`}
      onMouseDown={handleClose}
    >
      <div
        className={`w-full max-w-5xl rounded-3xl bg-nature-900/40 text-nature-50 shadow-2xl overflow-hidden transform transition-all duration-300 border border-white/10 backdrop-blur-md ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"
        }`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-white/10">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold truncate">
              {location.name}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-nature-100/90">
              <span className="rounded-full bg-white/10 border border-white/10 px-2.5 py-1">
                {distanceKm.toFixed(1)} km from {guesthouseOrigin.name}
              </span>
              <span className="rounded-full bg-white/10 border border-white/10 px-2.5 py-1">
                ~{driveMinutes} min drive
              </span>
              <span className="rounded-full bg-white/10 border border-white/10 px-2.5 py-1">
                ~{visitMinutes} min visit
              </span>
            </div>
            <p className="mt-2 text-xs text-nature-200/80">Click outside or press Esc to close</p>
          </div>

          <button
            onClick={handleClose}
            className="rounded-xl px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 p-6">
          <div className="md:col-span-3">
            <div className="relative w-full h-[280px] sm:h-[380px] rounded-2xl overflow-hidden bg-black/25 border border-white/10">
              {hasImages ? (
                <Image
                  src={images[index]}
                  alt={`${location.name} image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-sm text-nature-200/80">
                  No images added yet
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={prev}
                disabled={!hasImages}
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 bg-nature-50/90 text-nature-950 hover:bg-white disabled:opacity-40 disabled:hover:bg-nature-50/90 transition-colors"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                onClick={next}
                disabled={!hasImages}
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 bg-nature-50/90 text-nature-950 hover:bg-white disabled:opacity-40 disabled:hover:bg-nature-50/90 transition-colors"
                aria-label="Next image"
              >
                →
              </button>
            </div>

            {hasImages && (
              <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                {images.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    onClick={() => setIndex(i)}
                    className={`relative h-14 w-20 rounded-xl overflow-hidden shrink-0 border transition-colors ${
                      i === index ? "border-nature-200" : "border-white/10"
                    }`}
                    aria-label={`Show image ${i + 1}`}
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="rounded-2xl bg-black/20 border border-white/10 p-5">
              <p className="text-sm leading-6 text-nature-50/95">{description}</p>
            </div>

            <button
              onClick={() => setLang((l) => (l === "en" ? "si" : "en"))}
              className="rounded-2xl px-5 py-3 bg-white/10 text-nature-50 font-medium hover:bg-white/15 border border-white/10 transition-colors"
            >
              {lang === "en" ? "Translate to Sinhala" : "Show English"}
            </button>

            <div className="text-xs text-nature-200/80">
              Tip: use ← / → keys to change images.
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

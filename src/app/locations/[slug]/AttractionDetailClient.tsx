"use client";

import Image from "next/image";
import { useState } from "react";
import type { NearbyLocation } from "@/data/nearbyLocations";
import {
  Languages,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Check,
  Navigation as CompassIcon,
  Bike,
  Car,
  Footprints,
} from "lucide-react";

interface AttractionDetailClientProps {
  location: NearbyLocation;
  distanceKm: number;
  driveMinutes: number;
  googleMapsUrl: string;
}

export default function AttractionDetailClient({
  location,
  distanceKm,
  driveMinutes,
  googleMapsUrl,
}: AttractionDetailClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "si">("en");
  const [copied, setCopied] = useState(false);

  const images = location.images ?? [];
  const hasMultipleImages = images.length > 1;

  const cycleMinutes = Math.max(5, Math.round((distanceKm / 12) * 60));
  const walkMinutes = Math.max(8, Math.round((distanceKm / 4.5) * 60));

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const nextImage = () => {
    if (images.length === 0) return;
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length === 0) return;
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-8">
      {/* Visual Gallery */}
      <div className="overflow-hidden rounded-3xl border border-nature-700/60 bg-nature-900/60 backdrop-blur-md">
        {images.length > 0 ? (
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-nature-950">
            <Image
              src={images[activeImageIndex]}
              alt={`${location.name} in Polonnaruwa, Sri Lanka - photo ${activeImageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 850px"
              priority
            />

            {/* Top Toolbar overlay */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-full bg-nature-950/75 px-3.5 py-1.5 text-xs font-medium text-nature-100 backdrop-blur-md transition-all hover:bg-nature-900 border border-white/10"
                aria-label="Share attraction page"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-nature-950/75 p-2 text-nature-100 backdrop-blur-md transition-all hover:bg-nature-900 border border-white/10"
                aria-label="Open fullscreen photo"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>

            {/* Navigation Arrows for primary image */}
            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-nature-950/70 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-nature-900 border border-white/15"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-nature-950/70 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-nature-900 border border-white/15"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-3 left-3 rounded-full bg-nature-950/80 px-3 py-1 text-xs text-nature-200 backdrop-blur-md border border-white/10">
              Photo {activeImageIndex + 1} of {images.length}
            </div>
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center bg-nature-950 text-sm text-nature-400">
            No gallery images available
          </div>
        )}

        {/* Thumbnails row */}
        {hasMultipleImages && (
          <div className="flex gap-2.5 overflow-x-auto p-4 border-t border-nature-800/80">
            {images.map((img, idx) => (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  idx === activeImageIndex
                    ? "border-nature-300 ring-2 ring-nature-300/30 scale-102"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                aria-label={`View photo ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Narrative & Language Toggle Section */}
      <div className="rounded-3xl border border-nature-700/60 bg-nature-900/60 p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-nature-800 pb-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-nature-300">
              Landmark Narrative
            </span>
            <h2 className="font-serif text-2xl text-nature-50 mt-1">
              Historical & Architectural Significance
            </h2>
          </div>

          <div className="inline-flex rounded-full border border-nature-700 bg-nature-950/80 p-1">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                language === "en"
                  ? "bg-nature-600 text-white shadow-xs"
                  : "text-nature-300 hover:text-white"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage("si")}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                language === "si"
                  ? "bg-nature-600 text-white shadow-xs"
                  : "text-nature-300 hover:text-white"
              }`}
            >
              <Languages className="h-3 w-3" />
              <span>සිංහල (Sinhala)</span>
            </button>
          </div>
        </div>

        <div className="mt-6">
          <p
            className={`leading-relaxed text-nature-100/95 transition-opacity duration-200 ${
              language === "si"
                ? "text-base md:text-lg leading-loose font-sans"
                : "text-base md:text-lg leading-relaxed"
            }`}
          >
            {language === "en" ? location.description.en : location.description.si}
          </p>
        </div>
      </div>

      {/* Getting There from ISARA Residence */}
      <div className="rounded-3xl border border-nature-700/60 bg-nature-900/60 p-6 md:p-8 backdrop-blur-md">
        <h3 className="font-serif text-xl md:text-2xl text-nature-50 mb-2">
          Travel Times From ISARA Residence
        </h3>
        <p className="text-xs md:text-sm text-nature-300 mb-6">
          Located {distanceKm.toFixed(1)} km from our doorstep in Polonnaruwa, easily accessible via bicycle, tuk-tuk, or car.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3.5 rounded-2xl border border-nature-800 bg-nature-950/60 p-4">
            <div className="rounded-xl bg-nature-500/20 p-2.5 text-nature-300">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-nature-400">By Car / Tuk-Tuk</p>
              <p className="text-base font-semibold text-nature-50">~{driveMinutes} mins</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-nature-800 bg-nature-950/60 p-4">
            <div className="rounded-xl bg-nature-500/20 p-2.5 text-nature-300">
              <Bike className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-nature-400">By Bicycle</p>
              <p className="text-base font-semibold text-nature-50">~{cycleMinutes} mins</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-nature-800 bg-nature-950/60 p-4">
            <div className="rounded-xl bg-nature-500/20 p-2.5 text-nature-300">
              <Footprints className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-nature-400">Walking</p>
              <p className="text-base font-semibold text-nature-50">~{walkMinutes} mins</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-nature-500 px-5 py-3 text-sm font-semibold text-nature-950 transition-all hover:bg-nature-400 hover:shadow-lg"
          >
            <CompassIcon className="h-4 w-4" />
            <span>Open Directions In Google Maps</span>
          </a>
          <span className="text-xs text-nature-400">
            Coordinates: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
              aria-label="Close photo preview"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative aspect-[16/10] w-full max-h-[80vh] overflow-hidden rounded-2xl bg-black">
              <Image
                src={images[activeImageIndex]}
                alt={location.name}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>

            {hasMultipleImages && (
              <div className="mt-4 flex items-center gap-4 text-white">
                <button
                  type="button"
                  onClick={prevImage}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition-colors"
                >
                  &larr; Previous
                </button>
                <span className="text-xs text-nature-300">
                  {activeImageIndex + 1} / {images.length}
                </span>
                <button
                  type="button"
                  onClick={nextImage}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition-colors"
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

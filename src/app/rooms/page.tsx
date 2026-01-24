"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import { rooms } from "@/data/rooms";

export default function RoomsPage() {
  const [openRoom, setOpenRoom] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getDefaultDates = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    return {
      checkIn: tomorrow.toISOString().split('T')[0],
      checkOut: dayAfter.toISOString().split('T')[0],
    };
  };

  const orderedRooms = useMemo(() => rooms.slice(0, 4), []);

  const openRoomData = useMemo(
    () => rooms.find((room) => room.id === openRoom) ?? null,
    [openRoom]
  );

  const galleryImages = useMemo(() => {
    if (!openRoomData) return [];
    return Array.from({ length: openRoomData.imageCount }, (_, i) => (
      `/images/rooms/${openRoomData.galleryFolder}/${i + 1}.jpg`
    ));
  }, [openRoomData]);

  // Autoplay carousel when modal is open
  const autoplayRef = useRef<number | null>(null);
  useEffect(() => {
    if (!openRoom || galleryImages.length <= 1) return;
    autoplayRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4500);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
  }, [openRoom, galleryImages.length]);

  // swipe support
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 30) {
      if (dx < 0) setActiveIndex((p) => (p + 1) % galleryImages.length);
      else setActiveIndex((p) => (p - 1 + galleryImages.length) % galleryImages.length);
    }
    touchStartX.current = null;
  };


  return (
    <main
      className="relative min-h-screen text-nature-900 font-sans selection:bg-nature-300 selection:text-nature-900"
      style={{ border: "3px solid #2563EB" }}
    >

      {/* Background image (blurred) + blue tint overlay */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/room-bg.jpg')", filter: "blur(3px)" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(3,37,65,0.24)" }} />
      </div>
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 pt-36 pb-20">
        

        {/* 2x2 grid */}
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          {orderedRooms.map((room) => (
            <div
              key={room.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                setActiveIndex(0);
                setOpenRoom(room.id);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveIndex(0);
                  setOpenRoom(room.id);
                }
              }}
              className="room-card group relative aspect-[4/3] overflow-hidden transition"
            >
              <div className="absolute inset-0">
                <Image
                  src={`/images/rooms/${room.galleryFolder}/1.jpg`}
                  alt={room.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition"
                />
                <div className="absolute inset-0 card-overlay" />
              </div>

                <div className="relative z-10 p-4 flex flex-col justify-between h-full room-card-meta">
                <div>
                  <h3 className="font-serif text-lg">{room.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((a) => (
                    <span key={a} className="text-[11px] bg-white/95 rounded-full px-2 py-1 text-nature-900">
                      {a}
                    </span>
                  ))}
                </div>
                
                {/* Book Now button (bottom-right) - uses same default date logic as Hero quick book */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const { checkIn, checkOut } = getDefaultDates();
                    const url = `https://www.booking.com/hotel/lk/isara-guest-polonnaruwa.en-gb.html?checkin=${checkIn}&checkout=${checkOut}`;
                    const a = document.createElement('a');
                    a.href = url;
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                  className="absolute right-4 bottom-4 z-20 bg-white/90 text-nature-900 px-3 py-2 rounded-lg text-sm hover:scale-105 transition-transform"
                >
                  Book Now
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Gallery */}
      {openRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative max-w-7xl w-full mx-4">
            <button
              onClick={() => {
                setActiveIndex(0);
                setOpenRoom(null);
              }}
              className="absolute right-3 top-3 z-20 rounded-full bg-white/90 px-3 py-1 text-sm"
            >
              Close
            </button>

            <div className="bg-white/5 p-6 rounded-2xl backdrop-blur shadow-lg">
              <h2 className="text-white font-serif text-2xl mb-4">
                {openRoomData?.title || "Gallery"}
              </h2>

              {/* Slider gallery */}
              {galleryImages.length > 0 && (
                <div
                  className="relative mx-auto w-full max-w-6xl overflow-visible rounded-2xl bg-black/10"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="mx-auto flex items-center justify-center gap-6 px-6 py-6">
                    {/* Left decorative preview */}
                    {galleryImages.length > 1 && (
                      <div className="pointer-events-none relative h-[60vh] w-[22%] overflow-hidden rounded-xl shadow-2xl transform-gpu transition-all duration-700">
                        <Image
                          src={galleryImages[(activeIndex - 1 + galleryImages.length) % galleryImages.length]}
                          alt="Previous room view"
                          fill
                          className="object-cover scale-110 opacity-70 grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                      </div>
                    )}

                    {/* Main image */}
                    <div className="relative h-[60vh] w-[44%] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/30 transform-gpu transition-all duration-700">
                      <Image
                        src={galleryImages[activeIndex]}
                        alt={openRoomData?.title ?? "Room"}
                        fill
                        sizes="(min-width: 1024px) 44vw, 90vw"
                        className="object-cover object-center scale-100 transition-transform duration-700"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />
                      <div className="absolute left-4 bottom-4 z-10 bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm">
                        {openRoomData?.title} — {activeIndex + 1}/{galleryImages.length}
                      </div>
                    </div>

                    {/* Right decorative preview */}
                    {galleryImages.length > 1 && (
                      <div className="pointer-events-none relative h-[60vh] w-[22%] overflow-hidden rounded-xl shadow-2xl transform-gpu transition-all duration-700">
                        <Image
                          src={galleryImages[(activeIndex + 1) % galleryImages.length]}
                          alt="Next room view"
                          fill
                          className="object-cover scale-110 opacity-70 grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
                      </div>
                    )}
                  </div>

                  {/* Arrows and indicators */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
                        }
                        className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-nature-900 shadow-2xl transition hover:scale-105"
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => setActiveIndex((prev) => (prev + 1) % galleryImages.length)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-nature-900 shadow-2xl transition hover:scale-105"
                        aria-label="Next image"
                      >
                        ›
                      </button>

                      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex gap-2">
                        {galleryImages.map((_, i) => (
                          <button
                            key={i}
                            aria-label={`Go to image ${i + 1}`}
                            onClick={() => setActiveIndex(i)}
                            className={`h-2 w-8 rounded-full transition-all ${i === activeIndex ? 'bg-white/90 w-10' : 'bg-white/30'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

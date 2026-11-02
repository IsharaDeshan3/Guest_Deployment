"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { rooms } from "@/data/rooms";
import { getWhatsAppRoomUrl } from "@/lib/whatsapp";
import { MessageSquare, ExternalLink, Wifi, Check, Clock } from "lucide-react";

export default function RoomsPage() {
  const [openRoom, setOpenRoom] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultDates = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    return {
      today,
      checkIn: tomorrow.toISOString().split("T")[0],
      checkOut: dayAfter.toISOString().split("T")[0],
    };
  }, []);

  const [checkInDate, setCheckInDate] = useState(defaultDates.checkIn);
  const [checkOutDate, setCheckOutDate] = useState(defaultDates.checkOut);

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

  const handleBookingCom = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `https://www.booking.com/hotel/lk/isara-guest-polonnaruwa.en-gb.html?checkin=${checkInDate}&checkout=${checkOutDate}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleWhatsApp = (roomTitle: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = getWhatsAppRoomUrl({
      roomType: roomTitle,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };


  return (
    <main
      className="relative min-h-screen text-nature-900 font-sans selection:bg-nature-300 selection:text-nature-900"
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
        <header className="mb-8 rounded-3xl border border-white/20 bg-black/40 p-6 sm:p-8 text-white backdrop-blur-md shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs uppercase tracking-widest text-nature-200 mb-3">
                Polonnaruwa Accommodation
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl">Rooms at ISARA Residence</h1>
              <p className="mt-3 max-w-2xl text-sm md:text-base text-white/90 leading-relaxed">
                Choose from clean air-conditioned and non-AC rooms with private attached bathrooms, hot water, and peaceful garden surroundings near the ancient city and Parakrama Samudra.
              </p>
            </div>
            
            <div className="flex flex-wrap md:flex-col gap-3 text-xs text-white/80 border-t md:border-t-0 md:border-l border-white/15 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-nature-300" />
                <span>Check-in: <strong>3:00 PM (15:00)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-nature-300" />
                <span>Check-out: <strong>10:00 AM (10:00)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-nature-300" />
                <span>Free High-Speed Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-nature-300" />
                <span>Breakfast optional upon request</span>
              </div>
            </div>
          </div>

          {/* Interactive Date Bar */}
          <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs uppercase tracking-wider text-nature-200 font-semibold mb-1.5">
                Check-in Date (from 15:00)
              </label>
              <input
                type="date"
                min={defaultDates.today}
                value={checkInDate}
                onChange={(e) => {
                  setCheckInDate(e.target.value);
                  if (e.target.value >= checkOutDate) {
                    const next = new Date(e.target.value);
                    next.setDate(next.getDate() + 1);
                    setCheckOutDate(next.toISOString().split("T")[0]);
                  }
                }}
                className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-nature-200 font-semibold mb-1.5">
                Check-out Date (by 10:00)
              </label>
              <input
                type="date"
                min={checkInDate || defaultDates.today}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white transition-all"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleBookingCom}
                className="w-full bg-white hover:bg-nature-100 text-nature-950 font-semibold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Check on Booking.com</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {orderedRooms.map((room) => (
            <div key={room.id} className="relative rounded-3xl overflow-hidden border border-white/20 bg-black/30 backdrop-blur-sm shadow-xl flex flex-col justify-between">
              {/* Image & Click for Gallery */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActiveIndex(0);
                  setOpenRoom(room.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveIndex(0);
                    setOpenRoom(room.id);
                  }
                }}
                className="group relative aspect-[16/10] overflow-hidden cursor-pointer"
              >
                <Image
                  src={`/images/rooms/${room.galleryFolder}/1.jpg`}
                  alt={`ISARA Residence ${room.title} in Polonnaruwa with ${room.amenities.join(", ")}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Title badge */}
                <div className="absolute left-4 top-4 z-20">
                  <span className="font-serif bg-nature-950/85 text-nature-50 border border-white/20 px-3.5 py-1.5 rounded-xl shadow-md text-sm sm:text-base backdrop-blur-sm">
                    {room.title}
                  </span>
                </div>

                <div className="absolute right-4 bottom-4 z-20">
                  <span className="text-[11px] uppercase tracking-wider bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full backdrop-blur-md transition-all">
                    View Photos ({room.imageCount}) &rarr;
                  </span>
                </div>
              </div>

              {/* Card Meta & Action Buttons */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((a) => (
                    <span key={a} className="text-xs bg-white/10 text-white/90 border border-white/15 rounded-lg px-2.5 py-1">
                      {a}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={(e) => handleWhatsApp(room.title, e)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const url = `https://www.booking.com/hotel/lk/isara-guest-polonnaruwa.en-gb.html?checkin=${checkInDate}&checkout=${checkOutDate}`;
                      window.open(url, "_blank", "noopener,noreferrer");
                    }}
                    className="w-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-medium py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Booking.com</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 rounded-3xl border border-white/20 bg-black/30 p-6 sm:p-8 backdrop-blur-md text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl">Looking for Events or Small Gatherings?</h3>
            <p className="mt-2 text-sm text-white/80 max-w-xl">
              ISARA Residence also accommodates small parties, private dinners, and business meetings with peaceful Parakrama Samudra backyard views.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/events"
              className="px-5 py-3 rounded-xl bg-white hover:bg-nature-100 text-nature-950 font-semibold text-xs uppercase tracking-wider transition-all whitespace-nowrap"
            >
              Explore Events
            </Link>
            <Link
              href="/contact"
              className="px-5 py-3 rounded-xl border border-white/30 hover:border-white text-white font-medium text-xs uppercase tracking-wider transition-all whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Modal Gallery */}
      {openRoom && openRoomData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => {
            setActiveIndex(0);
            setOpenRoom(null);
          }}
        >
          <div
            className="relative max-w-5xl w-full my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-nature-950/95 border border-white/20 p-4 sm:p-6 rounded-3xl shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-white font-serif text-xl sm:text-2xl">
                    {openRoomData.title}
                  </h2>
                  <p className="text-xs text-nature-300 uppercase tracking-wider mt-1">
                    {openRoomData.amenities.join(" • ")}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveIndex(0);
                    setOpenRoom(null);
                  }}
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white p-2.5 transition-colors"
                  aria-label="Close gallery"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Slider gallery */}
              {galleryImages.length > 0 && (
                <div
                  className="relative mx-auto w-full overflow-hidden rounded-2xl bg-black/40"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="relative h-[45vh] sm:h-[55vh] w-full">
                    <Image
                      src={galleryImages[activeIndex]}
                      alt={`ISARA Residence ${openRoomData.title} in Polonnaruwa - Photo ${activeIndex + 1}`}
                      fill
                      sizes="(min-width: 1024px) 80vw, 95vw"
                      className="object-cover object-center transition-all duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute left-4 bottom-4 z-10 bg-black/60 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-lg text-xs">
                      Photo {activeIndex + 1} of {galleryImages.length}
                    </div>
                  </div>

                  {/* Arrows */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/80 text-white p-3 backdrop-blur-sm transition-transform hover:scale-105"
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => setActiveIndex((prev) => (prev + 1) % galleryImages.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/80 text-white p-3 backdrop-blur-sm transition-transform hover:scale-105"
                        aria-label="Next image"
                      >
                        ›
                      </button>

                      <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex gap-1.5">
                        {galleryImages.map((_, i) => (
                          <button
                            key={i}
                            aria-label={`Go to image ${i + 1}`}
                            onClick={() => setActiveIndex(i)}
                            className={`h-1.5 rounded-full transition-all ${i === activeIndex ? "bg-white w-6" : "bg-white/40 w-2"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Inquiry actions inside modal */}
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-white/70">
                  Dates: <strong>{checkInDate}</strong> to <strong>{checkOutDate}</strong>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={(e) => handleWhatsApp(openRoomData.title, e)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Inquire on WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleBookingCom}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-nature-100 text-nature-950 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                  >
                    <span>Booking.com</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                  <Link
                    href={`/contact?type=room_booking&room=${encodeURIComponent(openRoomData.title)}`}
                    onClick={() => setOpenRoom(null)}
                    className="px-4 py-2.5 rounded-xl border border-white/30 hover:border-white text-white text-xs font-medium uppercase tracking-wider"
                  >
                    Contact Form
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

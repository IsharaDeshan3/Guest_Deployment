"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import { getWhatsAppRoomUrl } from "@/lib/whatsapp";

// Quick Book Card Component with Expandable Booking Interface - Portal Version

interface QuickBookCardProps {
  roomType: string;
  amenitiesText: string;
  image: string;
  isExpanded: boolean;
  isAnyExpanded: boolean;
  onToggle: () => void;
}

function getDefaultDates() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);

  return {
    today: new Date().toISOString().split("T")[0],
    checkIn: tomorrow.toISOString().split("T")[0],
    checkOut: dayAfter.toISOString().split("T")[0],
  };
}

function QuickBookCard({ roomType, amenitiesText, image, isExpanded, isAnyExpanded, onToggle }: QuickBookCardProps) {
  const defaultDates = getDefaultDates();
  const [isHovered, setIsHovered] = useState(false);
  const [checkInDate, setCheckInDate] = useState(defaultDates.checkIn);
  const [checkOutDate, setCheckOutDate] = useState(defaultDates.checkOut);

  const handleBookNow = () => {
    const url = `https://www.booking.com/hotel/lk/isara-guest-polonnaruwa.en-gb.html?checkin=${checkInDate}&checkout=${checkOutDate}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsApp = () => {
    const url = getWhatsAppRoomUrl({
      roomType,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // The Card Content for Expanded State
  const ExpandedCardContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Click outside to close area with dark backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500" 
        onClick={onToggle} 
      />
      
      <div 
        className={`relative w-[92vw] sm:w-[500px] max-w-full overflow-hidden rounded-[32px] backdrop-blur-2xl bg-white/20 border-2 border-white/50 shadow-2xl transition-all duration-500 transform
                   ${isExpanded ? 'scale-100 opacity-100 translate-x-0' : 'scale-95 opacity-0 translate-x-20'}`}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-nature-900/80 to-nature-800/60" />
        </div>

        {/* Content */}
        <div className="relative p-6 sm:p-8">
           {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h4 className="text-white font-bold text-2xl sm:text-3xl mb-1 drop-shadow-lg">{roomType}</h4>
              <p className="text-white/80 text-xs sm:text-sm uppercase tracking-wider">{amenitiesText}</p>
            </div>
            <button 
              onClick={onToggle}
              className="text-white/70 hover:text-white transition-colors hover:rotate-90 duration-300 bg-white/10 rounded-full p-2"
              aria-label="Close booking modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Date Selection */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/90 text-xs uppercase tracking-wider mb-2 block font-bold">Check-in (from 15:00)</label>
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
                  className="w-full bg-white/15 border border-white/30 rounded-xl px-4 py-3 text-white text-base
                            focus:bg-white/25 focus:border-white/60 focus:outline-none transition-all
                            hover:bg-white/20"
                />
              </div>
              <div>
                <label className="text-white/90 text-xs uppercase tracking-wider mb-2 block font-bold">Check-out (by 10:00)</label>
                <input 
                  type="date"
                  min={checkInDate || defaultDates.today}
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full bg-white/15 border border-white/30 rounded-xl px-4 py-3 text-white text-base
                            focus:bg-white/25 focus:border-white/60 focus:outline-none transition-all
                            hover:bg-white/20"
                />
              </div>
            </div>
          </div>

          {/* Direct Booking & Inquiry Options */}
          <div className="space-y-3">
            <button
              onClick={handleBookNow}
              className="w-full bg-white text-nature-950 font-bold py-3.5 px-6 rounded-xl
                        hover:bg-nature-200 transition-all duration-300
                        uppercase tracking-wider text-xs sm:text-sm shadow-xl hover:scale-[1.01]
                        transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Book on Booking.com</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl
                        transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm shadow-xl hover:scale-[1.01]
                        transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Inquire via WhatsApp</span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
              </svg>
            </button>

            <Link
              href={`/contact?type=room_booking&room=${encodeURIComponent(roomType)}`}
              onClick={onToggle}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium py-3 px-6 rounded-xl
                        transition-all duration-300 uppercase tracking-wider text-xs text-center block"
            >
              Send Website Inquiry Form
            </Link>
          </div>

          {/* Quick Info */}
          <p className="text-white/60 text-[11px] text-center mt-4 tracking-wide font-normal">
            Check-in: 3:00 PM • Check-out: 10:00 AM • Free Wi-Fi • Optional Breakfast
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Collapsed Card (Always rendered in the list) */}
      <div 
        className={`group relative overflow-hidden transition-all duration-500 cursor-pointer
                   bg-white/10 border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]
                   rounded-tl-[32px] rounded-br-[32px] rounded-tr-lg rounded-bl-lg
                   min-h-[64px]
                   ${isExpanded ? 'opacity-0 pointer-events-none absolute' : 'opacity-100 relative'}
                   ${!isExpanded && isAnyExpanded ? 'opacity-30 blur-[1px] scale-95 grayscale' : 'hover:bg-white/15 hover:border-white/30 hover:scale-[1.02] hover:shadow-xl'}
                   `}
        onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => !isExpanded && setIsHovered(false)}
        onClick={onToggle}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 transition-opacity duration-500 opacity-20 group-hover:opacity-30">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-nature-900/60 to-nature-800/40" />
        </div>

        {/* Room Info */}
        <div className="relative p-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-white font-medium text-base mb-1 drop-shadow-lg">{roomType}</h4>
            <p className="text-white/70 text-xs uppercase tracking-wider">{amenitiesText}</p>
          </div>
          <span className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-white/90 group-hover:bg-white group-hover:text-nature-950 transition-all">
            Inquire
          </span>
        </div>

        {/* Hover Indicator */}
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent 
                        transition-opacity duration-500 ${isHovered ? 'opacity-60' : 'opacity-0'}`} />
      </div>

      {/* Expanded Portal */}
      {isExpanded && createPortal(ExpandedCardContent, document.body)}
    </>
  );
}



export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [nightIntensity, setNightIntensity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Calculate mouse position relative to window width
    // 0 = Left (Day), 1 = Right (Night)
    // We start the transition at 40% width and finish at 80% for a smooth effect
    const width = window.innerWidth;
    const x = e.clientX;
    const rawProgress = x / width;
    
    // Smooth transition logic:
    // Left 0-40%: Pure Day (0)
    // 40%-80%: Transition
    // 80%+: Pure Night (1)
    const intensity = Math.min(Math.max((rawProgress - 0.4) * 2.5, 0), 1);
    
    setNightIntensity(intensity);

    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Optional: reset to day or keep last state? Let's smoothly return to day
    setNightIntensity(0);
  };

  const toggleCard = (roomType: string) => {
    setExpandedCard(expandedCard === roomType ? null : roomType);
  };

  return (
    <section 
      className="relative min-h-[80vh] md:h-screen w-full flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image with Subtle Overlay */}
      <div className="absolute inset-0 w-full h-full">
      {/* Optimized hero image for faster LCP */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpeg"
          alt="Scenic view near ISARA Residence in Polonnaruwa"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
        
        {/* Dynamic Day/Night Cycle Overlay */}
        {/* Dark overlay that increases opacity as mouse moves right (plus a subtle +2% base darkening) */}
        <div 
          className="absolute inset-0 bg-black/80 transition-opacity duration-700 ease-out pointer-events-none"
          style={{ opacity: Math.min(nightIntensity * 0.85 + 0.02, 1) }} 
        />
        
        {/* Stars Layer - only visible during night phase */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ease-out"
          style={{
            opacity: nightIntensity,
            maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 55%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 55%)',
          }}
        >
          <div
            className="stars-layer absolute inset-0 transition-transform duration-1000"
            style={{ transform: `translate(${nightIntensity * 8}%, ${-nightIntensity * 8}%)` }}
          >
            <div className="star star-1" />
            <div className="star star-2" />
            <div className="star star-3" />
            <div className="star star-4" />
            <div className="star star-5" />
            <div className="star star-6" />
            <div className="star star-7" />
            <div className="star star-8" />
          </div>
        </div>
        
        {/* Blue Moonlight Tint - adds a cool blue hue at night */}
        <div 
          className="absolute inset-0 bg-blue-900/20 mix-blend-overlay transition-opacity duration-700 pointer-events-none"
          style={{ opacity: nightIntensity }}
        />
        
        {/* Subtle gradient overlay for text readability (always present but slightly stronger at night) */}
        <div className="absolute inset-0 bg-gradient-to-b from-nature-900/20 via-transparent to-nature-900/40" />
        
        {/* Focus Light / Spotlight Effect */}
        {isHovering && (
          <div 
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.10), transparent 40%)`,
              opacity: 1
            }}
          />
        )}
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center top-6 lg:justify-between px-6 md:px-12 lg:px-20 pt-24 lg:pt-0">
        {/* Left Side - Hero Text */}
        <div className="flex-1 text-white max-w-2xl text-center lg:text-left">
          <p className="text-nature-100 uppercase tracking-[0.3em] mb-4 text-xs sm:text-sm md:text-base font-light animate-fade-in">
            Polonnaruwa, Sri Lanka
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-6 leading-tight drop-shadow-2xl">
            Polonnaruwa Hotels &amp; Guest House – <span className="italic text-nature-200">ISARA Residence</span>
          </h1>
          <p className="max-w-xl mx-auto lg:mx-0 text-nature-50/90 text-sm sm:text-base md:text-lg mb-8 font-light leading-relaxed drop-shadow-lg">
            A peaceful sanctuary among hotels in Polonnaruwa, nestled near the ancient city and Parakrama Samudraya. Offering air-conditioned rooms, lush garden views, hot water, and authentic Sri Lankan hospitality.
          </p>
          <Link 
            href="/rooms" 
            className="inline-block border-2 border-white/40 bg-white/10 backdrop-blur-md px-8 sm:px-10 py-3 sm:py-4 tap-target mx-auto lg:mx-0
                       uppercase tracking-widest text-[11px] sm:text-sm hover:bg-white hover:text-nature-900 hover:border-white
                       transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-white/20"
          >
            Explore Rooms &amp; Rates
          </Link>
        </div>

        {/* Right Side - Quick Booking Cards */}
        <div className="flex flex-col gap-4 w-full max-w-md mt-10 lg:mt-0 lg:w-80 xl:w-96">
          <h2 className="text-white/90 text-sm uppercase tracking-[0.2em] mb-2 font-light text-center lg:text-left">
            Polonnaruwa Accommodation &amp; Rooms
          </h2>
          
          {/* Room Cards */}
          <QuickBookCard 
            roomType="Deluxe Double Room"
            amenitiesText="AC • Hot Water • Private Bath"
            image="/images/rooms/deluxe_double/1.jpg"
            isExpanded={expandedCard === "Deluxe Double Room"}
            isAnyExpanded={!!expandedCard}
            onToggle={() => toggleCard("Deluxe Double Room")}
          />
          <QuickBookCard 
            roomType="Double Room Non AC"
            amenitiesText="Non AC • Private Bath • Garden Breeze"
            image="/images/rooms/double_non_ac/1.jpg"
            isExpanded={expandedCard === "Double Room Non AC"}
            isAnyExpanded={!!expandedCard}
            onToggle={() => toggleCard("Double Room Non AC")}
          />
          <QuickBookCard 
            roomType="Family Room"
            amenitiesText="Spacious Family Suite • AC • Private Bath"
            image="/images/rooms/family_room_1/1.jpg"
            isExpanded={expandedCard === "Family Room"}
            isAnyExpanded={!!expandedCard}
            onToggle={() => toggleCard("Family Room")}
          />
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest">Explore</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}


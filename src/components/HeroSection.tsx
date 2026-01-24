"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Quick Book Card Component with Expandable Booking Interface - Portal Version
import { createPortal } from 'react-dom';
// import HeroRipple from "./HeroRipple";

interface QuickBookCardProps {
  roomType: string;
  price: string;
  capacity: string;
  image: string;
  isExpanded: boolean;
  isAnyExpanded: boolean;
  onToggle: () => void;
}

function QuickBookCard({ roomType, price, capacity, image, isExpanded, isAnyExpanded, onToggle }: QuickBookCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [mounted, setMounted] = useState(false);
  // Track animation mounting for smooth portal entry
  const [showPortal, setShowPortal] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set default dates
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    setCheckInDate(tomorrow.toISOString().split('T')[0]);
    setCheckOutDate(dayAfter.toISOString().split('T')[0]);
  }, []);

  // Handle smooth transition for portal
  useEffect(() => {
    if (isExpanded) {
      setShowPortal(true);
    } else {
      // Delay unmounting for exit animation if we were managing own state
      // But since parent controls isExpanded, we sync directly. 
      // For smoother exit, we'd need a delay, but let's keep it snappy for responsiveness first.
      setShowPortal(false);
    }
  }, [isExpanded]);

  const handleBookNow = () => {
    // Open booking.com via an anchor click to improve reliability with popup blockers
    const url = `https://www.booking.com/hotel/lk/isara-guest-polonnaruwa.en-gb.html?checkin=${checkInDate}&checkout=${checkOutDate}`;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
        <div className="relative p-8">
           {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h4 className="text-white font-bold text-3xl mb-2 drop-shadow-lg">{roomType}</h4>
              <p className="text-white/80 text-sm uppercase tracking-wider">{capacity}</p>
            </div>
            <button 
              onClick={onToggle}
              className="text-white/70 hover:text-white transition-colors hover:rotate-90 duration-300 bg-white/10 rounded-full p-2"
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
                <label className="text-white/90 text-xs uppercase tracking-wider mb-2 block font-bold">Check-in</label>
                <input 
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full bg-white/15 border border-white/30 rounded-xl px-4 py-3 text-white text-sm
                            focus:bg-white/25 focus:border-white/60 focus:outline-none transition-all
                            hover:bg-white/20"
                />
              </div>
              <div>
                <label className="text-white/90 text-xs uppercase tracking-wider mb-2 block font-bold">Check-out</label>
                <input 
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full bg-white/15 border border-white/30 rounded-xl px-4 py-3 text-white text-sm
                            focus:bg-white/25 focus:border-white/60 focus:outline-none transition-all
                            hover:bg-white/20"
                />
              </div>
            </div>
          </div>

            {/* (Price removed from expanded quick-book card per request) */}

          {/* Book Now Button */}
          <button
            onClick={handleBookNow}
            className="w-full bg-white text-black font-bold py-4 px-6 rounded-xl
                      hover:bg-nature-200 hover:text-nature-900 transition-all duration-300
                      uppercase tracking-wider text-base shadow-2xl hover:shadow-white/20 hover:scale-[1.02]
                      transform active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Book Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          {/* Quick Info */}
          <p className="text-white/50 text-[10px] text-center mt-4 uppercase tracking-wide font-medium">
            ✓ Instant confirmation • Best rate guaranteed
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

        {/* Room Info (price hidden) */}
        <div className="relative p-4 flex items-center gap-4">
          <div className="flex-1">
            <h4 className="text-white font-medium text-base mb-1 drop-shadow-lg">{roomType}</h4>
            <p className="text-white/70 text-xs uppercase tracking-wider">{capacity}</p>
          </div>
        </div>

        {/* Hover Indicator */}
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent 
                        transition-opacity duration-500 ${isHovered ? 'opacity-60' : 'opacity-0'}`} />
      </div>

      {/* Expanded Portal */}
      {mounted && isExpanded && createPortal(ExpandedCardContent, document.body)}
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
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image with Subtle Overlay */}
      <div className="absolute inset-0 w-full h-full">
      {/* Background Image - Static Replacement for Ripple */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url(/hero-bg.jpeg)' }}
      />
        
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
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight drop-shadow-2xl">
            Experience <br/> <span className="italic text-nature-200">Serenity</span>
          </h1>
          <p className="max-w-xl mx-auto lg:mx-0 text-nature-50/90 text-sm sm:text-base md:text-lg mb-8 font-light leading-relaxed drop-shadow-lg">
            A peaceful sanctuary nestled in the heart of the ancient city, 
            where history meets the calm waters of Parakrama Samudraya.
          </p>
          <Link 
            href="/rooms" 
            className="inline-block border-2 border-white/40 bg-white/10 backdrop-blur-md px-8 sm:px-10 py-3 sm:py-4 
                       uppercase tracking-widest text-[11px] sm:text-sm hover:bg-white hover:text-nature-900 hover:border-white
                       transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-white/20"
          >
            View All Rooms
          </Link>
        </div>

        {/* Right Side - Quick Booking Cards */}
        <div className="hidden lg:flex flex-col gap-4 w-80 xl:w-96">
          <h3 className="text-white/90 text-sm uppercase tracking-[0.2em] mb-2 font-light">Quick Book</h3>
          
          {/* Room Cards */}
          <QuickBookCard 
            roomType="Deluxe Double Room"
            price="LKR 5265"
            capacity="2 Guests"
            image="/deluxe-room.png"
            isExpanded={expandedCard === "Deluxe Room"}
            isAnyExpanded={!!expandedCard}
            onToggle={() => toggleCard("Deluxe Room")}
          />
          <QuickBookCard 
            roomType="Family Room"
            price="LKR 5791"
            capacity="4 Guests"
            image="/family-suite.png"
            isExpanded={expandedCard === "Family Room"}
            isAnyExpanded={!!expandedCard}
            onToggle={() => toggleCard("Family Room")}
          />
          <QuickBookCard 
            roomType="Garden View Room"
            price="LKR 5791"
            capacity="4 Guests"
            image="/deluxe-room.png"
            isExpanded={expandedCard === "Lake View Room"}
            isAnyExpanded={!!expandedCard}
            onToggle={() => toggleCard("Lake View Room")}
          />
          <QuickBookCard 
            roomType="Lake View Double Room"
            price="LKR 6813"
            capacity="2 Guests"
            image="/family-suite.png"
            isExpanded={expandedCard === "Lake View Double Room"}
            isAnyExpanded={!!expandedCard}
            onToggle={() => toggleCard("Lake View Double Room")}
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


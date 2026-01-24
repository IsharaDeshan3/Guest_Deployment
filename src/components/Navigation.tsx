"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const pathname = usePathname();

  const logoRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Detect when logo and center links overlap and switch to compact mode
  useEffect(() => {
    function checkOverlap() {
      const logoEl = logoRef.current;
      const centerEl = centerRef.current;
      if (!logoEl || !centerEl) return;
      const logoRect = logoEl.getBoundingClientRect();
      const centerRect = centerEl.getBoundingClientRect();
      // Add a small buffer (8px). If logo right touches center left, enable compact mode.
      setIsCompact(logoRect.right + 8 >= centerRect.left);
    }

    checkOverlap();
    const ro = new ResizeObserver(checkOverlap);
    ro.observe(document.documentElement);
    window.addEventListener('resize', checkOverlap);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', checkOverlap);
    };
  }, []);

  const items = ['About', 'Rooms', 'Locations', 'Restaurant', 'Contact'];

  const renderHref = (item: string) => {
    const section = item.toLowerCase();
    return item === 'About'
      ? '/about'
      : item === 'Locations'
        ? '/locations'
        : item === 'Restaurant'
          ? '/restaurant'
          : item === 'Rooms'
            ? '/rooms'
            : item === 'Contact'
              ? '/contact'
              : pathname === '/'
                ? `#${section}`
                : `/#${section}`;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[40] transition-all duration-700 ${isScrolled
      ? 'bg-gradient-to-b from-black/80 backdrop-blur-[3px] py-2'
      : 'bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px] py-6'
      }`}>
      <div className="max-w-8xl mx-auto px-6">

        <div className="w-full flex items-center justify-left relative">
          {/* Left: Logo */}
          <div ref={logoRef} className={`relative transition-all duration-500 ${isScrolled ? 'mb-2' : 'mb-6'} md:mb-0`}> 
            <Link href="/" className="group relative z-10 block">
              <h1 className="font-serif text-3xl md:text-5xl text-white tracking-wide drop-shadow-lg text-left">
                <span className="italic font-light text-nature-200">Isara</span> Residence
              </h1>
              <div className="absolute -inset-4 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </Link>
          </div>

          {/* Center: Desktop links (centered). Hidden when compact (overlap) or on small screens */}
          <div ref={centerRef} className={`${isCompact ? 'hidden' : 'md:flex'} absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
            <div className={`flex items-center gap-10 ${isScrolled ? 'md:text-xs' : 'md:text-sm'}`}>
              {items.map((item) => (
                <Link
                  key={item}
                  href={renderHref(item)}
                  className="relative text-white/80 hover:text-white uppercase tracking-[0.2em] text-[14px] md:text-[16px] font-light transition-colors duration-300 group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-nature-200 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Mobile / compact toggle positioned at the right edge of the nav (flush to viewport) */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className={`${isCompact ? 'inline-flex' : 'md:hidden inline-flex'} absolute right-5 top-1/2 transform -translate-y-1/2 z-50 items-center justify-center rounded-none border-0 bg-transparent p-0 text-white/90 transition hover:bg-white/5`}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile navigation dropdown */}
        <div className={`w-full md:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        >
          <div className="flex flex-col items-center gap-4 py-4">
            {items.map((item) => (
              <Link
                key={item}
                href={renderHref(item)}
                className="relative text-white/80 hover:text-white uppercase tracking-[0.2em] text-[11px] font-light transition-colors duration-300 group"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

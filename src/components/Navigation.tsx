"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

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

  // Close on Escape when drawer is open
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

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
      <div className="max-w-8xl mx-auto px-6 relative">

        <div className="w-full flex items-center justify-left relative">
          {/* Left: Logo */}
          <div className={`relative transition-all duration-500 ${isScrolled ? 'mb-2' : 'mb-6'} md:mb-0`}> 
            <Link href="/" className="group relative z-10 block">
              <h1 className="font-serif text-3xl md:text-5xl text-white tracking-wide drop-shadow-lg text-left">
                <span className="italic font-light text-nature-200">Isara</span> Residence
              </h1>
              <div className="absolute -inset-4 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </Link>
          </div>

          {/* Center: Desktop links (centered). Standard responsive: show on laptop+ only */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`flex items-center gap-6 xl:gap-10 ${isScrolled ? 'lg:text-xs' : 'lg:text-sm'}`}>
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

        {/* Right: Hamburger (mobile/tablet). Hidden on laptop+ */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((open) => !open);
          }}
          className="inline-flex lg:hidden absolute right-5 top-1/2 transform -translate-y-1/2 z-[70] items-center justify-center rounded-md border border-white/10 bg-white/10 p-2 text-white/90 transition hover:bg-white/20 tap-target"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-drawer"
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
        {/* Mobile navigation overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[50] lg:hidden" aria-hidden={!isMenuOpen}>
            <div
              className="absolute inset-0 "
              onClick={() => setIsMenuOpen(false)}
            />
            <div
              id="mobile-nav-drawer"
              className="absolute right-0 top-0 h-full w-[85%] max-w-[320px] bg-nature-950 border-l border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center px-5 py-5">
                <span className="text-xs uppercase tracking-[0.3em] text-nature-200">Menu</span>
              </div>

              <div className="flex flex-col gap-2 px-5 pb-6 bg-nature-950 backdrop-blur-sm">
                {items.map((item) => (
                  <Link
                    key={item}
                    href={renderHref(item)}
                    className="relative text-white/90 uppercase tracking-[0.2em] text-sm font-light transition-all duration-200 tap-target w-full justify-start rounded-md px-3 mobile-menu-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                <style>{`
                  .mobile-menu-link:hover, .mobile-menu-link:focus-visible {
                    background: rgba(255,255,255,1);
                    color: #1a202c;
                    backdrop-filter: blur(3px);
                    -webkit-backdrop-filter: blur(3px);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                  }
                `}</style>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

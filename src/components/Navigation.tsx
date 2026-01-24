"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[40] transition-all duration-700 ${isScrolled
      ? 'bg-gradient-to-b from-black/80 backdrop-blur-[3px] py-2'
      : 'bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px] py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">

        {/* Top Section: Logo */}
        <div className={`relative transition-all duration-500 ${isScrolled ? 'mb-2' : 'mb-6'}`}>
          <Link href="/" className="group relative z-10 block">
            <h1 className="font-serif text-3xl md:text-5xl text-white tracking-wide drop-shadow-lg text-center">
              <span className="italic font-light text-nature-200">Isara</span> Residence
            </h1>
            {/* Subtle glow behind text */}
            <div className="absolute -inset-4 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </Link>

          {/* Decorative accent lines flanking the logo (visible when not scrolled or subtle when scrolled) */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent -z-10 transition-all duration-500 ${isScrolled ? 'w-[110%] opacity-20' : 'opacity-50'
            }`} />
        </div>

        {/* Bottom Section: Navigation Items */}
        <div className={`flex items-center gap-8 md:gap-12 transition-all duration-500 ${isScrolled ? 'gap-6 text-xs' : 'text-sm'
          }`}>
          {/* Left Decorative Line */}
          <div className="hidden md:block w-12 h-[1px] bg-gradient-to-r from-transparent to-white/40" />

          <div className="flex items-center gap-6 md:gap-10">
            {['About', 'Rooms', 'Locations', 'Restaurant', 'Contact'].map((item) => {
              const section = item.toLowerCase();
              const href =
                item === 'About'
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

              return (
                <Link
                  key={item}
                  href={href}
                  className="relative text-white/80 hover:text-white uppercase tracking-[0.2em] font-light transition-colors duration-300 group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-nature-200 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </Link>
              );
            })}
          </div>

          {/* Right Decorative Line */}
          <div className="hidden md:block w-12 h-[1px] bg-gradient-to-l from-transparent to-white/40" />
        </div>
      </div>
    </nav>
  );
}

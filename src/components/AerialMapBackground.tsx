"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AerialMapBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("scale(1.1) translate(0px, 0px)");
  const [origin, setOrigin] = useState("50% 50%");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Calculate percentage position
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    // Set origin to the mouse position for "zoom into that side" effect
    setOrigin(`${xPercent}% ${yPercent}%`);
    
    // Scale up significantly to show "zoom"
    setTransform("scale(2)"); 
  };

  const handleMouseLeave = () => {
    // Reset to slightly zoomed out state
    setTransform("scale(1.1) translate(0px, 0px)");
    setOrigin("50% 50%");
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-nature-900 duration-700 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-out will-change-transform"
        style={{ 
          transform: transform,
          transformOrigin: origin
        }}
      >
        {/* Placeholder for Aerial View - Using a high quality Unsplash image of a tropical lake/forest from above */}
        <Image
          src="https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=2070&auto=format&fit=crop"
          alt="Aerial view of lush tropical forest and water"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
          priority
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-nature-900/40 mix-blend-multiply" />
      </div>
    </div>
  );
}

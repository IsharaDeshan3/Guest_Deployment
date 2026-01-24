"use client";

import { useRef } from "react";
import Image from "next/image";
import AerialMapBackground from './AerialMapBackground';
import NatureClouds from './NatureClouds';
import { motion, useScroll, useTransform } from "framer-motion";

const AboutSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the image column
    const yImage = useTransform(scrollYProgress, [0, 1], [100, -100]);
    // Parallax effect for the text card column (moves slower/inverse)
    const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);
    
    // Background opacity fade as you scroll away from the section
    // Not stricly needed if we want full bleed, but nice for integration.

    return (
    <section ref={containerRef} className="relative py-24 md:py-32 px-6 md:px-20 overflow-hidden bg-nature-900">
      
      {/* Aerial Map Simulation Background */}
      <AerialMapBackground />

      {/* Cloud Shadows Overlay */}
      <NatureClouds />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: The Large "Base" Image */}
          <motion.div 
            className="relative group"
            style={{ y: yImage }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative h-[360px] sm:h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.01]">
               <div className="absolute inset-0 bg-nature-900">
                  <Image 
                    src="/about-sec-lnd.jpg" 
                    alt="Serene Garden at Isara Residence"
                    fill
                    className="object-cover opacity-90"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
               </div>
               
               <div className="absolute inset-0 bg-gradient-to-t from-nature-950/40 to-transparent mix-blend-multiply"></div>
            </div>

            {/* Decorative "Stamp" or Badge */}
            <div className="absolute -bottom-10 -right-10 md:-right-16 md:bottom-10 w-32 h-32 md:w-40 md:h-40 bg-nature-800/90 backdrop-blur-sm rounded-full border border-nature-600/50 flex items-center justify-center animate-spin-slow hidden md:flex z-20 shadow-xl">
                <div className="text-xs font-serif text-nature-200 uppercase tracking-widest text-center">
                    Est.<br/>2024
                </div>
            </div>
          </motion.div>

          {/* Right Column: The "Zen Card" - Floating Content */}
          <motion.div 
            className="relative"
            style={{ y: yText }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* The Glassmorphism Card - Dark Mode Version */}
            <div className="relative bg-nature-900/40 backdrop-blur-md border border-white/10 p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl lg:-ml-24 animate-float">
              
              {/* Header */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <span className="h-[1px] w-12 bg-nature-400"></span>
                    <span className="text-nature-300 uppercase tracking-widest text-sm font-medium">About Isara</span>
                </div>
                
                <h2 className="font-serif text-4xl md:text-5xl text-nature-50 leading-tight">
                  Where Ancient History Meets <span className="italic text-nature-300">Modern Tranquility</span>
                </h2>

                <p className="text-nature-200 leading-relaxed text-lg">
                  Nestled just minutes from the UNESCO World Heritage sites of Polonnaruwa, Isara Residence offers more than just a stay—it offers a pause. 
                </p>

                <p className="text-nature-300 leading-relaxed font-light">
                  Wake up to the gentle rustling of palm leaves and the morning chorus of birds. Our residence is designed to be your sanctuary after a day of exploring the Ancient City, providing a seamless blend of Sri Lankan hospitality and contemporary comfort.
                </p>

                {/* Signature / CTA */}
                <div className="pt-6">
                   <button className="group flex items-center gap-3 text-nature-100 font-medium hover:text-white transition-colors">
                      <span>Explore Our Story</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                   </button>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;

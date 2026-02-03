"use client";
import React, { useState } from "react";
import {
  Wifi,
  Wind,
  Droplets,
  Bike,
  Coffee,
  Utensils,
  Shield,
  Leaf,
  Music,
  Camera,
  Sparkles,
  Home,
  LucideIcon,
} from "lucide-react";

/* -------------------- Types -------------------- */
type Facility = {
  icon: LucideIcon;
  name: string;
  desc: string;
};

type Facilities = {
  highlights: Facility[];
  comfort: Facility[];
};

type Category = {
  id: keyof Facilities;
  label: string;
  emoji: string;
};

/* -------------------- Component -------------------- */
const IsaraFacilities: React.FC = () => {
  const [activeCategory, setActiveCategory] =
    useState<keyof Facilities>("highlights");

  const facilities: Facilities = {
    highlights: [
      { icon: Wifi, name: "Free Wi-Fi", desc: "Stay connected throughout your visit" },
      { icon: Wind, name: "AC Rooms", desc: "Climate-controlled comfort" },
      { icon: Droplets, name: "Hot Water", desc: "24/7 availability" },
      { icon: Music, name: "Live Performances", desc: "Traditional cultural shows" },
      { icon: Leaf, name: "Garden Views", desc: "Lush tropical surroundings" },
    ],
    comfort: [
      { icon: Home, name: "Family Rooms", desc: "Spacious accommodation" },
      { icon: Shield, name: "24/7 Security", desc: "Your safety is our priority" },
      { icon: Coffee, name: "Shared Lounge", desc: "Relax and socialize" },
      { icon: Sparkles, name: "Daily Housekeeping", desc: "Pristine cleanliness" },
      { icon: Camera, name: "Scenic Views", desc: "Picturesque surroundings" },
    ],
  };

  const categories: Category[] = [
    { id: "highlights", label: "Signature Features", emoji: "✨" },
    { id: "comfort", label: "Guest Comfort", emoji: "🏡" },
  ];

  return (
    <section className="relative py-16 mobL:py-20 tablet:py-24 laptop:py-32 px-6 overflow-hidden bg-gradient-to-br from-nature-50 via-nature-100 to-nature-200">
      {/* Background effects */}
      <div className="absolute inset-0 magical-tone-shift opacity-40" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-nature-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float" />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-nature-500/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 tablet:mb-16">
          <p className="text-nature-600 font-medium tracking-widest uppercase text-sm mb-3 animate-fadeIn">
            Experience Isara
          </p>
          <h2 className="font-serif text-3xl mobS:text-4xl tablet:text-5xl laptop:text-6xl text-nature-900 mb-6 animate-fadeIn">
            Amenities
          </h2>
          <p className="text-nature-700/80 text-base mobL:text-lg max-w-2xl mx-auto animate-fadeIn">
            Every detail designed for your comfort in the heart of Polonnaruwa's
            ancient kingdom
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 mobL:px-6 tablet:px-8 py-3 mobL:py-4 rounded-full font-medium transition-all duration-500 tap-target text-sm mobL:text-base
                ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-nature-600 to-nature-700 text-nature-50 shadow-xl scale-105"
                    : "bg-nature-50/80 text-nature-800 hover:bg-nature-100 hover:scale-102"
                }`}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-8">
          {facilities[activeCategory].map((facility, index) => {
            const Icon = facility.icon;

            return (
              <div
                key={facility.name}
                className="group relative bg-nature-50/70 backdrop-blur-sm rounded-2xl p-6 tablet:p-8 border border-nature-300/50 hover:border-nature-500/60 transition-all duration-500 hover:shadow-2xl tablet:hover:-translate-y-2"
                style={{
                  animationDelay: `${0.4 + index * 0.1}s`,
                  animation: "fadeInUp 0.7s ease-out both",
                }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 tablet:w-16 tablet:h-16 rounded-2xl bg-gradient-to-br from-nature-500 to-nature-700 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Icon className="w-7 h-7 tablet:w-8 tablet:h-8 text-nature-50" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-nature-900 mb-2">
                  {facility.name}
                </h3>
                <p className="text-nature-700/70 leading-relaxed">
                  {facility.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 tablet:mt-20 text-center animate-fadeIn">
          <p className="text-nature-700/60 mb-6 text-base mobL:text-lg">
            Plus free parking, and more amenities
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out both;
        }
      `}</style>
    </section>
  );
};

export default IsaraFacilities;

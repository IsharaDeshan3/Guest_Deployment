"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface FoodItem {
  id: number;
  name: string;
  image: string;
  description: string;
}

const foodItems: FoodItem[] = [
  {
    id: 1,
    name: "Chicken Curry",
    image:
      "https://images.unsplash.com/photo-1565557623814-550f2e6f4fa8?q=80&w=800&auto=format&fit=crop",
    description: "Aromatic spiced chicken in creamy coconut sauce",
  },
  {
    id: 2,
    name: "Lamprais",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    description: "Traditional baked rice and meat delicacy",
  },
  {
    id: 3,
    name: "Fish Curry",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop",
    description: "Fresh local catch in tangy spiced broth",
  },
  {
    id: 4,
    name: "Hoppers",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    description: "Bowl-shaped pancakes with eggs and curry",
  },
  {
    id: 5,
    name: "Kottu Roti",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    description: "Chopped flatbread with meat and vegetables",
  },
  {
    id: 6,
    name: "Tropical Fruits",
    image:
      "https://images.unsplash.com/photo-1599599810694-b5ac4dd0e27b?q=80&w=800&auto=format&fit=crop",
    description: "Fresh exotic fruits from Sri Lankan gardens",
  },
];

export default function RestaurantShowcase() {
  const [mounted, setMounted] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(280);
  const [itemRadius, setItemRadius] = useState(100);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateSizes = () => {
      const width = window.innerWidth;
      if (width < 375) {
        setRadius(120);
        setItemRadius(56);
      } else if (width < 640) {
        setRadius(160);
        setItemRadius(70);
      } else if (width < 768) {
        setRadius(210);
        setItemRadius(85);
      } else {
        setRadius(280);
        setItemRadius(100);
      }
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % foodItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay]);

  if (!mounted) return null;

  const getRotationAngle = (index: number) => {
    const totalItems = foodItems.length;
    const anglePerItem = 360 / totalItems;
    return index * anglePerItem;
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[440px] mobS:h-[480px] mobL:h-[520px] sm:h-[620px] md:h-[720px] flex items-center justify-center">
      {/* Central Table/Circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-48 h-48 mobL:w-56 mobL:h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
          {/* Inner Circle - Table */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-nature-700/80 to-nature-900/80 border-4 border-nature-500/50 backdrop-blur-md shadow-2xl flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="text-center">
              <p className="text-nature-300 uppercase tracking-widest text-xs font-medium mb-2">
                Isara
              </p>
              <h2 className="font-serif text-3xl text-nature-50">Dining</h2>
              <p className="text-nature-200/70 text-sm mt-3">Coming Soon</p>
            </div>
          </motion.div>

          {/* Rotating Food Items Circle */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {foodItems.map((item, index) => {
              const angle = getRotationAngle(index);
              const radians = (angle * Math.PI) / 180;
              const x = radius * Math.cos(radians);
              const y = radius * Math.sin(radians);

              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={item.id}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    translateX: "-50%",
                    translateY: "-50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => {
                    setIsAutoplay(false);
                    setActiveIndex(index);
                  }}
                  onMouseLeave={() => setIsAutoplay(true)}
                >
                  {/* Food Item Card */}
                  <motion.div
                    className={`relative rounded-full overflow-hidden cursor-pointer group transition-all duration-300 ${
                      isActive
                        ? "ring-4 ring-nature-300 shadow-2xl"
                        : "ring-2 ring-nature-500/30 shadow-lg hover:ring-nature-400"
                    }`}
                    style={{ width: itemRadius, height: itemRadius }}
                    initial={{ scale: isActive ? 1.2 : 1 }}
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 374px) 112px, (max-width: 639px) 140px, 200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-nature-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  {/* Label */}
                  <motion.div
                    className={`absolute top-full mt-3 whitespace-nowrap text-center left-1/2 -translate-x-1/2 transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-60"
                    }`}
                    animate={{ opacity: isActive ? 1 : 0.6 }}
                  >
                    <p
                      className={`font-semibold tracking-wide text-xs md:text-sm ${
                        isActive ? "text-nature-200" : "text-nature-300/70"
                      }`}
                    >
                      {item.name}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Description Box - Below the rotation */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md"
        key={activeIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-nature-100 font-serif text-xl md:text-2xl mb-2">
            {foodItems[activeIndex].name}
          </h3>
          <p className="text-nature-200/80 text-sm">
            {foodItems[activeIndex].description}
          </p>
        </div>
      </motion.div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 items-center justify-center">
        {foodItems.map((_, index) => (
          <motion.button
            key={index}
            className={`transition-all duration-300 rounded-full ${
              index === activeIndex
                ? "w-8 h-2 bg-nature-300"
                : "w-2 h-2 bg-nature-500/40 hover:bg-nature-400"
            }`}
            onClick={() => {
              setActiveIndex(index);
              setIsAutoplay(false);
              setTimeout(() => setIsAutoplay(true), 10000);
            }}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Info Text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center text-nature-300/60 text-xs md:text-sm tracking-widest uppercase">
        <p>Hover over items or click dots</p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const NatureClouds = () => {
  // We don't necessarily need state if we just want static CSS clouds, 
  // but let's stick to simple CSS animation for performance.
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cloud 1 - Top Left */}
      <div 
        className="absolute top-[20%] -left-[10%] w-[35vw] h-[25vh] bg-white/40 rounded-[100%] blur-[50px] animate-cloud-drift-slow"
      />
      
      {/* Cloud 2 - Bottom Right */}
      <div 
        className="absolute bottom-[20%] -right-[10%] w-[40vw] h-[30vh] bg-white/30 rounded-[100%] blur-[70px] animate-cloud-drift-medium" 
        style={{ animationDelay: '-10s' }}
      />

      {/* Cloud 3 - Middle Flowing */}
      <div 
        className="absolute top-[50%] -left-[10%] w-[30vw] h-[20vh] bg-nature-100/40 rounded-[100%] blur-[40px] animate-cloud-drift-fast"
         style={{ animationDelay: '-5s' }}
      />
    </div>
  );
};

export default NatureClouds;

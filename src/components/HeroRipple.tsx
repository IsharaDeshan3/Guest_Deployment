"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

interface HeroRippleProps {
  imageSrc: string;
  displacementSrc: string;
}

export default function HeroRipple({
  imageSrc,
  displacementSrc,
}: HeroRippleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const initPixi = async () => {
      const app = new PIXI.Application();
      await app.init({
        resizeTo: containerRef.current!,
        backgroundAlpha: 0,
        preference: "webgl",
      });

      if (!containerRef.current) {
        app.destroy();
        return;
      }
      containerRef.current.appendChild(app.canvas);
      appRef.current = app;

      // Load Textures
      const textureImage = await PIXI.Assets.load(imageSrc);
      const textureDisplacement = await PIXI.Assets.load(displacementSrc);
      textureDisplacement.source.addressMode = 'repeat';

      // Setup Image Sprite
      const imgSprite = new PIXI.Sprite(textureImage);
      imgSprite.anchor.set(0.5);
      imgSprite.x = app.screen.width / 2;
      imgSprite.y = app.screen.height / 2;

      // Cover logic
      const resizeImage = () => {
        const scaleX = app.screen.width / imgSprite.texture.width;
        const scaleY = app.screen.height / imgSprite.texture.height;
        const scale = Math.max(scaleX, scaleY);
        imgSprite.scale.set(scale);
        imgSprite.x = app.screen.width / 2;
        imgSprite.y = app.screen.height / 2;
      };
      resizeImage();
      app.stage.addChild(imgSprite);

      // Setup Displacement
      const displacementSprite = new PIXI.Sprite(textureDisplacement);
      displacementSprite.anchor.set(0.5);
      displacementSprite.x = app.screen.width / 2;
      displacementSprite.y = app.screen.height / 2;
      displacementSprite.scale.set(1.5);
      
      const displacementFilter = new PIXI.DisplacementFilter(displacementSprite);
      // Much more subtle - only affect water gently
      displacementFilter.scale.x = 0;
      displacementFilter.scale.y = 0;
      
      app.stage.addChild(displacementSprite);
      imgSprite.filters = [displacementFilter];

      // Interaction
      let targetScaleX = 0;
      let targetScaleY = 0;
      let isHovering = false;
      
      const rippleSpeed = 0.08;
      
      app.stage.eventMode = 'static';
      app.stage.hitArea = app.screen;

      app.stage.on("pointermove", (e) => {
          const globalPos = e.global;
          isHovering = true;
          
          // Move displacement center to follow mouse
          displacementSprite.x = globalPos.x;
          displacementSprite.y = globalPos.y;
          
          // Very subtle ripple - only 8-12 pixels displacement
          targetScaleX = 10;
          targetScaleY = 10;
      });

      const onMouseLeave = () => {
         isHovering = false;
         targetScaleX = 0;
         targetScaleY = 0;
      };
      
      containerRef.current?.addEventListener('mouseleave', onMouseLeave);

      // Animation Loop
      let time = 0;
      app.ticker.add(() => {
        time += 0.01;
        
        // Smooth interpolation
        displacementFilter.scale.x += (targetScaleX - displacementFilter.scale.x) * rippleSpeed;
        displacementFilter.scale.y += (targetScaleY - displacementFilter.scale.y) * rippleSpeed;
        
        // Very subtle continuous movement when hovering for "alive water" feel
        if (isHovering && Math.abs(displacementFilter.scale.x) > 1) {
          displacementSprite.rotation = Math.sin(time) * 0.05;
        } else {
          displacementSprite.rotation = 0;
        }
      });

      // Handle Resize
      const handleResize = () => {
          app.resize();
          resizeImage();
      };
      window.addEventListener("resize", handleResize);
      
      return () => {
         window.removeEventListener("resize", handleResize);
         containerRef.current?.removeEventListener('mouseleave', onMouseLeave);
      };
    };

    initPixi();

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true, texture: true });
        appRef.current = null;
      }
    };
  }, [imageSrc, displacementSrc]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-0 bg-nature-900" 
      aria-hidden="true"
    />
  );
}

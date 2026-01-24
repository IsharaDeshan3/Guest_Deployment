"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

export default function WaterBackground() {
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

      // Load Assets
      const waterTexture = await PIXI.Assets.load('/water-texture.png');
      const displacementTexture = await PIXI.Assets.load('/displacement.png');
      displacementTexture.source.addressMode = 'repeat';

      // Setup Water Sprite (Background)
      const waterSprite = new PIXI.Sprite(waterTexture);
      waterSprite.anchor.set(0.5);
      waterSprite.x = app.screen.width / 2;
      waterSprite.y = app.screen.height / 2;

      // Image Cover Logic to fill container
      const resizeImage = () => {
        const scaleX = app.screen.width / waterSprite.texture.width;
        const scaleY = app.screen.height / waterSprite.texture.height;
        const scale = Math.max(scaleX, scaleY); // Cover
        waterSprite.scale.set(scale);
        waterSprite.x = app.screen.width / 2;
        waterSprite.y = app.screen.height / 2;
      };
      resizeImage();
      app.stage.addChild(waterSprite);

      // Setup Displacement Sprite (The ripples)
      const displacementSprite = new PIXI.Sprite(displacementTexture);
      displacementSprite.anchor.set(0.5);
      displacementSprite.x = app.screen.width / 2;
      displacementSprite.y = app.screen.height / 2;
      displacementSprite.scale.set(1.5); // Large texture
      
      const displacementFilter = new PIXI.DisplacementFilter(displacementSprite);
      displacementFilter.scale.x = 20; // Visible ripple amount
      displacementFilter.scale.y = 20;
      
      // We don't add displacementSprite to stage if we don't want to see it,
      // but filters rely on it having coordinates. Usually fine to not addChild if just for filter,
      // but Pixi might need it rendered to offscreen. Actually displacement sprite acts as a map,
      // usually better to have it in the scene but transparent or just used as reference.
      // In PIXI v8 filters take sprite reference. 
      // Let's add it but make it invisible? No, displacement map reads texture data.
      app.stage.addChild(displacementSprite);
      waterSprite.filters = [displacementFilter];

      // Note: We can add a simple darkening overlay sprite if needed, 
      // but simpler to do via CSS overlay on top of canvas.

      // Animation Loop
      app.ticker.add((time) => {
        // Continuous flow
        displacementSprite.x += 1 * time.deltaTime;
        displacementSprite.y += 0.5 * time.deltaTime;
        
        // Reset position to loop texture
        if (displacementSprite.x > displacementSprite.width) displacementSprite.x = 0;
        if (displacementSprite.y > displacementSprite.height) displacementSprite.y = 0;
      });

      // Handle Resize
      const handleResize = () => {
          app.resize();
          resizeImage();
      };
      window.addEventListener("resize", handleResize);
      
      // Cleanup inside init
      (app as any)._customCleanup = () => {
         window.removeEventListener("resize", handleResize);
      };
    };

    initPixi();

    return () => {
      if (appRef.current) {
        if ((appRef.current as any)._customCleanup) (appRef.current as any)._customCleanup();
        appRef.current.destroy(true, { children: true, texture: true });
        appRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-0 bg-nature-900" 
    />
  );
}

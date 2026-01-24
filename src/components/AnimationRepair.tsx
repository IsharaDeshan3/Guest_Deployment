"use client";

import { useEffect } from "react";

export default function AnimationRepair() {
    useEffect(() => {
        let lightOn = true;
        const animation = document.getElementById("animation");
        const bulb = document.getElementById("light-bulb");
        const ceilingLight = document.getElementById("ceiling-light");

        function toggleLight() {
            if (!animation || !bulb || !ceilingLight) return;

            if (lightOn) {
                animation.classList.remove("light-off");
                animation.classList.add("light-on");
                bulb.classList.add("active");
                ceilingLight.classList.add("active");
            } else {
                animation.classList.remove("light-on");
                animation.classList.add("light-off");
                bulb.classList.remove("active");
                ceilingLight.classList.remove("active");
            }

            lightOn = !lightOn;
        }

        toggleLight();
        const id = setInterval(toggleLight, 2000);

        return () => clearInterval(id);
    }, []);

    return (
        <div className="animation-repair-wrapper">
            <div id="animation">
                <div id="roof"></div>
                <div id="ceiling-light"></div>
                <div id="light-bulb"></div>
                <div id="broken-tile1" className="pixel"></div>
                <div id="broken-tile2" className="pixel"></div>
                <div id="stove" className="pixel"></div>
                <div id="tape" className="pixel"></div>
                <div id="cone" className="pixel"></div>
                <div id="arm" className="pixel"></div>
                <div id="body" className="pixel"></div>
                <div id="head" className="pixel"></div>
                <div id="hat" className="pixel"></div>
                <div id="tear" className="pixel"></div>
            </div>

            <div className="message">UNDER REPAIR</div>
            <div className="submessage">We&apos;ll be cooking again soon!</div>
            <div className="hover-hint">Hover over the cook!</div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

                .animation-repair-wrapper {
                    text-align: center;
                    position: relative;
                    font-family: 'Press Start 2P', cursive;
                }

                .animation-repair-wrapper * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                #animation {
                    padding: 40px;
                    width: 400px;
                    height: 400px;
                    position: relative;
                    margin: 0 auto 40px;
                    background: #f4e4c1;
                    border: 8px solid #3d2817;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    transition: filter 0.3s ease;
                }

                #animation.light-on {
                    filter: brightness(1.1);
                }

                #animation.light-off {
                    filter: brightness(0.7);
                }

                /* Mall roof - inside ceiling view */
                #roof {
                    position: absolute;
                    top: -60px;
                    left: -8px;
                    right: -8px;
                    height: 60px;
                    background: #5d4037;
                    border: 8px solid #3d2817;
                    border-bottom: none;
                    overflow: hidden;
                }

                /* Ceiling beams */
                #roof::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background:
                        repeating-linear-gradient(
                            0deg,
                            #6d4c41 0px,
                            #6d4c41 8px,
                            #4e342e 8px,
                            #4e342e 10px
                        );
                }

                /* Cross beams */
                #roof::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 12px;
                    background: #4e342e;
                    transform: translateY(-50%);
                    box-shadow:
                        0 -20px 0 #4e342e,
                        0 20px 0 #4e342e,
                        inset 0 4px 0 rgba(0,0,0,0.3),
                        inset 0 -4px 0 rgba(139,69,19,0.3);
                }

                /* Ceiling light fixture */
                #ceiling-light {
                    position: absolute;
                    top: -45px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 32px;
                    height: 20px;
                    background: #ecf0f1;
                    border: 3px solid #7f8c8d;
                    border-radius: 0 0 12px 12px;
                    box-shadow: inset 0 -4px 0 rgba(0,0,0,0.2);
                }

                #ceiling-light::before {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 100px solid transparent;
                    border-right: 100px solid transparent;
                    border-top: 60px solid rgba(255, 255, 150, 0);
                    opacity: 0;
                    transition: border-top-color 0.3s ease, opacity 0.3s ease;
                }

                #ceiling-light.active::before {
                    border-top-color: rgba(255, 255, 150, 0.4);
                    opacity: 1;
                }

                #light-bulb {
                    position: absolute;
                    top: -40px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 12px;
                    height: 12px;
                    background: #666;
                    border-radius: 50%;
                    box-shadow: 0 0 0 2px #7f8c8d;
                    transition: all 0.3s ease;
                }

                #light-bulb.active {
                    background: #fff;
                    box-shadow:
                        0 0 0 2px #7f8c8d,
                        0 0 20px rgba(255, 255, 150, 0.8),
                        0 0 40px rgba(255, 255, 100, 0.6),
                        0 0 60px rgba(255, 255, 50, 0.4);
                }

                #animation .pixel {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                }

                /* Cook's Chef Hat */
                #hat {
                    top: 100px;
                    left: 160px;
                    background: #fff;
                    box-shadow:
                        4px 0 0 #fff, 8px 0 0 #fff, 12px 0 0 #fff, 16px 0 0 #fff,
                        20px 0 0 #fff, 24px 0 0 #fff, 28px 0 0 #fff, 32px 0 0 #fff,
                        36px 0 0 #fff, 40px 0 0 #fff, 44px 0 0 #fff, 48px 0 0 #fff,
                        /* Row 2 */
                        0 4px 0 #fff, 4px 4px 0 #fff, 8px 4px 0 #fff, 12px 4px 0 #fff,
                        16px 4px 0 #fff, 20px 4px 0 #fff, 24px 4px 0 #fff, 28px 4px 0 #fff,
                        32px 4px 0 #fff, 36px 4px 0 #fff, 40px 4px 0 #fff, 44px 4px 0 #fff,
                        48px 4px 0 #fff, 52px 4px 0 #fff,
                        /* Row 3 */
                        4px 8px 0 #fff, 8px 8px 0 #fff, 12px 8px 0 #fff, 16px 8px 0 #fff,
                        20px 8px 0 #fff, 24px 8px 0 #fff, 28px 8px 0 #fff, 32px 8px 0 #fff,
                        36px 8px 0 #fff, 40px 8px 0 #fff, 44px 8px 0 #fff, 48px 8px 0 #fff,
                        /* Row 4 - brim */
                        -4px 12px 0 #fff, 0 12px 0 #fff, 4px 12px 0 #fff, 8px 12px 0 #fff,
                        12px 12px 0 #fff, 16px 12px 0 #fff, 20px 12px 0 #fff, 24px 12px 0 #fff,
                        28px 12px 0 #fff, 32px 12px 0 #fff, 36px 12px 0 #fff, 40px 12px 0 #fff,
                        44px 12px 0 #fff, 48px 12px 0 #fff, 52px 12px 0 #fff, 56px 12px 0 #fff;
                }

                /* Cook's Head */
                #head {
                    top: 116px;
                    left: 168px;
                    background: #ffcc99;
                    box-shadow:
                        /* Row 1 - forehead */
                        4px 0 0 #ffcc99, 8px 0 0 #ffcc99, 12px 0 0 #ffcc99,
                        16px 0 0 #ffcc99, 20px 0 0 #ffcc99, 24px 0 0 #ffcc99, 28px 0 0 #ffcc99,
                        32px 0 0 #ffcc99, 36px 0 0 #ffcc99,
                        /* Row 2 */
                        0 4px 0 #ffcc99, 4px 4px 0 #ffcc99, 8px 4px 0 #ffcc99, 12px 4px 0 #ffcc99,
                        16px 4px 0 #ffcc99, 20px 4px 0 #ffcc99, 24px 4px 0 #ffcc99, 28px 4px 0 #ffcc99,
                        32px 4px 0 #ffcc99, 36px 4px 0 #ffcc99, 40px 4px 0 #ffcc99,
                        /* Row 3 - eyebrows */
                        0 8px 0 #ffcc99, 4px 8px 0 #ffcc99, 8px 8px 0 #8b4513, 12px 8px 0 #8b4513,
                        16px 8px 0 #ffcc99, 20px 8px 0 #ffcc99, 24px 8px 0 #ffcc99,
                        28px 8px 0 #8b4513, 32px 8px 0 #8b4513, 36px 8px 0 #ffcc99, 40px 8px 0 #ffcc99,
                        /* Row 4 - eyes with highlights */
                        0 12px 0 #ffcc99, 4px 12px 0 #ffcc99, 8px 12px 0 #333, 12px 12px 0 #333,
                        16px 12px 0 #ffcc99, 20px 12px 0 #ffcc99, 24px 12px 0 #ffcc99,
                        28px 12px 0 #333, 32px 12px 0 #333, 36px 12px 0 #ffcc99, 40px 12px 0 #ffcc99,
                        /* Row 5 - eye detail with white highlights */
                        0 16px 0 #ffcc99, 4px 16px 0 #ffcc99, 8px 16px 0 #333, 12px 16px 0 #fff,
                        16px 16px 0 #ffcc99, 20px 16px 0 #ffcc99, 24px 16px 0 #ffcc99,
                        28px 16px 0 #333, 32px 16px 0 #fff, 36px 16px 0 #ffcc99, 40px 16px 0 #ffcc99,
                        /* Row 6 - cheeks */
                        0 20px 0 #ffcc99, 4px 20px 0 #ffcc99, 8px 20px 0 #ffcc99, 12px 20px 0 #ffcc99,
                        16px 20px 0 #ffcc99, 20px 20px 0 #ffcc99, 24px 20px 0 #ffcc99, 28px 20px 0 #ffcc99,
                        32px 20px 0 #ffcc99, 36px 20px 0 #ffcc99, 40px 20px 0 #ffcc99,
                        /* Row 7 - sad mouth (upside down curve) */
                        4px 24px 0 #ffcc99, 8px 24px 0 #ffcc99, 12px 24px 0 #333,
                        16px 24px 0 #ffcc99, 20px 24px 0 #ffcc99, 24px 24px 0 #ffcc99,
                        28px 24px 0 #333, 32px 24px 0 #ffcc99, 36px 24px 0 #ffcc99,
                        /* Row 8 - mouth continuation */
                        4px 28px 0 #ffcc99, 8px 28px 0 #333, 12px 28px 0 #ffcc99,
                        16px 28px 0 #ffcc99, 20px 28px 0 #ffcc99, 24px 28px 0 #ffcc99,
                        28px 28px 0 #ffcc99, 32px 28px 0 #333, 36px 28px 0 #ffcc99,
                        /* Row 9 - chin */
                        8px 32px 0 #ffcc99, 12px 32px 0 #ffcc99, 16px 32px 0 #ffcc99,
                        20px 32px 0 #ffcc99, 24px 32px 0 #ffcc99, 28px 32px 0 #ffcc99, 32px 32px 0 #ffcc99;
                }

                /* Cook's Body */
                #body {
                    top: 152px;
                    left: 164px;
                    background: #fff;
                    box-shadow:
                        /* White chef coat - shoulder area */
                        4px 0 0 #fff, 8px 0 0 #fff, 12px 0 0 #fff, 16px 0 0 #fff,
                        20px 0 0 #fff, 24px 0 0 #fff, 28px 0 0 #fff, 32px 0 0 #fff,
                        36px 0 0 #fff, 40px 0 0 #fff, 44px 0 0 #fff, 48px 0 0 #fff,
                        /* Row 2 with red apron start */
                        0 4px 0 #fff, 4px 4px 0 #fff, 8px 4px 0 #e74c3c, 12px 4px 0 #e74c3c,
                        16px 4px 0 #e74c3c, 20px 4px 0 #e74c3c, 24px 4px 0 #e74c3c, 28px 4px 0 #e74c3c,
                        32px 4px 0 #e74c3c, 36px 4px 0 #e74c3c, 40px 4px 0 #e74c3c, 44px 4px 0 #fff,
                        48px 4px 0 #fff, 52px 4px 0 #fff,
                        /* Rows with apron */
                        0 8px 0 #fff, 4px 8px 0 #fff, 8px 8px 0 #e74c3c, 12px 8px 0 #e74c3c,
                        16px 8px 0 #e74c3c, 20px 8px 0 #e74c3c, 24px 8px 0 #e74c3c, 28px 8px 0 #e74c3c,
                        32px 8px 0 #e74c3c, 36px 8px 0 #e74c3c, 40px 8px 0 #e74c3c, 44px 8px 0 #fff,
                        48px 8px 0 #fff, 52px 8px 0 #fff,
                        /* More rows */
                        0 12px 0 #fff, 4px 12px 0 #fff, 8px 12px 0 #e74c3c, 12px 12px 0 #e74c3c,
                        16px 12px 0 #e74c3c, 20px 12px 0 #e74c3c, 24px 12px 0 #e74c3c, 28px 12px 0 #e74c3c,
                        32px 12px 0 #e74c3c, 36px 12px 0 #e74c3c, 40px 12px 0 #e74c3c, 44px 12px 0 #fff,
                        48px 12px 0 #fff, 52px 12px 0 #fff,
                        /* Continue body */
                        0 16px 0 #fff, 4px 16px 0 #fff, 8px 16px 0 #e74c3c, 12px 16px 0 #e74c3c,
                        16px 16px 0 #e74c3c, 20px 16px 0 #e74c3c, 24px 16px 0 #e74c3c, 28px 16px 0 #e74c3c,
                        32px 16px 0 #e74c3c, 36px 16px 0 #e74c3c, 40px 16px 0 #e74c3c, 44px 16px 0 #fff,
                        48px 16px 0 #fff, 52px 16px 0 #fff,
                        /* Additional torso rows for height */
                        0 20px 0 #fff, 4px 20px 0 #fff, 8px 20px 0 #e74c3c, 12px 20px 0 #e74c3c,
                        16px 20px 0 #e74c3c, 20px 20px 0 #e74c3c, 24px 20px 0 #e74c3c, 28px 20px 0 #e74c3c,
                        32px 20px 0 #e74c3c, 36px 20px 0 #e74c3c, 40px 20px 0 #e74c3c, 44px 20px 0 #fff,
                        48px 20px 0 #fff, 52px 20px 0 #fff,
                        /* More torso */
                        0 24px 0 #fff, 4px 24px 0 #fff, 8px 24px 0 #e74c3c, 12px 24px 0 #e74c3c,
                        16px 24px 0 #e74c3c, 20px 24px 0 #e74c3c, 24px 24px 0 #e74c3c, 28px 24px 0 #e74c3c,
                        32px 24px 0 #e74c3c, 36px 24px 0 #e74c3c, 40px 24px 0 #e74c3c, 44px 24px 0 #fff,
                        48px 24px 0 #fff, 52px 24px 0 #fff,
                        /* Lower torso */
                        0 28px 0 #fff, 4px 28px 0 #fff, 8px 28px 0 #e74c3c, 12px 28px 0 #e74c3c,
                        16px 28px 0 #e74c3c, 20px 28px 0 #e74c3c, 24px 28px 0 #e74c3c, 28px 28px 0 #e74c3c,
                        32px 28px 0 #e74c3c, 36px 28px 0 #e74c3c, 40px 28px 0 #e74c3c, 44px 28px 0 #fff,
                        48px 28px 0 #fff, 52px 28px 0 #fff,
                        /* Legs transition */
                        8px 32px 0 #333, 12px 32px 0 #333, 16px 32px 0 #333, 20px 32px 0 #333,
                        24px 32px 0 #e74c3c, 28px 32px 0 #e74c3c, 32px 32px 0 #333, 36px 32px 0 #333,
                        40px 32px 0 #333, 44px 32px 0 #333,
                        /* Legs */
                        8px 36px 0 #333, 12px 36px 0 #333, 16px 36px 0 #333, 20px 36px 0 #333,
                        24px 36px 0 #333, 28px 36px 0 #333, 32px 36px 0 #333, 36px 36px 0 #333,
                        40px 36px 0 #333, 44px 36px 0 #333,
                        /* Legs row 2 */
                        8px 40px 0 #333, 12px 40px 0 #333, 16px 40px 0 #333, 20px 40px 0 #333,
                        24px 40px 0 #333, 28px 40px 0 #333, 32px 40px 0 #333, 36px 40px 0 #333,
                        40px 40px 0 #333, 44px 40px 0 #333;
                }

                /* Arm with wrench */
                #arm {
                    top: 168px;
                    left: 224px;
                    background: #ffcc99;
                    transform-origin: 0% 0%;
                    box-shadow:
                        /* Arm */
                        4px 0 0 #ffcc99, 8px 0 0 #ffcc99, 12px 0 0 #ffcc99, 16px 0 0 #ffcc99,
                        20px 0 0 #ffcc99, 24px 0 0 #ffcc99,
                        0 4px 0 #ffcc99, 4px 4px 0 #ffcc99, 8px 4px 0 #ffcc99, 12px 4px 0 #ffcc99,
                        16px 4px 0 #ffcc99, 20px 4px 0 #ffcc99, 24px 4px 0 #ffcc99, 28px 4px 0 #ffcc99,
                        /* Wrench */
                        32px 0 0 #95a5a6, 36px 0 0 #95a5a6, 40px 0 0 #95a5a6, 44px 0 0 #95a5a6,
                        32px 4px 0 #95a5a6, 36px 4px 0 #95a5a6, 40px 4px 0 #95a5a6, 44px 4px 0 #95a5a6,
                        48px 4px 0 #95a5a6;
                }

                /* Broken Stove */
                #stove {
                    bottom: 60px;
                    left: 30px;
                    background: #7f8c8d;
                    box-shadow:
                        /* Stove top */
                        4px 0 0 #7f8c8d, 8px 0 0 #7f8c8d, 12px 0 0 #7f8c8d, 16px 0 0 #7f8c8d,
                        20px 0 0 #7f8c8d, 24px 0 0 #7f8c8d, 28px 0 0 #7f8c8d, 32px 0 0 #7f8c8d,
                        36px 0 0 #7f8c8d, 40px 0 0 #7f8c8d, 44px 0 0 #7f8c8d, 48px 0 0 #7f8c8d,
                        /* Burners row */
                        0 4px 0 #7f8c8d, 4px 4px 0 #333, 8px 4px 0 #333, 12px 4px 0 #333,
                        16px 4px 0 #7f8c8d, 20px 4px 0 #7f8c8d, 24px 4px 0 #7f8c8d, 28px 4px 0 #7f8c8d,
                        32px 4px 0 #333, 36px 4px 0 #333, 40px 4px 0 #333, 44px 4px 0 #7f8c8d,
                        48px 4px 0 #7f8c8d,
                        /* Burners detail */
                        0 8px 0 #7f8c8d, 4px 8px 0 #333, 8px 8px 0 #c0392b, 12px 8px 0 #333,
                        16px 8px 0 #7f8c8d, 20px 8px 0 #7f8c8d, 24px 8px 0 #7f8c8d, 28px 8px 0 #7f8c8d,
                        32px 8px 0 #333, 36px 8px 0 #c0392b, 40px 8px 0 #333, 44px 8px 0 #7f8c8d,
                        48px 8px 0 #7f8c8d,
                        /* More burners */
                        0 12px 0 #7f8c8d, 4px 12px 0 #333, 8px 12px 0 #333, 12px 12px 0 #333,
                        16px 12px 0 #7f8c8d, 20px 12px 0 #7f8c8d, 24px 12px 0 #7f8c8d, 28px 12px 0 #7f8c8d,
                        32px 12px 0 #333, 36px 12px 0 #333, 40px 12px 0 #333, 44px 12px 0 #7f8c8d,
                        48px 12px 0 #7f8c8d,
                        /* Stove body */
                        0 16px 0 #95a5a6, 4px 16px 0 #95a5a6, 8px 16px 0 #95a5a6, 12px 16px 0 #95a5a6,
                        16px 16px 0 #95a5a6, 20px 16px 0 #95a5a6, 24px 16px 0 #95a5a6, 28px 16px 0 #95a5a6,
                        32px 16px 0 #95a5a6, 36px 16px 0 #95a5a6, 40px 16px 0 #95a5a6, 44px 16px 0 #95a5a6,
                        48px 16px 0 #95a5a6,
                        /* Oven door with crack */
                        0 20px 0 #95a5a6, 4px 20px 0 #bdc3c7, 8px 20px 0 #bdc3c7, 12px 20px 0 #333,
                        16px 20px 0 #bdc3c7, 20px 20px 0 #bdc3c7, 24px 20px 0 #333, 28px 20px 0 #bdc3c7,
                        32px 20px 0 #bdc3c7, 36px 20px 0 #bdc3c7, 40px 20px 0 #bdc3c7, 44px 20px 0 #bdc3c7,
                        48px 20px 0 #95a5a6,
                        /* More oven */
                        0 24px 0 #95a5a6, 4px 24px 0 #bdc3c7, 8px 24px 0 #bdc3c7, 12px 24px 0 #bdc3c7,
                        16px 24px 0 #333, 20px 24px 0 #bdc3c7, 24px 24px 0 #bdc3c7, 28px 24px 0 #333,
                        32px 24px 0 #bdc3c7, 36px 24px 0 #bdc3c7, 40px 24px 0 #bdc3c7, 44px 24px 0 #bdc3c7,
                        48px 24px 0 #95a5a6,
                        /* Bottom */
                        0 28px 0 #95a5a6, 4px 28px 0 #95a5a6, 8px 28px 0 #95a5a6, 12px 28px 0 #95a5a6,
                        16px 28px 0 #95a5a6, 20px 28px 0 #95a5a6, 24px 28px 0 #95a5a6, 28px 28px 0 #95a5a6,
                        32px 28px 0 #95a5a6, 36px 28px 0 #95a5a6, 40px 28px 0 #95a5a6, 44px 28px 0 #95a5a6,
                        48px 28px 0 #95a5a6;
                }

                /* Emergency tape over stove - single X */
                #tape {
                    bottom: 68px;
                    left: 28px;
                    background: #ffd700;
                    width: 4px;
                    height: 4px;
                    box-shadow:
                        /* Diagonal line top-left to bottom-right */
                        0 0 0 #ffd700, 4px 4px 0 #ffd700, 8px 8px 0 #ffd700,
                        12px 12px 0 #ffd700, 16px 16px 0 #ffd700, 20px 20px 0 #ffd700,
                        24px 24px 0 #ffd700, 28px 28px 0 #ffd700, 32px 32px 0 #ffd700,
                        36px 36px 0 #ffd700, 40px 40px 0 #ffd700, 44px 44px 0 #ffd700,
                        /* Add thickness */
                        0 4px 0 #ffd700, 4px 8px 0 #ffd700, 8px 12px 0 #ffd700,
                        12px 16px 0 #ffd700, 16px 20px 0 #ffd700, 20px 24px 0 #ffd700,
                        24px 28px 0 #ffd700, 28px 32px 0 #ffd700, 32px 36px 0 #ffd700,
                        36px 40px 0 #ffd700, 40px 44px 0 #ffd700,
                        /* Black stripe in middle */
                        20px 20px 0 #333, 20px 24px 0 #333, 24px 20px 0 #333, 24px 24px 0 #333,
                        /* Diagonal line top-right to bottom-left */
                        48px 0 0 #ffd700, 44px 4px 0 #ffd700, 40px 8px 0 #ffd700,
                        36px 12px 0 #ffd700, 32px 16px 0 #ffd700, 28px 20px 0 #ffd700,
                        24px 24px 0 #ffd700, 20px 28px 0 #ffd700, 16px 32px 0 #ffd700,
                        12px 36px 0 #ffd700, 8px 40px 0 #ffd700, 4px 44px 0 #ffd700,
                        0 48px 0 #ffd700,
                        /* Add thickness */
                        48px 4px 0 #ffd700, 44px 8px 0 #ffd700, 40px 12px 0 #ffd700,
                        36px 16px 0 #ffd700, 32px 20px 0 #ffd700, 28px 24px 0 #ffd700,
                        24px 28px 0 #ffd700, 20px 32px 0 #ffd700, 16px 36px 0 #ffd700,
                        12px 40px 0 #ffd700, 8px 44px 0 #ffd700, 4px 48px 0 #ffd700;
                }

                /* Caution Cone */
                #cone {
                    bottom: 60px;
                    right: 100px;
                    background: #ff6b00;
                    box-shadow:
                        /* Top */
                        12px 0 0 #ff6b00,
                        8px 4px 0 #ff6b00, 12px 4px 0 #ff6b00, 16px 4px 0 #ff6b00,
                        /* White stripe */
                        4px 8px 0 #ff6b00, 8px 8px 0 #fff, 12px 8px 0 #fff, 16px 8px 0 #fff, 20px 8px 0 #ff6b00,
                        /* Orange */
                        0 12px 0 #ff6b00, 4px 12px 0 #ff6b00, 8px 12px 0 #ff6b00, 12px 12px 0 #ff6b00,
                        16px 12px 0 #ff6b00, 20px 12px 0 #ff6b00, 24px 12px 0 #ff6b00,
                        /* White stripe */
                        0 16px 0 #fff, 4px 16px 0 #fff, 8px 16px 0 #fff, 12px 16px 0 #fff,
                        16px 16px 0 #fff, 20px 16px 0 #fff, 24px 16px 0 #fff,
                        /* Base */
                        -4px 20px 0 #333, 0 20px 0 #333, 4px 20px 0 #333, 8px 20px 0 #333,
                        12px 20px 0 #333, 16px 20px 0 #333, 20px 20px 0 #333, 24px 20px 0 #333, 28px 20px 0 #333;
                }

                /* Broken tiles */
                #broken-tile1 {
                    top: 80px;
                    left: 80px;
                    background: #999;
                    box-shadow:
                        4px 0 0 #999, 8px 0 0 #999, 12px 0 0 #999, 16px 0 0 #999, 20px 0 0 #999,
                        0 4px 0 #999, 4px 4px 0 #333, 8px 4px 0 #999, 12px 4px 0 #999, 16px 4px 0 #333, 20px 4px 0 #999,
                        0 8px 0 #999, 4px 8px 0 #999, 8px 8px 0 #333, 12px 8px 0 #333, 16px 8px 0 #999, 20px 8px 0 #999,
                        0 12px 0 #999, 4px 12px 0 #333, 8px 12px 0 #999, 12px 12px 0 #999, 16px 12px 0 #999, 20px 12px 0 #333,
                        0 16px 0 #999, 4px 16px 0 #999, 8px 16px 0 #999, 12px 16px 0 #999, 16px 16px 0 #999, 20px 16px 0 #999;
                }

                #broken-tile2 {
                    top: 40px;
                    right: 60px;
                    background: #999;
                    box-shadow:
                        4px 0 0 #999, 8px 0 0 #999, 12px 0 0 #999, 16px 0 0 #999,
                        0 4px 0 #999, 4px 4px 0 #333, 8px 4px 0 #999, 12px 4px 0 #333, 16px 4px 0 #999,
                        0 8px 0 #999, 4px 8px 0 #999, 8px 8px 0 #333, 12px 8px 0 #999, 16px 8px 0 #999,
                        0 12px 0 #999, 4px 12px 0 #999, 8px 12px 0 #999, 12px 12px 0 #999, 16px 12px 0 #999;
                }

                /* Tear drop */
                #tear {
                    top: 142px;
                    left: 180px;
                    background: #5dade2;
                    opacity: 0;
                    box-shadow:
                        4px 0 0 #5dade2,
                        0 4px 0 #5dade2, 4px 4px 0 #5dade2,
                        4px 8px 0 #5dade2;
                }

                /* Animations */
                @keyframes headBob {
                    0%, 50%, 100% {
                        transform: translate(0, 0);
                    }
                    25% {
                        transform: translate(-2px, -3px);
                    }
                    75% {
                        transform: translate(2px, -3px);
                    }
                }

                @keyframes armDroop {
                    0%, 100% {
                        transform: rotate(0deg);
                    }
                    50% {
                        transform: rotate(10deg);
                    }
                }

                @keyframes tearFall {
                    0% {
                        opacity: 0;
                        transform: translateY(0);
                    }
                    10% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                }

                /* Apply animations on hover */
                #animation:hover #head {
                    animation: headBob 0.8s infinite ease-in-out;
                }

                #animation:hover #arm {
                    animation: armDroop 2s infinite ease-in-out;
                }

                #animation:hover #tear {
                    animation: tearFall 3s infinite ease-in;
                }

                /* Message text */
                .message {
                    color: #ffd700;
                    font-size: 24px;
                    text-shadow:
                        3px 3px 0 #3d2817,
                        0 0 20px rgba(255, 215, 0, 0.6);
                    letter-spacing: 2px;
                    margin-bottom: 15px;
                }

                .submessage {
                    color: #e8d8b8;
                    font-size: 14px;
                    text-shadow: 2px 2px 0 #000;
                    letter-spacing: 1px;
                }

                .hover-hint {
                    color: #95a5a6;
                    font-size: 10px;
                    margin-top: 20px;
                    text-shadow: 1px 1px 0 #000;
                }
            `}</style>
        </div>
        );
}

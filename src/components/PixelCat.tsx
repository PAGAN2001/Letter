import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/audio';

interface PixelCatProps {
  isCelebration?: boolean;
  scale?: number;
  className?: string;
  reactionCount?: number;
}

export const PixelCat: React.FC<PixelCatProps> = ({
  isCelebration = false,
  scale = 1,
  className = '',
  reactionCount = 0,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHopping, setIsHopping] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('Meow! 💕');

  // Automatic blinking timer
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3200);

    return () => clearInterval(blinkInterval);
  }, []);

  // React to reactionCount changes (e.g. when NO button dodges)
  useEffect(() => {
    if (reactionCount > 0) {
      setIsHopping(true);
      setShowBubble(true);
      const phrases = [
        'Hehe! 😹',
        'Missed! 🐾',
        'Say YES! 💕',
        'Too fast! ⚡',
        'Birthday hug? 🎂',
      ];
      setBubbleText(phrases[reactionCount % phrases.length]);
      setTimeout(() => setIsHopping(false), 350);
      setTimeout(() => setShowBubble(false), 1800);
    }
  }, [reactionCount]);

  const handleCatTap = () => {
    soundEngine.playDodgePop();
    setIsHopping(true);
    setShowBubble(true);
    const phrases = ['Purrrr~ ❤️', 'Meow! 🎂', 'Love you! 💕', 'Happy Birthday! 🎉', 'Best Girlfriend! ✨'];
    setBubbleText(phrases[Math.floor(Math.random() * phrases.length)]);

    setTimeout(() => setIsHopping(false), 400);
    setTimeout(() => setShowBubble(false), 2200);
  };

  return (
    <div
      onClick={handleCatTap}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${className}`}
      style={{ transform: `scale(${scale})` }}
      title="Click me for a meow!"
    >
      {/* Meow Speech Bubble */}
      {showBubble && (
        <div className="absolute -top-10 sm:-top-12 bg-white text-[#E63946] border-2 border-[#E63946] rounded-2xl px-3 py-1 text-xs font-black shadow-lg animate-bounce z-30 whitespace-nowrap">
          {bubbleText}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-[#E63946]" />
        </div>
      )}

      {/* Container wrapper applying head bob & hop */}
      <div
        className={`transition-transform duration-200 ${
          isHopping ? '-translate-y-4 scale-105' : 'animate-head-bob'
        }`}
      >
        <svg
          width="170"
          height="170"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          className="filter drop-shadow-md"
        >
          {/* Party Hat (Visible in Celebration / Birthday Mode) */}
          {isCelebration && (
            <g className="animate-bounce">
              {/* Pom-pom on top */}
              <rect x="13" y="0" width="2" height="2" fill="#FFB703" />
              {/* Hat cone */}
              <rect x="13" y="2" width="2" height="1" fill="#E63946" />
              <rect x="12" y="3" width="4" height="1" fill="#FFB703" />
              <rect x="11" y="4" width="6" height="1" fill="#E63946" />
              <rect x="10" y="5" width="8" height="1" fill="#FFB703" />
            </g>
          )}

          {/* === BLACK & GRAY CAT BASE === */}

          {/* Ears with Twitch animation */}
          <g className="animate-ear-twitch">
            {/* Left Ear - Dark Charcoal with Gray edge */}
            <rect x="5" y="4" width="4" height="2" fill="#1C1C22" />
            <rect x="4" y="6" width="6" height="2" fill="#1C1C22" />
            <rect x="4" y="6" width="1" height="2" fill="#515563" /> {/* Gray stripe */}
            <rect x="6" y="6" width="2" height="2" fill="#F8A5C2" /> {/* Pink inner */}

            {/* Right Ear - Dark Charcoal with Gray edge */}
            <rect x="19" y="4" width="4" height="2" fill="#1C1C22" />
            <rect x="18" y="6" width="6" height="2" fill="#1C1C22" />
            <rect x="23" y="6" width="1" height="2" fill="#515563" /> {/* Gray stripe */}
            <rect x="20" y="6" width="2" height="2" fill="#F8A5C2" /> {/* Pink inner */}
          </g>

          {/* Head Base - Black & Gray Fur Pattern */}
          <rect x="4" y="8" width="20" height="10" fill="#1C1C22" />
          <rect x="3" y="10" width="22" height="7" fill="#1C1C22" />

          {/* Gray Forehead Tabby Stripes */}
          <rect x="13" y="8" width="2" height="3" fill="#515563" />
          <rect x="9" y="8" width="2" height="2" fill="#515563" />
          <rect x="17" y="8" width="2" height="2" fill="#515563" />

          {/* Cheeks & Muzzle - Light Gray Patch */}
          <rect x="10" y="13" width="8" height="4" fill="#D1D5DB" />
          <rect x="9" y="14" width="10" height="2" fill="#D1D5DB" />

          {/* Pink Blushing Cheeks */}
          <rect x="5" y="13" width="3" height="1.5" fill="#FF85A1" />
          <rect x="20" y="13" width="3" height="1.5" fill="#FF85A1" />

          {/* Eyes (Blinking / Happy / Sparkle) */}
          {isBlinking ? (
            <>
              {/* Closed Blinking Eyes */}
              <rect x="7" y="11" width="4" height="1" fill="#1C1C22" />
              <rect x="17" y="11" width="4" height="1" fill="#1C1C22" />
            </>
          ) : isCelebration ? (
            <>
              {/* Happy Sparkle Heart Eyes for Celebration */}
              <rect x="7" y="10" width="4" height="1" fill="#E63946" />
              <rect x="6" y="11" width="6" height="2" fill="#E63946" />
              <rect x="8" y="13" width="2" height="1" fill="#E63946" />

              <rect x="17" y="10" width="4" height="1" fill="#E63946" />
              <rect x="16" y="11" width="6" height="2" fill="#E63946" />
              <rect x="18" y="13" width="2" height="1" fill="#E63946" />
            </>
          ) : (
            <>
              {/* Cute Expressive Eyes (Big pupils with white light reflection) */}
              <rect x="7" y="10" width="4" height="4" fill="#FFFFFF" />
              <rect x="8" y="11" width="2" height="2" fill="#1C1C22" />
              <rect x="7" y="10" width="1.5" height="1.5" fill="#FFFFFF" />

              <rect x="17" y="10" width="4" height="4" fill="#FFFFFF" />
              <rect x="18" y="11" width="2" height="2" fill="#1C1C22" />
              <rect x="17" y="10" width="1.5" height="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Nose & Cute Mouth */}
          <rect x="13" y="12.5" width="2" height="1" fill="#FF758F" /> {/* Pink Nose */}
          <rect x="12" y="14" width="1" height="1" fill="#1C1C22" /> {/* Mouth left */}
          <rect x="15" y="14" width="1" height="1" fill="#1C1C22" /> {/* Mouth right */}
          <rect x="13" y="14" width="2" height="1" fill="#1C1C22" /> {/* Mouth center */}

          {/* Whiskers */}
          <rect x="2" y="13" width="3" height="0.5" fill="#515563" />
          <rect x="1" y="14.5" width="3" height="0.5" fill="#515563" />
          <rect x="23" y="13" width="3" height="0.5" fill="#515563" />
          <rect x="24" y="14.5" width="3" height="0.5" fill="#515563" />

          {/* Body - Charcoal Black with Gray Belly & Stripes */}
          <rect x="6" y="17" width="16" height="7" fill="#1C1C22" />
          <rect x="5" y="19" width="18" height="5" fill="#1C1C22" />

          {/* Gray Chest / Belly Patch */}
          <rect x="10" y="17" width="8" height="7" fill="#D1D5DB" />
          {/* Side Stripes */}
          <rect x="6" y="19" width="2" height="3" fill="#515563" />
          <rect x="20" y="19" width="2" height="3" fill="#515563" />

          {/* Gray Paws */}
          <rect x="7" y="22" width="3" height="3" fill="#E5E7EB" />
          <rect x="18" y="22" width="3" height="3" fill="#E5E7EB" />

          {/* === ITEM HELD IN PAWS === */}
          {isCelebration ? (
            /* Birthday Cake with Glowing Candle Candle Flame */
            <g className="animate-bounce">
              {/* Plate */}
              <rect x="10" y="22" width="8" height="1" fill="#9CA3AF" />
              {/* Cake body */}
              <rect x="11" y="18" width="6" height="4" fill="#F472B6" />
              <rect x="11" y="18" width="6" height="1" fill="#FFFFFF" /> {/* Icing */}
              {/* Candle */}
              <rect x="13.5" y="16" width="1" height="2" fill="#60A5FA" />
              {/* Flame */}
              <rect
                x="13"
                y="14"
                width="2"
                height="2"
                fill="#FFB703"
                className="animate-candle-flicker"
              />
            </g>
          ) : (
            /* Heart held in paws */
            <g>
              <rect x="11" y="17" width="2" height="2" fill="#E63946" />
              <rect x="15" y="17" width="2" height="2" fill="#E63946" />
              <rect x="10" y="18" width="8" height="3" fill="#E63946" />
              <rect x="11" y="21" width="6" height="2" fill="#E63946" />
              <rect x="13" y="23" width="2" height="1" fill="#E63946" />
              {/* Highlight */}
              <rect x="11" y="18" width="1" height="1" fill="#FFFFFF" />
            </g>
          )}

          {/* Tail with Wiggle Animation */}
          <g className="animate-tail-wiggle">
            <rect x="22" y="20" width="2" height="2" fill="#1C1C22" />
            <rect x="24" y="18" width="2" height="3" fill="#1C1C22" />
            <rect x="25" y="15" width="2" height="4" fill="#1C1C22" />
            <rect x="24" y="13" width="2" height="2" fill="#515563" /> {/* Gray tail tip */}
          </g>
        </svg>
      </div>
    </div>
  );
};

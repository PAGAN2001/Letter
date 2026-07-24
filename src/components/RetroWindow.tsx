import React, { useState, useRef, useEffect } from 'react';
import { Heart, Settings, Sparkles } from 'lucide-react';
import { PixelCat } from './PixelCat';
import { AppConfig, DodgeState } from '../types';
import { soundEngine } from '../utils/audio';

interface RetroWindowProps {
  config: AppConfig;
  onSelectYes: () => void;
  onOpenSettings: () => void;
}

export const RetroWindow: React.FC<RetroWindowProps> = ({
  config,
  onSelectYes,
  onOpenSettings,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const [dodgeState, setDodgeState] = useState<DodgeState>({
    x: 0,
    y: 0,
    isAbsolute: false,
    count: 0,
    phrase: 'NO',
  });

  const dodgePhrases = [
    'NO',
    'Are you sure? 🥺',
    'Nice try! 😜',
    'Wrong button!',
    'Click YES instead! 💕',
    'You cant catch me!',
    'Nope! 🙈',
    'Pretty please? 💖',
    'Think again! 😸',
    'YES is over there! 👉',
    'Haha nope! 🚀',
  ];

  // Scale factor for YES button as NO button is dodged repeatedly
  const yesScale = Math.min(2.5, 1 + dodgeState.count * 0.12);

  const performDodge = () => {
    if (config.enableSoundEffects) {
      soundEngine.playDodgePop();
    }

    if (!containerRef.current || !noBtnRef.current) return;
    const cardRect = containerRef.current.getBoundingClientRect();
    const btnWidth = noBtnRef.current.offsetWidth || 120;
    const btnHeight = noBtnRef.current.offsetHeight || 48;

    // Safe padded boundaries inside card container
    const paddingX = 20;
    const paddingY = 20;

    const minX = paddingX;
    const maxX = Math.max(minX, cardRect.width - btnWidth - paddingX);

    // Keep below top title bar (~70px) and above card bottom edge
    const minY = 70;
    const maxY = Math.max(minY, cardRect.height - btnHeight - paddingY);

    let randomX = Math.floor(Math.random() * (maxX - minX) + minX);
    let randomY = Math.floor(Math.random() * (maxY - minY) + minY);

    // Ensure it moves a noticeable distance (>= 80px) from previous location
    let attempts = 0;
    while (
      attempts < 10 &&
      dodgeState.isAbsolute &&
      Math.hypot(randomX - dodgeState.x, randomY - dodgeState.y) < 80
    ) {
      randomX = Math.floor(Math.random() * (maxX - minX) + minX);
      randomY = Math.floor(Math.random() * (maxY - minY) + minY);
      attempts++;
    }

    const nextCount = dodgeState.count + 1;
    const nextPhrase = dodgePhrases[nextCount % dodgePhrases.length];

    setDodgeState({
      x: randomX,
      y: randomY,
      isAbsolute: true,
      count: nextCount,
      phrase: nextPhrase,
    });
  };

  return (
    <div className="relative z-10 w-full max-w-lg mx-auto px-2 py-2 transition-all">
      {/* Editorial Frame with Corner Accents */}
      <div
        ref={containerRef}
        className="bg-white/95 backdrop-blur-md border border-[#E63946]/20 rounded-3xl shadow-xl overflow-hidden transition-all relative min-h-[480px] flex flex-col justify-between p-6 sm:p-8"
      >
        {/* Artistic Corner Accents */}
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#E63946]/30 pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#E63946]/30 pointer-events-none"></div>

        {/* Top Card Navigation Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E63946]/10 text-xs font-semibold tracking-wider text-[#E63946]">
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 fill-[#E63946] text-[#E63946] animate-pulse" />
            <span className="font-bold tracking-widest uppercase">BIRTHDAY CARD FOR HER 🎂</span>
          </div>
          <button
            onClick={onOpenSettings}
            className="p-1.5 hover:bg-rose-50 text-[#E63946] rounded-full transition"
            title="Customize Card"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="py-6 flex-1 flex flex-col items-center justify-between text-center select-none">
          {/* Main Serif Headline */}
          <div className="my-2 px-2">
            <h1 className="serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1E24] tracking-tight leading-[1.05]">
              {config.title || 'Happy Birthday, My Love! 🎂 Will you celebrate with me?'}
            </h1>
          </div>

          {/* Pixel Cat Graphic - Black and Gray Mascot doing simple moves */}
          <div className="my-3 flex flex-col items-center justify-center">
            <PixelCat scale={1.1} reactionCount={dodgeState.count} />
            <span className="text-[10px] text-stone-400 font-semibold mt-1">
              (Tap the cat for a birthday meow! 🐾)
            </span>
          </div>

          {/* Action Buttons Row */}
          <div className="w-full mt-4 mb-2 min-h-[100px] flex items-center justify-center gap-6">
            {/* YES BUTTON - Glowing Crimson Artistic Button */}
            <div className="z-10 transition-transform duration-200" style={{ transform: `scale(${yesScale})` }}>
              <button
                onClick={onSelectYes}
                className="btn-glow px-8 py-3.5 bg-[#E63946] hover:bg-[#d62839] text-white font-black text-lg rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer tracking-wider"
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>YES</span>
                </div>
                <span className="text-[9px] font-normal tracking-[0.2em] opacity-80 uppercase mt-0.5">PROCEED</span>
              </button>
            </div>

            {/* NO BUTTON (Dodges cursor/touch) - Ghost Button */}
            <button
              ref={noBtnRef}
              onMouseEnter={performDodge}
              onPointerEnter={performDodge}
              onPointerDown={(e) => {
                e.preventDefault();
                performDodge();
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                performDodge();
              }}
              onClick={(e) => {
                e.preventDefault();
                performDodge();
              }}
              style={
                dodgeState.isAbsolute
                  ? {
                      position: 'absolute',
                      left: `${dodgeState.x}px`,
                      top: `${dodgeState.y}px`,
                      transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      zIndex: 40,
                    }
                  : { position: 'relative', zIndex: 10 }
              }
              className="px-7 py-3 bg-white hover:bg-rose-50 text-[#E63946] font-semibold text-base rounded-full border-2 border-[#E63946] shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              {dodgeState.phrase}
            </button>
          </div>

          {/* Bottom Hint Footer */}
          <div className="text-[11px] font-medium text-[#1E1E24]/50 mt-2 italic flex items-center justify-center gap-1">
            <span>Hint: The "NO" button is stubborn and keeps moving! 😉</span>
          </div>
        </div>
      </div>
    </div>
  );
};

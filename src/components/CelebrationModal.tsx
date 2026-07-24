import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RefreshCw, Volume2, VolumeX, MailOpen, Calendar, Gift } from 'lucide-react';
import { PixelCat } from './PixelCat';
import { AppConfig } from '../types';
import { soundEngine } from '../utils/audio';

interface CelebrationModalProps {
  config: AppConfig;
  onReset: () => void;
  onOpenSettings: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  config,
  onReset,
  onOpenSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'letter' | 'reasons'>('letter');
  const [isPlayingMusic, setIsPlayingMusic] = useState(config.enableMusic);
  const [copiedLetter, setCopiedLetter] = useState(false);

  // Trigger heart confetti storm on mount and when button requested
  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#E63946', '#ff758f', '#ffb703', '#ffffff'],
    });

    try {
      const heart = confetti.shapeFromPath({
        path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
      });
      confetti({
        shapes: [heart],
        particleCount: 50,
        scalar: 2.2,
        spread: 120,
        colors: ['#E63946', '#ff85a1', '#f472b6'],
      });
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    soundEngine.playCelebrationFanfare();
    triggerConfetti();

    if (config.enableMusic) {
      soundEngine.toggleBgm(true);
      setIsPlayingMusic(true);
    }

    return () => {
      soundEngine.toggleBgm(false);
    };
  }, [config.enableMusic]);

  const toggleSoundtrack = () => {
    const nextState = !isPlayingMusic;
    setIsPlayingMusic(nextState);
    soundEngine.toggleBgm(nextState);
  };

  const copyLoveNote = () => {
    navigator.clipboard.writeText(`I Love You, ${config.recipientName}! ❤️\n${config.customMessage}`);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2500);
  };

  const getDaysTogether = () => {
    if (!config.anniversaryDate) return null;
    const start = new Date(config.anniversaryDate);
    if (isNaN(start.getTime())) return null;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysCount = getDaysTogether();

  const loveReasons = [
    { title: "Your Cute Smile", desc: "It instantly brightens up even my darkest days." },
    { title: "Your Kind Heart", desc: "How caring and loving you are to everyone around you." },
    { title: "Our Inside Jokes", desc: "Nobody makes me laugh as hard or as effortlessly as you do." },
    { title: "Your Gentle Hugs", desc: "Being in your arms feels like the safest place in the world." },
    { title: "Everything About You", desc: "You are my favorite person, my best friend, and my whole heart." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-10 w-full max-w-xl mx-auto px-2 py-2"
    >
      {/* Editorial Frame Box */}
      <div className="bg-white/95 backdrop-blur-md border border-[#E63946]/20 rounded-3xl shadow-2xl overflow-hidden transition-all p-6 sm:p-8 relative">
        {/* Artistic Corner Accents */}
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#E63946]/30 pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#E63946]/30 pointer-events-none"></div>

        {/* Titlebar Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E63946]/10 text-xs font-semibold tracking-wider text-[#E63946]">
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 fill-[#E63946] text-[#E63946] animate-pulse" />
            <span className="font-bold tracking-widest uppercase">BIRTHDAY SURPRISE 🎉</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleSoundtrack}
              className="p-1.5 hover:bg-rose-50 rounded-full text-[#E63946] transition"
              title="Toggle Music"
            >
              {isPlayingMusic ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onReset}
              className="px-2 py-1 text-[11px] font-bold text-[#E63946] hover:bg-rose-50 rounded-md transition"
            >
              Close
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="py-6 flex flex-col items-center text-center relative">
          {/* Main Headline */}
          <motion.div
            initial={{ scale: 0.8, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="my-2"
          >
            <span className="text-[10px] font-black tracking-[0.4em] text-[#E63946] uppercase block mb-1">
              HAPPY BIRTHDAY TO MY GIRLFRIEND
            </span>
            <h1 className="serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#E63946] tracking-tight flex items-center justify-center gap-3">
              Happy Birthday! 🎂
            </h1>
            <p className="text-[#1E1E24] font-semibold text-sm sm:text-base mt-2">
              To {config.recipientName || 'My Beautiful Girlfriend'} 💕
            </p>
          </motion.div>

          {/* Happy Pixel Cat Animation */}
          <div className="my-3 cursor-pointer flex flex-col items-center" onClick={triggerConfetti} title="Click cat for extra birthday hearts!">
            <PixelCat isCelebration={true} scale={1.15} />
            <span className="text-[10px] text-stone-400 font-semibold block mt-1">
              (Tap the cat to blow out candles! 🕯️)
            </span>
          </div>

          {/* Days Together Counter */}
          {daysCount !== null && (
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 border border-[#E63946]/30 rounded-full text-xs font-bold text-[#E63946] shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-[#E63946]" />
              <span>{daysCount} Days Together & Counting!</span>
            </div>
          )}

          {/* Interactive Navigation Tabs */}
          <div className="flex space-x-1 bg-stone-100 p-1 rounded-full border border-stone-200 mb-5 w-full max-w-md text-xs font-bold">
            <button
              onClick={() => setActiveTab('letter')}
              className={`flex-1 py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-all ${
                activeTab === 'letter'
                  ? 'bg-[#E63946] text-white shadow-sm'
                  : 'text-[#1E1E24] hover:bg-stone-200'
              }`}
            >
              <MailOpen className="w-3.5 h-3.5" />
              Love Note
            </button>
            <button
              onClick={() => setActiveTab('reasons')}
              className={`flex-1 py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-all ${
                activeTab === 'reasons'
                  ? 'bg-[#E63946] text-white shadow-sm'
                  : 'text-[#1E1E24] hover:bg-stone-200'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              Why I Love You
            </button>
          </div>

          {/* Tab Content Display */}
          <AnimatePresence mode="wait">
            {activeTab === 'letter' && (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full bg-[#FFF9F5] border border-[#E63946]/20 rounded-2xl p-6 text-left shadow-xs relative max-w-md"
              >
                <div className="absolute top-4 right-4 text-[#E63946]/20">
                  <Heart className="w-8 h-8 fill-current" />
                </div>
                <h3 className="serif font-bold text-[#E63946] text-lg mb-2">
                  Dear {config.recipientName || 'My Dearest'},
                </h3>
                <p className="text-[#1E1E24] text-sm leading-relaxed whitespace-pre-wrap font-normal">
                  {config.customMessage ||
                    "I knew from the very second you walked into my life that you were special. You bring so much joy, warmth, and magic into my days. Thank you for choosing me every single day. I love you more than words can ever explain! ❤️"}
                </p>
                <div className="mt-5 pt-3 border-t border-[#E63946]/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#E63946] italic">
                    — Yours Always ♡
                  </span>
                  <button
                    onClick={copyLoveNote}
                    className="text-xs font-bold text-[#E63946] hover:underline flex items-center gap-1"
                  >
                    {copiedLetter ? 'Copied! ✨' : 'Copy Note'}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'reasons' && (
              <motion.div
                key="reasons"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-md space-y-2.5 text-left"
              >
                {loveReasons.map((reason, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-stone-200 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs hover:border-[#E63946]/40 transition"
                  >
                    <div className="w-6 h-6 rounded-full bg-rose-50 text-[#E63946] font-bold text-xs flex items-center justify-center shrink-0 border border-[#E63946]/20">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1E1E24] text-xs sm:text-sm">{reason.title}</h4>
                      <p className="text-stone-600 text-xs mt-0.5">{reason.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full max-w-md">
            <button
              onClick={triggerConfetti}
              className="btn-glow px-6 py-3 bg-[#E63946] hover:bg-[#d62839] text-white font-bold text-xs sm:text-sm rounded-full shadow-md flex items-center gap-2 active:scale-95 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Celebrate Extra Confetti!
            </button>
            <button
              onClick={onReset}
              className="px-6 py-3 bg-white hover:bg-rose-50 text-[#1E1E24] font-semibold text-xs sm:text-sm rounded-full border border-stone-300 shadow-xs flex items-center gap-2 active:scale-95 transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#E63946]" />
              Play Again
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

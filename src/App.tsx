import React, { useState } from 'react';
import { RetroWindow } from './components/RetroWindow';
import { CelebrationModal } from './components/CelebrationModal';
import { CustomizerModal } from './components/CustomizerModal';
import { HeartBackground } from './components/HeartBackground';
import { AppConfig } from './types';
import { Settings, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<AppConfig>({
    title: 'Happy Birthday BABIII! 🎂 Will you celebrate with me?',
    recipientName: 'To My Favorite Girlfriend',
    anniversaryDate: '',
    customMessage:
      'Happy Birthday to the most beautiful, caring, and amazing girlfriend in the world! You bring so much joy, warmth, and laughter into my life every single day. I hope all your birthday wishes come true today and forever. I love you endlessly! ❤️🎂✨',
    enableMusic: true,
    enableSoundEffects: true,
  });

  const [hasSelectedYes, setHasSelectedYes] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#1E1E24] flex flex-col justify-between items-center relative overflow-hidden font-sans selection:bg-rose-200">
      {/* Background Watermark Text from Artistic Flair */}
      <div className="bg-watermark font-serif">HAPPY BIRTHDAY</div>

      {/* Floating Ambient Hearts Background */}
      <HeartBackground isCelebration={hasSelectedYes} />

      {/* Top Navbar Header */}
      <header className="w-full max-w-4xl px-6 py-6 flex items-center justify-between z-20 relative">
        <div className="flex flex-col">
          <span className="text-[10px] font-black tracking-[0.4em] text-[#E63946] uppercase mb-0.5">
            BIRTHDAY SURPRISE CARD 🎂
          </span>
          <span className="serif text-xl sm:text-2xl font-black text-[#1E1E24] tracking-tight">
            For My Girlfriend
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-4 py-2 bg-white text-[#E63946] border border-[#E63946]/30 hover:border-[#E63946] font-semibold text-xs rounded-full shadow-xs flex items-center gap-2 transition active:scale-95"
          >
            <Settings className="w-3.5 h-3.5 text-[#E63946]" />
            <span>Customize</span>
          </button>
          <div className="hidden sm:block text-right">
            <span className="text-[9px] font-semibold opacity-40 block tracking-widest uppercase">Location</span>
            <span className="text-xs font-light text-[#1E1E24]">HEART_SPACE_ALPHA</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-1 flex items-center justify-center px-4 py-4 z-10 relative">
        {!hasSelectedYes ? (
          <RetroWindow
            config={config}
            onSelectYes={() => setHasSelectedYes(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        ) : (
          <CelebrationModal
            config={config}
            onReset={() => setHasSelectedYes(false)}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}
      </main>

      {/* Footer from Artistic Flair design */}
      <footer className="w-full max-w-4xl px-6 py-4 z-20 relative flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
        <div className="max-w-xs text-[11px] leading-relaxed opacity-60 uppercase tracking-tight text-center sm:text-left">
          Warning: Selecting 'No' results in button relocation maneuvers. The heart is persistent and accepts only positive inputs.
        </div>
        <div className="flex gap-8 items-center">
          <div className="text-center">
            <div className="text-xs font-black text-[#E63946]">99.9%</div>
            <div className="text-[8px] opacity-50 tracking-widest uppercase">SUCCESS</div>
          </div>
          <div className="text-center">
            <div className="text-xs font-black text-[#1E1E24]">0.0%</div>
            <div className="text-[8px] opacity-50 tracking-widest uppercase">REFUSAL</div>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <CustomizerModal
          config={config}
          onChangeConfig={(newCfg) => setConfig(newCfg)}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}

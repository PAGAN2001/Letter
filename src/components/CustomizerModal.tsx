import React from 'react';
import { X, Heart, Music, Sparkles } from 'lucide-react';
import { AppConfig } from '../types';

interface CustomizerModalProps {
  config: AppConfig;
  onChangeConfig: (newConfig: AppConfig) => void;
  onClose: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  config,
  onChangeConfig,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#1E1E24]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#E63946]/30 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-[#E63946] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 fill-white text-white" />
            <span className="serif font-black text-base tracking-tight">Customize Birthday Card</span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-rose-200 p-1 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-[#1E1E24]">
          <div>
            <label className="block text-xs font-bold text-[#E63946] uppercase mb-1">
              Birthday Headline / Question
            </label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => onChangeConfig({ ...config, title: e.target.value })}
              placeholder="e.g. Happy Birthday, My Love! 🎂 Will you celebrate with me?"
              className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#E63946]/20 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#E63946]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#E63946] uppercase mb-1">
              Recipient Name / Nickname
            </label>
            <input
              type="text"
              value={config.recipientName}
              onChange={(e) => onChangeConfig({ ...config, recipientName: e.target.value })}
              placeholder="e.g. My Love, Cutie, Babe"
              className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#E63946]/20 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#E63946]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#E63946] uppercase mb-1">
              Anniversary / Special Date (Optional)
            </label>
            <input
              type="date"
              value={config.anniversaryDate}
              onChange={(e) => onChangeConfig({ ...config, anniversaryDate: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#E63946]/20 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#E63946]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#E63946] uppercase mb-1">
              Custom Love Letter Message
            </label>
            <textarea
              rows={3}
              value={config.customMessage}
              onChange={(e) => onChangeConfig({ ...config, customMessage: e.target.value })}
              placeholder="Write your sweet love letter here..."
              className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#E63946]/20 rounded-xl text-sm font-medium focus:outline-none focus:border-[#E63946] resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-stone-100">
            <span className="text-xs font-bold text-[#1E1E24] flex items-center gap-1.5">
              <Music className="w-4 h-4 text-[#E63946]" /> Enable Cute Music BGM
            </span>
            <input
              type="checkbox"
              checked={config.enableMusic}
              onChange={(e) => onChangeConfig({ ...config, enableMusic: e.target.checked })}
              className="w-4 h-4 accent-[#E63946] rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1E1E24] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Enable Pop Sound Effects
            </span>
            <input
              type="checkbox"
              checked={config.enableSoundEffects}
              onChange={(e) => onChangeConfig({ ...config, enableSoundEffects: e.target.checked })}
              className="w-4 h-4 accent-[#E63946] rounded cursor-pointer"
            />
          </div>

          <div className="pt-3">
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#E63946] hover:bg-[#d62839] text-white font-bold text-sm rounded-full shadow-md transition active:scale-98"
            >
              Save & View Birthday Card 💕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

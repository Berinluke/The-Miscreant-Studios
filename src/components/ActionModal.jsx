import React from 'react';
import { X, Play, Shield, Zap, Sparkles } from 'lucide-react';
import { hudAudio } from './AudioEngine';

export default function ActionModal({ isOpen, mode, character, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#111116] border border-[#ff2a3b]/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(255,42,59,0.3)]">
        {/* Close Button */}
        <button
          onClick={() => {
            hudAudio.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-[#ff2a3b] text-white hover:text-black transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {mode === 'watch' ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff2a3b] uppercase mb-2">
              <Play className="h-3.5 w-3.5 fill-[#ff2a3b]" />
              <span>TRANSMISSION STREAM // 1080P 120 FPS</span>
            </div>
            <h3 className="font-orbitron text-2xl font-black text-white uppercase">
              {character.name} — CINEMATIC DEPLOYMENT
            </h3>
            <p className="mt-2 text-sm text-neutral-300 font-sans leading-relaxed">
              {character.desc}
            </p>

            <div className="mt-6 aspect-video w-full rounded-xl bg-black border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
              <img 
                src="/assets/operator-character.png" 
                alt="Cinematic Preview" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#ff2a3b] flex items-center justify-center shadow-[0_0_25px_#ff2a3b] cursor-pointer hover:scale-110 transition-transform">
                  <Play className="h-6 w-6 fill-white text-white translate-x-0.5" />
                </div>
                <span className="text-xs font-mono tracking-widest text-white/90 uppercase font-bold">
                  PLAY COMBAT SHOWREEL
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff2a3b] uppercase mb-2">
              <Shield className="h-3.5 w-3.5" />
              <span>COLLECTION ARCHIVE // DECK OVERVIEW</span>
            </div>
            <h3 className="font-orbitron text-2xl font-black text-white uppercase">
              {character.name} SPIRIT CARDS
            </h3>
            <p className="mt-2 text-sm text-neutral-300 font-sans leading-relaxed">
              {character.lore}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="p-3 bg-black/60 border border-white/10 rounded-xl text-center">
                <Sparkles className="h-5 w-5 text-[#ff2a3b] mx-auto mb-1" />
                <div className="text-xs font-mono font-bold text-white">Tier: Cosmic</div>
                <div className="text-[10px] text-neutral-400">Rarity: 0.04%</div>
              </div>
              <div className="p-3 bg-black/60 border border-white/10 rounded-xl text-center">
                <Zap className="h-5 w-5 text-[#ff2a3b] mx-auto mb-1" />
                <div className="text-xs font-mono font-bold text-white">Power: 9,840</div>
                <div className="text-[10px] text-neutral-400">Energy Pulse</div>
              </div>
              <div className="p-3 bg-black/60 border border-white/10 rounded-xl text-center">
                <Shield className="h-5 w-5 text-[#ff2a3b] mx-auto mb-1" />
                <div className="text-xs font-mono font-bold text-white">Armor: Kinetic</div>
                <div className="text-[10px] text-neutral-400">128Hz Tick</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-[#ff2a3b] hover:bg-[#e0192a] text-black font-orbitron font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(255,42,59,0.4)]"
            >
              Confirm Deck Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { X, Check, Copy, Shield, Cpu, Flame, ExternalLink } from 'lucide-react';
import { hudAudio } from './AudioEngine';

export default function StudioModal({ isOpen, initialTab = 'contact', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    hudAudio.playClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0e0e12] border border-[#ff1f3d]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(255,31,61,0.3)]">
        {/* Close Button */}
        <button
          onClick={() => {
            hudAudio.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-[#ff1f3d] text-white hover:text-black transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Nav Tabs */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
          {['GAMES', 'ENGINE 128HZ', 'CONTACT'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                hudAudio.playClick();
                setActiveTab(tab.toLowerCase().split(' ')[0]);
              }}
              className={`text-xs font-mono tracking-wider uppercase px-3 py-1.5 rounded transition-all ${
                activeTab === tab.toLowerCase().split(' ')[0]
                  ? 'bg-[#ff1f3d] text-white font-bold shadow-[0_0_12px_#ff1f3d]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content based on Tab */}
        {activeTab === 'games' ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff1f3d] uppercase mb-2">
              <Flame className="h-4 w-4" />
              <span>ACTIVE COMBAT ARSENAL</span>
            </div>
            <h3 className="font-dominate text-4xl text-white uppercase">
              PROJECT: OVERKILL (128 HZ)
            </h3>
            <p className="mt-2 text-sm text-neutral-300 font-sans leading-relaxed">
              Cyber-tactical arena brawler featuring sub-millisecond input queues, dynamic environmental destruction, and zero hitscan mercy.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-black/60 border border-white/10 rounded-xl">
                <span className="text-[10px] font-mono text-neutral-500 uppercase">TICK RATE</span>
                <div className="font-dominate text-2xl text-[#ff1f3d]">128 HZ</div>
                <span className="text-[10px] text-neutral-400">Bare-Metal Server</span>
              </div>
              <div className="p-3 bg-black/60 border border-white/10 rounded-xl">
                <span className="text-[10px] font-mono text-neutral-500 uppercase">INPUT BUFFER</span>
                <div className="font-dominate text-2xl text-white">0.4 MS</div>
                <span className="text-[10px] text-neutral-400">AVX-512 SIMD</span>
              </div>
              <div className="p-3 bg-black/60 border border-white/10 rounded-xl">
                <span className="text-[10px] font-mono text-neutral-500 uppercase">TARGET FPS</span>
                <div className="font-dominate text-2xl text-[#ff1f3d]">144+ FPS</div>
                <span className="text-[10px] text-neutral-400">Rollback Netcode</span>
              </div>
            </div>
          </div>
        ) : activeTab === 'engine' ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff1f3d] uppercase mb-2">
              <Cpu className="h-4 w-4" />
              <span>BARE-METAL COMPUTATION SPECIFICATION</span>
            </div>
            <h3 className="font-dominate text-4xl text-white uppercase">
              128 HZ TICK ARCHITECTURE
            </h3>
            <p className="mt-2 text-sm text-neutral-300 font-sans leading-relaxed">
              Every arena runs on dedicated bare-metal Linux servers. No peer-to-peer compromise, no rubberbanding, and 100% deterministic physics sub-stepping.
            </p>
            <div className="mt-4 p-4 bg-black/50 border border-white/10 rounded-xl font-mono text-xs text-neutral-300 space-y-1">
              <div>// SERVER SIMULATION CLUSTER</div>
              <div className="text-[#ff1f3d]">&gt; NODE: CHENNAI (13.0827° N, 80.2707° E)</div>
              <div className="text-white">&gt; NETCODE: Deterministic Rollback UDP</div>
              <div className="text-neutral-400">&gt; PHYSICS: 0.4ms AVX-512 Sub-Stepped Collision</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff1f3d] uppercase mb-2">
              <Shield className="h-4 w-4" />
              <span>STUDIO DIRECT UPLINK</span>
            </div>
            <h3 className="font-dominate text-4xl text-white uppercase">
              CONNECT WITH THE MISCREANT STUDIOS
            </h3>
            <p className="mt-2 text-sm text-neutral-300 font-sans leading-relaxed">
              Headquartered in Chennai, India (`13.0827° N, 80.2707° E`). For publishing partnerships, investor relations, or developer auditions.
            </p>

            <div className="mt-6 p-4 bg-black/60 border border-white/10 rounded-xl flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase">OFFICIAL EMAIL CHANNEL</div>
                <div className="font-mono text-sm text-white font-bold mt-0.5">themiscreantstudios@gmail.com</div>
              </div>
              <button
                onClick={() => handleCopy('themiscreantstudios@gmail.com')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ff1f3d] hover:bg-[#e01633] text-white text-xs font-bold rounded transition-all active:scale-95"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs font-mono text-neutral-400">
              <a 
                href="https://github.com/Berinluke" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white flex items-center gap-1 underline underline-offset-4"
              >
                <span>GITHUB REPOSITORY</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <span>•</span>
              <span>CAREERS: career.themiscreantstudios@gmail.com</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

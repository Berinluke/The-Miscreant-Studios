import React, { useState, useRef } from 'react';
import { gameUniverse } from '../data/studioData';
import { ChevronRight } from 'lucide-react';
import ShinobiBattleStage from './ShinobiBattleStage';

export default function Slide2Multiverse() {
  const [selectedGame, setSelectedGame] = useState(gameUniverse[0]);

  return (
    <section 
      id="games" 
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 bg-transparent flex flex-col justify-center select-none border-t border-slate-800 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12 px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider chalk-coral">
              Portfolio
            </span>
            <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none chalk-title">
              OUR GAMES
            </h2>
            <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed">
              From instant-fun hyper-casual reflex mechanics to rich, cinematic story-based narrative journeys.
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5 self-end pb-1">
            <span className="text-xs font-semibold chalk-mint whitespace-nowrap">
              4 Titles • 1 Released &amp; 3 in Active Development
            </span>
            {/* Mild Chalk Gaming Physics Formulas */}
            <div className="hidden sm:flex items-center gap-2.5 text-xs font-hand text-slate-400 opacity-75 select-none">
              <span>v = v₀ + a·t</span>
              <span>•</span>
              <span className="text-[#67E8F9]">Raycast(p, dir)</span>
              <span>•</span>
              <span className="text-[#FDE047]">★ Crit x2.5</span>
            </div>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8">
          
          {/* Left: Game List Selection (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {gameUniverse.map((game) => {
              const isSelected = selectedGame.id === game.id;
              const isReleased = game.status === 'Released';
              return (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#183526] text-white border-slate-300 shadow-[0_0_16px_rgba(255,255,255,0.1)]'
                      : 'bg-[#13261C] hover:bg-[#162D20] text-slate-200 border-slate-700/80 hover:border-slate-500'
                  }`}
                >
                  <div>
                    <div className="font-bebas text-2xl tracking-wide leading-none chalk-text">
                      {game.title}
                    </div>
                    <div className={`text-xs font-normal mt-1 ${
                      isSelected ? 'text-slate-300' : 'text-slate-400'
                    }`}>
                      {game.genre}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : isReleased 
                          ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {game.status}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-0.5 text-[#FB7185]' : 'text-slate-500'}`} />
                  </div>
                </button>
              );
            })}

            {/* Mild Classroom Chalkboard Gaming Doodles: Tic-Tac-Toe (O-Win) & Telemetry */}
            <div className="p-3.5 rounded-xl border border-dashed border-slate-700/60 bg-[#13261C]/50 opacity-80 select-none flex items-center justify-between mt-2">
              {/* Tic-Tac-Toe O-Win */}
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
                <line x1="26" y1="4" x2="26" y2="52" stroke="#94A3B8" strokeWidth="1" strokeDasharray="12 2 16 1" />
                <line x1="52" y1="4" x2="52" y2="52" stroke="#94A3B8" strokeWidth="1" strokeDasharray="14 2 18 1" />
                <line x1="4" y1="20" x2="74" y2="20" stroke="#94A3B8" strokeWidth="1" strokeDasharray="18 2 24 1" />
                <line x1="4" y1="36" x2="74" y2="36" stroke="#94A3B8" strokeWidth="1" strokeDasharray="16 2 26 1" />
                <text x="10" y="16" fill="#FB7185" fontFamily="Caveat" fontSize="13">X</text>
                <text x="36" y="16" fill="#67E8F9" fontFamily="Caveat" fontSize="13">O</text>
                {/* O winning row */}
                <text x="10" y="32" fill="#67E8F9" fontFamily="Caveat" fontSize="13" fontWeight="bold">O</text>
                <text x="36" y="32" fill="#67E8F9" fontFamily="Caveat" fontSize="13" fontWeight="bold">O</text>
                <text x="61" y="32" fill="#67E8F9" fontFamily="Caveat" fontSize="13" fontWeight="bold">O</text>
                <line x1="4" y1="28" x2="74" y2="28" stroke="#FDE047" strokeWidth="1.6" strokeLinecap="round" />
                <text x="10" y="48" fill="#FB7185" fontFamily="Caveat" fontSize="13">X</text>
                <text x="61" y="48" fill="#FB7185" fontFamily="Caveat" fontSize="13">X</text>
              </svg>

              {/* Gaming Formula & Health Bar */}
              <div className="flex flex-col text-right font-hand text-xs space-y-0.5">
                <span className="text-[#86EFAC]">HP: [██████░░] 78%</span>
                <span className="text-slate-300">FOV = 90° • Ping &lt; 12ms</span>
                <span className="text-[#FDE047]">COMBO x99 ⚡</span>
              </div>
            </div>
          </div>

          {/* Right: Selected Game Presentation Card (7 cols) with Shinobi Battle Arena along the Marked Roof */}
          <div className="lg:col-span-7 relative">
            
            {/* Naruto vs Sasuke Shinobi War Battle Stage on the Card Roof (60 FPS Native Canvas) */}
            <div className="absolute -top-[108px] left-0 right-0 h-[110px] pointer-events-none overflow-visible z-20">
              <ShinobiBattleStage />
            </div>

            <div className="p-8 sm:p-10 rounded-2xl border border-slate-600/70 bg-[#162D20] space-y-6 relative z-10 shadow-2xl">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-700/80">
                <span className="text-xs font-bold uppercase tracking-wider chalk-coral">
                  {selectedGame.badge}
                </span>
                <span className="text-xs font-medium text-slate-400 font-mono">
                  {selectedGame.engine}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-bebas text-5xl sm:text-6xl tracking-wide leading-none chalk-title">
                  {selectedGame.title}
                </h3>
                <p className="text-base font-semibold chalk-yellow">
                  {selectedGame.tagline}
                </p>
                <p className="text-slate-300 text-base leading-relaxed pt-1">
                  {selectedGame.description}
                </p>
              </div>

              {/* Clean Telemetry Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-700/80">
                {Object.entries(selectedGame.stats).map(([key, val], i) => (
                  <div key={i} className="bg-[#13261C] p-3.5 rounded-xl border border-slate-700">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {key}
                    </span>
                    <span className="font-bebas text-2xl chalk-text leading-tight">
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Core Mechanics:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedGame.keyFeatures.map((feat, i) => (
                    <div 
                      key={i} 
                      className="p-3 rounded-lg bg-[#13261C] border border-slate-700 text-xs font-medium text-slate-200"
                    >
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

import React, { useState, useRef } from 'react';
import { gameUniverse } from '../data/studioData';
import { ChevronRight } from 'lucide-react';
import ShinobiBattleStage from './ShinobiBattleStage';

export default function Slide2Multiverse() {
  const [selectedGame, setSelectedGame] = useState(gameUniverse[0]);

  return (
    <section 
      id="games" 
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 bg-transparent flex flex-col justify-center select-none border-t border-slate-200 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12 pl-6 sm:pl-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF2A5F]">
              Portfolio
            </span>
            <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl text-slate-950 tracking-tight leading-none">
              OUR GAMES
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
              Every title is built from scratch around fluid player controls, destructible physics, and high-tick multiplayer netcode.
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap self-end pb-1">
            5 Titles in Active Development &amp; Live Service
          </span>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8">
          
          {/* Left: Game List Selection (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {gameUniverse.map((game) => {
              const isSelected = selectedGame.id === game.id;
              return (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                      : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-bebas text-2xl tracking-wide leading-none">
                      {game.title}
                    </div>
                    <div className={`text-xs font-normal mt-1 ${
                      isSelected ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {game.genre}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {game.stats.tick || game.stats.fps || 'Active'}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-0.5 text-[#FF2A5F]' : 'text-slate-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Game Presentation Card (7 cols) with Shinobi Battle Arena along the Marked Red Roof */}
          <div className="lg:col-span-7 relative">
            
            {/* Naruto vs Sasuke Shinobi War Battle Stage on the Card Roof */}
            <div className="absolute -top-[68px] left-0 right-0 h-[76px] pointer-events-none overflow-visible z-20">
              <ShinobiBattleStage />
            </div>

            <div className="p-8 sm:p-10 rounded-2xl border border-slate-200 bg-[#FAFAFA] space-y-6 relative z-10 shadow-sm">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF2A5F]">
                  {selectedGame.badge}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {selectedGame.engine}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-bebas text-5xl sm:text-6xl text-slate-950 tracking-wide leading-none">
                  {selectedGame.title}
                </h3>
                <p className="text-base font-semibold text-slate-800">
                  {selectedGame.tagline}
                </p>
                <p className="text-slate-600 text-base leading-relaxed pt-1">
                  {selectedGame.description}
                </p>
              </div>

              {/* Clean Telemetry Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/80">
                {Object.entries(selectedGame.stats).map(([key, val], i) => (
                  <div key={i} className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {key}
                    </span>
                    <span className="font-bebas text-2xl text-slate-950 leading-tight">
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Core Mechanics:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedGame.keyFeatures.map((feat, i) => (
                    <div 
                      key={i} 
                      className="p-3 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-800"
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

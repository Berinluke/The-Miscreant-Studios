import React from 'react';
import { studioManifesto, leadershipTeam, studioInfo } from '../data/studioData';
import { Globe, Github } from 'lucide-react';

export default function Slide4StudioCulture() {
  return (
    <section 
      id="culture" 
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 bg-transparent flex flex-col justify-center select-none border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16 px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider chalk-coral">
              Studio &amp; Culture
            </span>
            <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none chalk-title">
              HOW WE BUILD
            </h2>
            <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed">
              A 100% remote-first studio. We combine low-level systems engineering with complete creative freedom. No publisher interference, no corporate committees, zero-crunch pacing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Remote-First Studio • Worldwide Collaboration</span>
          </div>
        </div>

        {/* Studio Manifesto Banner */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#162D20] text-white space-y-4 border border-slate-700/80 shadow-2xl">
          <span className="text-xs font-bold uppercase tracking-wider chalk-coral">
            Studio Manifesto
          </span>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bebas tracking-wide leading-snug chalk-title">
            "{studioManifesto.quote}"
          </p>
          <span className="text-xs chalk-mint font-medium block pt-2">
            Independent Studio • 100% Remote-First
          </span>
        </div>

        {/* The 4 Principles */}
        <div className="space-y-6">
          <h3 className="font-bebas text-3xl tracking-wide chalk-title">
            THE 4 STUDIO PRINCIPLES
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studioManifesto.rules.map((rule, idx) => (
              <div 
                key={idx}
                className="bg-[#13261C] p-7 rounded-2xl border border-slate-700/80 space-y-3 flex flex-col justify-between hover:border-slate-500 transition-colors"
              >
                <div>
                  <span className="font-bebas text-4xl chalk-coral leading-none block">
                    {rule.num}
                  </span>
                  <h4 className="font-bebas text-2xl mt-3 leading-none chalk-text">
                    {rule.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                    {rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="space-y-6 pt-4">
          <h3 className="font-bebas text-3xl tracking-wide chalk-title">
            CORE TEAM
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadershipTeam.map((leader, idx) => (
              <div 
                key={idx}
                className="bg-[#13261C] p-8 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row gap-6 items-start hover:border-slate-500 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#183526] border border-slate-500 flex-shrink-0 flex items-center justify-center font-bebas text-3xl tracking-wider chalk-text">
                  {leader.initials}
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bebas text-3xl leading-none chalk-text">
                        {leader.name}
                      </h4>
                      <span className="text-xs font-bold chalk-coral uppercase tracking-wider">
                        {leader.role}
                      </span>
                    </div>

                    {leader.github && leader.github !== '#' && (
                      <a 
                        href={leader.github} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-[#183526] hover:bg-slate-700 text-slate-200 transition-colors border border-slate-600"
                        title="GitHub Profile"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-normal pt-1">
                    {leader.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-3">
                    {leader.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="text-xs font-medium px-3 py-1 rounded-md bg-[#162D20] border border-slate-700 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { studioManifesto, leadershipTeam, studioInfo } from '../data/studioData';
import { Globe, Github } from 'lucide-react';

export default function Slide4StudioCulture() {
  return (
    <section 
      id="culture" 
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 bg-transparent flex flex-col justify-center select-none border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16 pl-6 sm:pl-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF2A5F]">
              Studio &amp; Culture
            </span>
            <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl text-slate-950 tracking-tight leading-none">
              HOW WE BUILD
            </h2>
            <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed">
              A 100% remote-first studio. We combine low-level systems engineering with complete creative freedom. No publisher interference, no corporate committees, zero-crunch pacing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Remote-First Studio • Worldwide Collaboration</span>
          </div>
        </div>

        {/* Studio Manifesto Banner */}
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-950 text-white space-y-4 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF2A5F]">
            Studio Manifesto
          </span>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bebas tracking-wide leading-snug">
            "{studioManifesto.quote}"
          </p>
          <span className="text-xs text-slate-400 font-medium block pt-2">
            Independent Studio • 100% Remote-First
          </span>
        </div>

        {/* The 4 Principles */}
        <div className="space-y-6">
          <h3 className="font-bebas text-3xl text-slate-950 tracking-wide">
            THE 4 STUDIO PRINCIPLES
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studioManifesto.rules.map((rule, idx) => (
              <div 
                key={idx}
                className="bg-[#FAFAFA] p-7 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <span className="font-bebas text-4xl text-[#FF2A5F] leading-none block">
                    {rule.num}
                  </span>
                  <h4 className="font-bebas text-2xl text-slate-950 mt-3 leading-none">
                    {rule.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    {rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="space-y-6 pt-4">
          <h3 className="font-bebas text-3xl text-slate-950 tracking-wide">
            CORE TEAM
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadershipTeam.map((leader, idx) => (
              <div 
                key={idx}
                className="bg-[#FAFAFA] p-8 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-950 text-white flex-shrink-0 flex items-center justify-center font-bebas text-3xl tracking-wider">
                  {leader.initials}
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bebas text-3xl text-slate-950 leading-none">
                        {leader.name}
                      </h4>
                      <span className="text-xs font-bold text-[#FF2A5F] uppercase tracking-wider">
                        {leader.role}
                      </span>
                    </div>

                    {leader.github && leader.github !== '#' && (
                      <a 
                        href={leader.github} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-white hover:bg-slate-200 text-slate-800 transition-colors border border-slate-200"
                        title="GitHub Profile"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal pt-1">
                    {leader.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-3">
                    {leader.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="text-xs font-medium px-3 py-1 rounded-md bg-white border border-slate-200 text-slate-700"
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

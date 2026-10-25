import React, { useState } from 'react';
import { careerJobs, studioInfo } from '../data/studioData';
import { Mail, ArrowRight, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Slide5DispatchCareers({ onSelectJob }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#FF2A5F', '#FFA000', '#2563EB', '#10B981']
    });
  };

  return (
    <section 
      id="careers" 
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 bg-transparent flex flex-col justify-center select-none border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16 pl-6 sm:pl-12">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider chalk-coral">
              Careers
            </span>
            <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none chalk-title">
              JOIN THE TEAM
            </h2>
            <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed">
              We actively welcome ambitious freshers and junior developers. If you have raw drive and want to build great games without corporate red tape, we want to hear from you.
            </p>
          </div>
        </div>

        {/* 7 Open Vacancies */}
        <div className="space-y-6">
          <h3 className="font-bebas text-3xl tracking-wide chalk-title">
            OPEN POSITIONS (7)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerJobs.map((job) => (
              <div 
                key={job.id}
                className="bg-[#13261C] p-7 rounded-2xl border border-slate-700/80 shadow-md hover:border-slate-500 transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
                    <span className="text-xs font-bold uppercase tracking-wider chalk-coral">
                      {job.level}
                    </span>
                    <span className="text-xs font-mono text-emerald-400">
                      100% Remote
                    </span>
                  </div>

                  <h4 className="font-bebas text-3xl text-white leading-tight chalk-text">
                    {job.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {job.desc}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Skills:
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-200">
                      {job.skills}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    Full-Time
                  </span>

                  <button
                    onClick={() => {
                      triggerConfetti();
                      if (onSelectJob) onSelectJob(job);
                    }}
                    className="chalk-btn-primary flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95"
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Card */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#162D20] text-white space-y-8 border border-slate-700/80 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-700/80 pb-8">
            <div className="space-y-2">
              <span className="text-xs font-bold chalk-coral uppercase tracking-wider">
                Direct Contact
              </span>
              <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide leading-none chalk-title">
                DROP US A LINE
              </h3>
              <p className="text-slate-300 text-sm sm:text-base font-normal max-w-xl">
                Looking to collaborate, pitch an idea, or join our development cluster? Our team reads every submission directly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a 
                href={`mailto:${studioInfo.emails.careers}?subject=Application%20for%20The%20Miscreant%20Studios`}
                onClick={triggerConfetti}
                className="chalk-btn-primary px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email Us</span>
              </a>

              <button
                onClick={() => handleCopyEmail(studioInfo.emails.careers)}
                className="chalk-btn-secondary px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div>
              <span className="text-slate-400 block text-xs">CAREERS:</span>
              <span className="text-white font-medium">{studioInfo.emails.careers}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">GENERAL INQUIRIES:</span>
              <span className="text-white font-medium">{studioInfo.emails.general}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-xs">STUDIO MODEL:</span>
              <span className="text-white font-medium">100% Remote / Global</span>
            </div>
          </div>
        </div>

        {/* Footer with Official Logo Emblem */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/studio-logo.png" 
              alt="The Miscreant Studios Emblem" 
              className="w-12 h-12 object-contain rounded-full shadow-md border border-slate-700" 
            />
            <div className="flex flex-col">
              <span className="font-bebas text-lg text-white leading-none chalk-title">
                THE MISCREANT STUDIOS
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Estd. 2026 • 100% Remote Studio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/Berinluke" target="_blank" rel="noreferrer" className="hover:text-white font-bold underline transition-colors">
              GitHub: Berinluke
            </a>
            <span>•</span>
            <span className="text-xs font-semibold text-slate-300">Built for players. Designed for chaos.</span>
          </div>
        </div>

      </div>
    </section>
  );
}

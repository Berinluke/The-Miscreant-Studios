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
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 bg-transparent flex flex-col justify-center select-none border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16 pl-6 sm:pl-12">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF2A5F]">
              Careers
            </span>
            <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl text-slate-950 tracking-tight leading-none">
              JOIN THE TEAM
            </h2>
            <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed">
              We actively welcome ambitious freshers and junior developers. If you have raw drive and want to build great games without corporate red tape, we want to hear from you.
            </p>
          </div>
        </div>

        {/* 7 Open Vacancies */}
        <div className="space-y-6">
          <h3 className="font-bebas text-3xl text-slate-950 tracking-wide">
            OPEN POSITIONS (7)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerJobs.map((job) => (
              <div 
                key={job.id}
                className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {job.level}
                    </span>
                    <span className="text-xs text-slate-400">
                      Chennai / Remote
                    </span>
                  </div>

                  <h4 className="font-bebas text-3xl text-slate-950 leading-tight">
                    {job.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {job.desc}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Skills:
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-800">
                      {job.skills}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Full-Time
                  </span>

                  <button
                    onClick={() => {
                      triggerConfetti();
                      if (onSelectJob) onSelectJob(job);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-950 hover:bg-[#FF2A5F] text-white text-xs font-bold uppercase tracking-wider transition-colors active:scale-95"
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
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-950 text-white space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#FF2A5F] uppercase tracking-wider">
                Direct Contact
              </span>
              <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide leading-none">
                DROP US A LINE
              </h3>
              <p className="text-slate-400 text-sm sm:text-base font-normal max-w-xl">
                Looking to collaborate, pitch an idea, or join our development cluster? Our team reads every submission directly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a 
                href={`mailto:${studioInfo.emails.careers}?subject=Application%20for%20The%20Miscreant%20Studios`}
                onClick={triggerConfetti}
                className="px-6 py-3.5 rounded-xl bg-[#FF2A5F] hover:bg-[#e01e4f] text-white text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email Us</span>
              </a>

              <button
                onClick={() => handleCopyEmail(studioInfo.emails.careers)}
                className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold uppercase tracking-wider border border-slate-700 transition-all flex items-center gap-2"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 block text-xs">CAREERS:</span>
              <span className="text-white font-medium">{studioInfo.emails.careers}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">GENERAL INQUIRIES:</span>
              <span className="text-white font-medium">{studioInfo.emails.general}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">HEADQUARTERS:</span>
              <span className="text-white font-medium">{studioInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Footer with Official Logo Emblem */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-200 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/studio-logo.png" 
              alt="The Miscreant Studios Emblem" 
              className="w-12 h-12 object-contain rounded-full shadow-sm" 
            />
            <div className="flex flex-col">
              <span className="font-bebas text-lg text-slate-900 leading-none">
                THE MISCREANT STUDIOS
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Estd. 2026 • Chennai, India
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/Berinluke" target="_blank" rel="noreferrer" className="hover:text-slate-950 font-bold underline">
              GitHub: Berinluke
            </a>
            <span>•</span>
            <span className="text-xs font-semibold text-slate-700">Built for players. Designed for chaos.</span>
          </div>
        </div>

      </div>
    </section>
  );
}

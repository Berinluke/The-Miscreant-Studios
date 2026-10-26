import React, { useState } from 'react';
import { studioInfo } from '../data/studioData';
import { X, Mail, Copy, Check, Sparkles, Send } from 'lucide-react';

export default function QuickApplyModal({ job, isOpen, onClose }) {
  if (!isOpen || !job) return null;

  const [copied, setCopied] = useState(false);

  const subject = encodeURIComponent(`Application for ${job.title} - The Miscreant Studios`);
  const body = encodeURIComponent(
    `Hello Berin and The Miscreant Studios Team,\n\nI am applying for the role of ${job.title}.\n\nMy Portfolio / Work link: \nMy Skills & Background: \nWhy I want to build games with The Miscreant Studios: \n\nLooking forward to hearing from you!\n`
  );
  const mailtoLink = `mailto:${studioInfo.emails.careers}?subject=${subject}&body=${body}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(studioInfo.emails.careers);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#162D20] rounded-2xl border-2 border-slate-500/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 space-y-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-[#13261C] hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors border border-slate-600"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 text-[11px] font-mono font-bold uppercase">
            <span>{job.level}</span>
          </div>
          <h3 className="font-bebas text-3xl sm:text-4xl leading-tight chalk-title">
            Apply: {job.title}
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            {job.type} • {studioInfo.location}
          </p>
        </div>

        {/* Job Summary */}
        <div className="p-4 rounded-xl bg-[#13261C] border border-slate-700 space-y-2">
          <p className="text-xs text-slate-300 leading-relaxed">
            {job.desc}
          </p>
          <div className="pt-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Required Skills:
            </span>
            <span className="text-xs font-bold chalk-yellow">
              {job.skills}
            </span>
          </div>
        </div>

        {/* Quick Instructions in Plain English */}
        <div className="text-xs text-slate-300 space-y-1">
          <p className="font-bold text-white">How to apply:</p>
          <p>Send an email to <span className="font-mono font-bold chalk-mint">{studioInfo.emails.careers}</span> with your resume and a link to your portfolio or past projects.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={mailtoLink}
            className="chalk-btn-primary flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Open Email Client</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="chalk-btn-secondary py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Email!' : 'Copy Email Address'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

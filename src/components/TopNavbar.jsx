import React, { useState, useEffect } from 'react';
import { studioInfo } from '../data/studioData';

export default function TopNavbar({ activeSlide, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'games', label: 'Games', target: '#games' },
    { id: 'culture', label: 'Studio', target: '#culture' },
    { id: 'careers', label: 'Careers', target: '#careers' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3.5 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Studio Brand with Official Logo */}
        <a 
          href="#hero" 
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate('hero');
            }
          }}
          className="flex items-center gap-3 text-slate-950 group focus:outline-none"
        >
          <img 
            src="/assets/studio-logo.png" 
            alt="The Miscreant Studios Logo" 
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-full border border-slate-300 shadow-sm group-hover:scale-105 transition-transform" 
          />
          <span className="font-bebas text-2xl sm:text-3xl tracking-wide uppercase leading-none group-hover:text-[#FF2A5F] transition-colors">
            {studioInfo.name}
          </span>
        </a>

        {/* Center: Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={item.target}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(item.id);
                }
              }}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                activeSlide === item.id
                  ? 'text-[#FF2A5F]'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${studioInfo.emails.general}`}
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-[#FF2A5F] transition-colors hidden sm:inline-block"
          >
            Contact
          </a>
          <a
            href="#careers"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('careers');
              }
            }}
            className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-[#FF2A5F] text-white text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-sm active:scale-95"
          >
            We're Hiring
          </a>
        </div>

      </div>
    </header>
  );
}

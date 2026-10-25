import React, { useState, useEffect } from 'react';
import Slide1HeroSkyDeck from './components/Slide1HeroSkyDeck';
import Slide2Multiverse from './components/Slide2Multiverse';
import Slide4StudioCulture from './components/Slide4StudioCulture';
import Slide5DispatchCareers from './components/Slide5DispatchCareers';
import QuickApplyModal from './components/QuickApplyModal';

export default function App() {
  const [activeSlide, setActiveSlide] = useState('hero');
  const [activeJobModal, setActiveJobModal] = useState(null);

  // Highlight active nav item on scroll & handle hash navigation
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'auto' }), 100);
      }
    }

    const sectionIds = ['hero', 'games', 'culture', 'careers'];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlide(entry.target.id);
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen chalkboard-bg text-slate-100 selection:bg-[#FB7185] selection:text-slate-950 flex flex-col font-sans chalkboard-hardware-frame relative">
      
      {/* 4 Galvanized Steel Corner Brackets with Heavy Bolted Rivets */}
      <div className="fixed top-0 left-0 w-8 h-8 md:w-12 md:h-12 pointer-events-none z-50 flex items-center justify-center">
        <div className="w-3.5 h-3.5 md:w-5 md:h-5 rounded-full bg-[#1A231E] border-2 border-[#52645B] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center">
          <div className="w-2 md:w-2.5 h-0.5 bg-[#64748B] rotate-45"></div>
        </div>
      </div>
      <div className="fixed top-0 right-0 w-8 h-8 md:w-12 md:h-12 pointer-events-none z-50 flex items-center justify-center">
        <div className="w-3.5 h-3.5 md:w-5 md:h-5 rounded-full bg-[#1A231E] border-2 border-[#52645B] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center">
          <div className="w-2 md:w-2.5 h-0.5 bg-[#64748B] -rotate-45"></div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-8 h-8 md:w-12 md:h-12 pointer-events-none z-50 flex items-center justify-center">
        <div className="w-3.5 h-3.5 md:w-5 md:h-5 rounded-full bg-[#1A231E] border-2 border-[#52645B] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center">
          <div className="w-2 md:w-2.5 h-0.5 bg-[#64748B] -rotate-12"></div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 pointer-events-none z-50 flex items-center justify-center">
        <div className="w-3.5 h-3.5 md:w-5 md:h-5 rounded-full bg-[#1A231E] border-2 border-[#52645B] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center">
          <div className="w-2 md:w-2.5 h-0.5 bg-[#64748B] rotate-30"></div>
        </div>
      </div>

      {/* Slide 1: Hero */}
      <Slide1HeroSkyDeck 
        onScrollDown={handleScrollTo} 
      />

      {/* Slide 2: Games Showcase */}
      <Slide2Multiverse />

      {/* Slide 3: Studio Culture & Team */}
      <Slide4StudioCulture />

      {/* Slide 4: Careers & Contact */}
      <Slide5DispatchCareers 
        onSelectJob={(job) => setActiveJobModal(job)} 
      />

      {/* 1-Click Job Application Modal */}
      <QuickApplyModal 
        job={activeJobModal} 
        isOpen={!!activeJobModal} 
        onClose={() => setActiveJobModal(null)} 
      />

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Slide1HeroSkyDeck from './components/Slide1HeroSkyDeck';
import Slide2Multiverse from './components/Slide2Multiverse';
import Slide3SiliconEngine from './components/Slide3SiliconEngine';
import Slide4ChennaiWarRoom from './components/Slide4ChennaiWarRoom';
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

    const sectionIds = ['hero', 'games', 'engine', 'culture', 'careers'];
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
    <div className="w-full min-h-screen notebook-ruled-bg notebook-margin-line text-slate-900 selection:bg-[#FF2A5F] selection:text-white flex flex-col font-sans">
      
      {/* Slide 1: Hero */}
      <Slide1HeroSkyDeck 
        onScrollDown={handleScrollTo} 
      />

      {/* Slide 2: Games Showcase */}
      <Slide2Multiverse />

      {/* Slide 3: 128Hz Engine */}
      <Slide3SiliconEngine />

      {/* Slide 4: Studio Culture & Team */}
      <Slide4ChennaiWarRoom />

      {/* Slide 5: Careers & Contact */}
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

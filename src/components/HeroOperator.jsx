import React, { useState, useEffect } from 'react';

export default function HeroOperator() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 18;
      const y = (e.clientY / innerHeight - 0.5) * 18;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute top-0 right-0 h-full w-full lg:w-3/5 pointer-events-none select-none z-10 overflow-hidden flex items-center justify-end">
      {/* 3D Combat Operator Layer */}
      <div 
        className="relative h-full w-full flex items-center justify-end transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${offset.x * 0.4}px, ${offset.y * 0.4}px) scale(1.02)`
        }}
      >
        <img 
          src="/assets/operator-character.png" 
          alt="Combat Operator" 
          className="h-full w-auto object-cover object-left-top max-w-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 100%)'
          }}
        />

        {/* Ambient Red Glow Halo */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-[#ff1f3d]/25 blur-[120px] pointer-events-none" />
      </div>
    </div>
  );
}

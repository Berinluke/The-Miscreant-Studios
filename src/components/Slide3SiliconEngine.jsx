import React, { useState, useEffect } from 'react';
import { techArsenal } from '../data/studioData';

export default function Slide3SiliconEngine() {
  const [sineOffset, setSineOffset] = useState(0);

  useEffect(() => {
    let animFrame;
    const animateWave = () => {
      setSineOffset(prev => (prev + 0.05) % (Math.PI * 2));
      animFrame = requestAnimationFrame(animateWave);
    };
    animFrame = requestAnimationFrame(animateWave);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const width = 700;
  const height = 90;
  const points = [];
  for (let x = 0; x <= width; x += 8) {
    const y = (height / 2) + Math.sin((x * 0.035) + sineOffset) * 22;
    points.push(`${x},${y}`);
  }
  const wavePath = `M ${points.join(' L ')}`;

  return (
    <section 
      id="engine" 
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 bg-transparent flex flex-col justify-center select-none border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16 pl-6 sm:pl-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF2A5F]">
            Technology
          </span>
          <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl text-slate-950 tracking-tight leading-none">
            THE 128Hz ENGINE
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed">
            Most multiplayer games update 60 times a second. We built our bare-metal netcode to simulate combat at <strong>128 updates every second</strong> — eliminating ghost bullets and ensuring instant, competitive hit registration.
          </p>
        </div>

        {/* 60Hz vs 128Hz Architectural Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Standard Games (60Hz) */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Industry Standard
              </span>
              <h3 className="font-bebas text-4xl text-slate-700 leading-none">
                60Hz TICK RATE
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Standard games calculate positions every 16.6 milliseconds. In high-speed gunfights, this creates lag compensation discrepancies, peekers advantage, and missed hitboxes.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs font-medium text-slate-500">
              <div className="flex items-center justify-between">
                <span>Packet Delay</span>
                <span className="font-bold text-slate-700">16.66 ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Fast Motion Tracking</span>
                <span className="font-bold text-slate-700">Approximated</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Hit Registration</span>
                <span className="font-bold text-slate-700">Lag-Compensated</span>
              </div>
            </div>
          </div>

          {/* The Miscreant Engine (128Hz) */}
          <div className="p-8 sm:p-10 rounded-2xl bg-slate-950 text-white shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF2A5F]">
                The Miscreant Standard
              </span>
              <h3 className="font-bebas text-4xl text-white leading-none">
                128Hz BARE-METAL SIMULATION
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our custom netcode cuts packet interval in half to 7.8 milliseconds. Bullets land exactly where your crosshair aims, with sub-2ms local input responsiveness.
              </p>
            </div>

            {/* Clean Waveform Visualizer */}
            <div className="w-full bg-slate-900/80 rounded-xl p-4 border border-slate-800">
              <svg 
                viewBox={`0 0 ${width} ${height}`} 
                className="w-full h-16 stroke-[#FF2A5F] fill-none"
              >
                <path d={wavePath} strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-slate-400">
                <span>SERVER TICK: 128 HZ</span>
                <span className="text-emerald-400">INTERVAL: 7.81 MS</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800 text-xs font-medium text-slate-300">
              <div className="flex items-center justify-between">
                <span>Packet Delay</span>
                <span className="font-bold text-emerald-400">7.81 ms (2x Faster)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Ballistics &amp; Physics</span>
                <span className="font-bold text-white">Sub-Stepped AVX-512</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Ghost Bullets</span>
                <span className="font-bold text-[#FF2A5F]">Eliminated</span>
              </div>
            </div>
          </div>

        </div>

        {/* Core Technology Stack */}
        <div className="space-y-6">
          <h3 className="font-bebas text-3xl text-slate-950 tracking-wide">
            ENGINE ARSENAL
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {techArsenal.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-xs font-bold text-[#FF2A5F] uppercase tracking-wider block">
                    {item.badge}
                  </span>
                  <h4 className="font-bebas text-3xl text-slate-950 mt-1 leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

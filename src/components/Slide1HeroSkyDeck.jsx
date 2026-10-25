import React, { useRef, useState } from 'react';
import JetMissionScrollytelling from './JetMissionScrollytelling';
import PlayableRacingGame from './PlayableRacingGame';

export default function Slide1HeroSkyDeck({ onScrollDown }) {
  const containerRef = useRef(null);
  const letterTRef = useRef(null);
  const [gamepadControl, setGamepadControl] = useState(null);

  const handleGamepadPress = (dir) => {
    setGamepadControl(dir);
    setTimeout(() => setGamepadControl(null), 100);
  };

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-2 px-1 sm:px-4 bg-transparent overflow-hidden select-none"
    >
      {/* Supersonic Fighter Jet Atmospheric Flyby */}
      <JetMissionScrollytelling
        containerRef={containerRef}
        letterTRef={letterTRef}
      />

      {/* Main Unified Chalkboard Hero Stage */}
      <div className="relative w-full max-w-[1380px] aspect-[1024/486] mx-auto select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-center justify-center">
        
        {/* Layer 1: Live Interactive 60 FPS HTML5 Canvas Racing Game */}
        <div 
          className="absolute z-0 overflow-hidden bg-black"
          style={{
            left: '62.4%',
            top: '20.5%',
            width: '26.2%',
            height: '33.2%',
          }}
        >
          <PlayableRacingGame externalControl={gamepadControl} />
        </div>

        {/* Layer 2: Master Authentic Chalkboard Artwork with Transparent Screen Cutout */}
        <img 
          src="/assets/chalkboard-hero-master.png" 
          alt="The Miscreant Studios - Built For Players. Designed For Chaos." 
          className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-10"
        />

        {/* Layer 3: Interactive Click Targets Over Hand-Drawn Chalk Buttons & Controls */}
        
        {/* Button 1: "Explore Our Games" (Chalk Oval) */}
        <a
          href="#games"
          onClick={(e) => {
            e.preventDefault();
            if (onScrollDown) onScrollDown('games');
          }}
          className="absolute z-20 cursor-pointer rounded-full hover:bg-white/15 active:scale-95 transition-all duration-150 border-2 border-transparent hover:border-amber-300/40 shadow-none hover:shadow-[0_0_15px_rgba(253,224,71,0.3)]"
          style={{
            left: '10.55%',
            top: '79.35%',
            width: '12.5%',
            height: '7.77%',
          }}
          title="Explore Our Games"
          aria-label="Explore Our Games"
        />

        {/* Button 2: "Studio Story ↗" (Chalk Capsule) */}
        <a
          href="#culture"
          onClick={(e) => {
            e.preventDefault();
            if (onScrollDown) onScrollDown('culture');
          }}
          className="absolute z-20 cursor-pointer rounded-full hover:bg-white/15 active:scale-95 transition-all duration-150 border-2 border-transparent hover:border-emerald-300/40 shadow-none hover:shadow-[0_0_15px_rgba(110,231,183,0.3)]"
          style={{
            left: '24.02%',
            top: '79.35%',
            width: '10.74%',
            height: '7.77%',
          }}
          title="Studio Story"
          aria-label="Studio Story"
        />

        {/* Gamepad Steering Targets (Clicking D-Pad or Action Buttons steers the car) */}
        {/* D-Pad Left */}
        <button
          onClick={() => handleGamepadPress('left')}
          className="absolute z-20 cursor-pointer rounded-full hover:bg-cyan-400/20 active:scale-90 transition-transform"
          style={{
            left: '69.2%',
            top: '71.5%',
            width: '2.8%',
            height: '5.5%',
          }}
          title="Steer Left"
          aria-label="Steer Left"
        />

        {/* D-Pad Right */}
        <button
          onClick={() => handleGamepadPress('right')}
          className="absolute z-20 cursor-pointer rounded-full hover:bg-cyan-400/20 active:scale-90 transition-transform"
          style={{
            left: '72.4%',
            top: '71.5%',
            width: '2.8%',
            height: '5.5%',
          }}
          title="Steer Right"
          aria-label="Steer Right"
        />

        {/* Action Button Right */}
        <button
          onClick={() => handleGamepadPress('right')}
          className="absolute z-20 cursor-pointer rounded-full hover:bg-rose-400/20 active:scale-90 transition-transform"
          style={{
            left: '79.2%',
            top: '71.5%',
            width: '2.8%',
            height: '5.5%',
          }}
          title="Action Button"
          aria-label="Action Button"
        />

        {/* Footer Left: Clean 100% Remote Studio Badge */}
        <div 
          className="absolute z-20 flex items-center gap-2 font-mono text-[11px] sm:text-xs text-slate-200 pointer-events-auto"
          style={{ left: '7.5%', bottom: '3.6%' }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wider">Global &amp; 100% Remote Studio</span>
        </div>

        {/* Footer Center: Scroll to explore click target */}
        <a
          href="#games"
          onClick={(e) => {
            e.preventDefault();
            if (onScrollDown) onScrollDown('games');
          }}
          className="absolute z-20 cursor-pointer rounded-md hover:bg-white/10 active:scale-95 transition-all"
          style={{
            left: '43%',
            bottom: '2.5%',
            width: '14%',
            height: '6%',
          }}
          title="Scroll to explore"
          aria-label="Scroll to explore"
        />

      </div>

    </section>
  );
}

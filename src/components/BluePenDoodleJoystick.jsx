import React, { useState } from 'react';
import PlayableRacingGame from './PlayableRacingGame';

/**
 * BluePenDoodleJoystick (Chalkboard Battlestation Edition)
 * 
 * Authentic Hand-Drawn Chalkboard Gaming Battlestation:
 * - Hand-sketched chalk monitor mounted on an antique fluted classical column pedestal.
 * - Real 60 FPS HTML5 Canvas Racing Game embedded directly inside the chalk monitor screen!
 * - Hand-drawn chalk gamepad controller resting in front on the pedestal.
 * - Interactive clickable D-pad and analog sticks that steer the live car in real-time!
 */
export default function BluePenDoodleJoystick() {
  const [externalControl, setExternalControl] = useState(null);

  const sendControl = (dir) => {
    setExternalControl(dir);
    setTimeout(() => setExternalControl(null), 120);
  };

  return (
    <div className="relative w-full max-w-[520px] flex flex-col items-center justify-center select-none py-1 pointer-events-auto">
      
      {/* Battlestation Container */}
      <div className="relative w-full aspect-[370/445] overflow-hidden drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
        
        {/* Layer 1: Real 60 FPS HTML5 Canvas Racing Game (Positioned precisely inside the monitor screen cutout) */}
        <div 
          className="absolute z-10 overflow-hidden rounded-sm"
          style={{
            left: '7.5%',
            top: '6.7%',
            width: '86%',
            height: '41.4%'
          }}
        >
          <PlayableRacingGame externalControl={externalControl} />
        </div>

        {/* Layer 2: Authentic Chalkboard Battlestation Frame (Fluted pillar, chalk monitor bezel, gamepad, math doodles) */}
        <img 
          src="/assets/chalk-battlestation-frame.png" 
          alt="Chalkboard Gaming Battlestation" 
          className="w-full h-full object-contain pointer-events-none relative z-20"
        />

        {/* Layer 3: Interactive Steer Controls over the Chalk Gamepad */}
        <div 
          className="absolute z-30 pointer-events-auto flex items-center justify-between"
          style={{
            left: '18%',
            top: '64%',
            width: '64%',
            height: '24%'
          }}
        >
          {/* Left D-Pad Steer Button */}
          <button
            onClick={() => sendControl('left')}
            className="w-14 h-14 rounded-full hover:bg-emerald-400/20 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
            title="Steer Left"
            aria-label="Steer Car Left"
          >
            <span className="sr-only">Steer Left</span>
          </button>

          {/* Right Action / Analog Steer Button */}
          <button
            onClick={() => sendControl('right')}
            className="w-14 h-14 rounded-full hover:bg-emerald-400/20 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
            title="Steer Right"
            aria-label="Steer Car Right"
          >
            <span className="sr-only">Steer Right</span>
          </button>
        </div>

      </div>

    </div>
  );
}

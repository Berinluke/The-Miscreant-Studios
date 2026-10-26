import React, { useState } from 'react';
import PlayableArcadeConsole from './PlayableArcadeConsole';
import { hudAudio } from './AudioEngine';

/**
 * ChalkBattlestationSvg
 * 
 * 100% Code & SVG Hand-Drawn Chalkboard Gaming Battlestation:
 * - Hand-sketched chalk monitor chassis
 * - Full interactive gamepad controller:
 *   * D-Pad (Left/Right steer, Up boost, Down brake)
 *   * Dual Analog Thumbsticks (interactive dragging & clicking with live stick deflection)
 *   * Action buttons (Square steer left, Circle steer right, Triangle boost, Cross brake)
 *   * Shoulder bumpers (L1 / R1)
 *   * Center OLED display with live input telemetry
 * - Live 60 FPS HTML5 Canvas Racing Game embedded inside monitor window
 * - Authentic chalk math doodles
 */
export default function ChalkBattlestationSvg() {
  const [externalControl, setExternalControl] = useState(null);
  const [activeBtn, setActiveBtn] = useState(null);
  const [leftStickOffset, setLeftStickOffset] = useState({ x: 0, y: 0 });
  const [rightStickOffset, setRightStickOffset] = useState({ x: 0, y: 0 });
  const [screenFeedback, setScreenFeedback] = useState('MISCREANT 128Hz');

  const triggerControl = (action, visualKey, stickTarget = null, eventType = 'down') => {
    if (eventType === 'down') {
      hudAudio.playClick();
      setActiveBtn(visualKey);
    } else if (eventType === 'up') {
      if (activeBtn === visualKey) setActiveBtn(null);
    }

    setExternalControl({ action, type: eventType, id: Date.now() });

    if (eventType === 'down' && stickTarget === 'left') {
      const offX = action === 'left' ? -7 : action === 'right' ? 7 : 0;
      const offY = action === 'boost' ? -7 : action === 'brake' ? 7 : 0;
      setLeftStickOffset({ x: offX, y: offY });
      setTimeout(() => setLeftStickOffset({ x: 0, y: 0 }), 180);
    } else if (eventType === 'down' && stickTarget === 'right') {
      const offX = action === 'left' ? -7 : action === 'right' ? 7 : 0;
      const offY = action === 'boost' ? -7 : action === 'brake' ? 7 : 0;
      setRightStickOffset({ x: offX, y: offY });
      setTimeout(() => setRightStickOffset({ x: 0, y: 0 }), 180);
    }

    if (eventType === 'down') {
      const messages = {
        left: '◀ STEER L',
        right: 'STEER R ▶',
        boost: '▲ BOOST!',
        brake: '▼ BRAKE',
        restart: '★ READY!'
      };
      if (messages[action]) {
        setScreenFeedback(messages[action]);
        setTimeout(() => setScreenFeedback('MISCREANT 128Hz'), 600);
      }
      setTimeout(() => {
        setActiveBtn((prev) => (prev === visualKey ? null : prev));
      }, 200);
    }
  };

  const handleStickPointerDown = (e, stick) => {
    e.preventDefault();
    hudAudio.playClick();
    const startX = e.clientX;
    const startY = e.clientY;
    const maxDist = 12;

    const onPointerMove = (moveEvt) => {
      const dx = moveEvt.clientX - startX;
      const dy = moveEvt.clientY - startY;
      const dist = Math.hypot(dx, dy);
      const factor = dist > maxDist ? maxDist / dist : 1;
      const clampedX = dx * factor;
      const clampedY = dy * factor;

      if (stick === 'left') {
        setLeftStickOffset({ x: clampedX, y: clampedY });
      } else {
        setRightStickOffset({ x: clampedX, y: clampedY });
      }

      // Stream continuous normalized analog input (-1.0 to +1.0)
      const normX = clampedX / maxDist;
      const normY = clampedY / maxDist;

      setExternalControl({
        type: 'analog',
        x: normX,
        y: normY,
        id: Date.now()
      });
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (stick === 'left') {
        setLeftStickOffset({ x: 0, y: 0 });
      } else {
        setRightStickOffset({ x: 0, y: 0 });
      }
      setExternalControl({
        type: 'analog',
        x: 0,
        y: 0,
        id: Date.now()
      });
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  return (
    <div className="relative w-full max-w-[560px] flex flex-col items-center justify-center select-none py-1 pointer-events-auto">
      
      {/* Battlestation Master SVG & Canvas Composite */}
      <div className="relative w-full aspect-[460/410] drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
        
        {/* Layer 1: Live Interactive 60 FPS Multi-Game Canvas Console (Inside Chalk Screen Window) */}
        <div 
          className="absolute z-10 overflow-hidden bg-black"
          style={{
            left: '8.7%',
            top: '8.8%',
            width: '67.8%',
            height: '46.8%',
            borderRadius: '4px'
          }}
        >
          <PlayableArcadeConsole externalControl={externalControl} />
        </div>

        {/* Layer 2: Pure Code & SVG Hand-Drawn Chalkboard Artwork */}
        <svg 
          viewBox="0 0 460 410" 
          className="absolute inset-0 w-full h-full pointer-events-none z-20 select-none overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* SVG Chalk Stroke Roughness Filter for authentic porous chalk texture */}
            <filter id="chalkNoise" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            
            <filter id="chalkDustBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" />
            </filter>

            {/* Hatch Patterns for Gamepad Grip Wings */}
            <pattern id="hatchLeft" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.65" />
            </pattern>
            <pattern id="hatchRight" width="6" height="6" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.65" />
            </pattern>
          </defs>

          {/* ==========================================================
              1. MONITOR CHASSIS (Hand-Drawn Chalk Bezel)
              ========================================================== */}
          <g filter="url(#chalkNoise)" stroke="#FFFFFF" fill="none" opacity="0.95">
            {/* Outer Monitor Frame (x: 36, width: 316 -> ends at 352) */}
            <rect 
              x="36" y="32" width="316" height="200" rx="8" 
              strokeWidth="2.4" 
              strokeDasharray="160 2 220 3" 
            />
            <rect 
              x="40" y="36" width="308" height="192" rx="6" 
              strokeWidth="1.2" 
              strokeDasharray="80 3 120 2" 
              opacity="0.8" 
            />

            {/* Inner Monitor Bezel Framing the Screen Window */}
            <rect 
              x="42" y="38" width="304" height="188" rx="4" 
              strokeWidth="1.6" 
              stroke="#E2E8F0" 
            />

            {/* Corner diagonal chalk reinforcement brackets */}
            <line x1="38" y1="50" x2="48" y2="40" strokeWidth="1.6" />
            <line x1="350" y1="50" x2="340" y2="40" strokeWidth="1.6" />
            <line x1="38" y1="214" x2="48" y2="224" strokeWidth="1.6" />
            <line x1="350" y1="214" x2="340" y2="224" strokeWidth="1.6" />

            {/* Chalk hatch marks on the monitor chin */}
            <g strokeWidth="1.2" opacity="0.6">
              <line x1="180" y1="228" x2="190" y2="228" />
              <line x1="195" y1="228" x2="208" y2="228" />
              <line x1="214" y1="228" x2="224" y2="228" />
            </g>
          </g>

          {/* Architectural Drafting Chalk Guidelines (Matching Reference) */}
          <g opacity="0.25" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="5 7">
            {/* Horizontal guideline behind monitor bottom & wire */}
            <line x1="20" y1="234" x2="440" y2="234" />
            {/* Horizontal guideline through controller stick centers */}
            <line x1="40" y1="312" x2="430" y2="312" />
            {/* Subtle diagonal guideline */}
            <line x1="90" y1="370" x2="270" y2="190" strokeDasharray="3 7" opacity="0.6" />
          </g>

          {/* ==========================================================
              2. EXACT REFERENCE CHALK GAMEPAD CONTROLLER
              ========================================================== */}
          {/* Coiled Controller Wire Connecting Monitor Base to Gamepad */}
          <path 
            d="M 194 232 C 188 238, 202 243, 194 248 C 188 251, 196 254, 194 256" 
            stroke="#FFFFFF" 
            strokeWidth="2.2" 
            fill="none" 
            strokeLinecap="round" 
            opacity="0.9" 
          />

          {/* Master Controller Group (Centered at X=194, Y=312 with 0.84 scale) */}
          <g transform="translate(194, 312) scale(0.84) translate(-266, -120)">
            
            {/* Top Shoulder Bumpers (Left & Right Angled Charcoal Trapezoids) */}
            <g filter="url(#chalkNoise)">
              {/* Left Bumper (L1) */}
              <polygon 
                points="144,38 196,36 200,64 136,68" 
                fill={activeBtn === 'bumper-left' ? '#0284C7' : '#18232E'} 
                stroke="#FFFFFF" 
                strokeWidth="2.2" 
                strokeLinejoin="round"
                className="cursor-pointer transition-colors"
                style={{ pointerEvents: 'auto' }}
                onClick={() => triggerControl('left', 'bumper-left')}
              />
              {/* Right Bumper (R1) */}
              <polygon 
                points="336,36 388,38 396,68 332,64" 
                fill={activeBtn === 'bumper-right' ? '#0284C7' : '#18232E'} 
                stroke="#FFFFFF" 
                strokeWidth="2.2" 
                strokeLinejoin="round"
                className="cursor-pointer transition-colors"
                style={{ pointerEvents: 'auto' }}
                onClick={() => triggerControl('right', 'bumper-right')}
              />
            </g>

            {/* Controller Body Silhouette */}
            <g filter="url(#chalkNoise)">
              {/* Outer Chalk Stroke Contour */}
              <path 
                d="M 196,44 
                   C 216,40, 250,40, 266,40 
                   C 282,40, 316,40, 336,44 
                   C 362,50, 400,64, 420,105 
                   C 438,140, 430,178, 400,192 
                   C 376,204, 350,188, 338,164 
                   C 322,132, 292,122, 266,122 
                   C 240,122, 210,132, 194,164 
                   C 182,188, 156,204, 132,192 
                   C 102,178, 94,140, 112,105 
                   C 132,64, 170,50, 196,44 Z" 
                fill="#13241A" 
                stroke="#FFFFFF" 
                strokeWidth="3.2" 
                strokeLinejoin="round"
              />

              {/* Inner Contour (Mint Green Chalk #86EFAC) */}
              <path 
                d="M 200,50 
                   C 218,46, 248,46, 266,46 
                   C 284,46, 314,46, 332,50 
                   C 356,56, 392,68, 410,105 
                   C 426,136, 418,170, 394,184 
                   C 372,194, 348,180, 338,158 
                   C 324,128, 292,118, 266,118 
                   C 240,118, 208,128, 194,158 
                   C 184,180, 160,194, 138,184 
                   C 114,170, 106,136, 122,105 
                   C 140,68, 176,56, 200,50 Z" 
                fill="none" 
                stroke="#86EFAC" 
                strokeWidth="1.8" 
                strokeLinejoin="round"
                opacity="0.85"
              />

              {/* Left Grip Textured Hatch Panel */}
              <path 
                d="M 116,118 
                   C 112,135, 116,160, 134,178 
                   C 140,165, 142,142, 136,125 Z" 
                fill="url(#hatchLeft)" 
                stroke="#FFFFFF" 
                strokeWidth="1.2" 
              />

              {/* Right Grip Textured Hatch Panel */}
              <path 
                d="M 416,118 
                   C 420,135, 416,160, 398,178 
                   C 392,165, 390,142, 396,125 Z" 
                fill="url(#hatchRight)" 
                stroke="#FFFFFF" 
                strokeWidth="1.2" 
              />
            </g>

            {/* Center Screen: Rounded Box with Yellow Accent & MISCREANT Telemetry */}
            <g filter="url(#chalkNoise)">
              <rect x="230" y="42" width="72" height="46" rx="6" fill="#182430" stroke="#FFFFFF" strokeWidth="2.2" />
              {/* Top Yellow Status Accent Line */}
              <line x1="238" y1="50" x2="294" y2="50" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" />
              {/* Dynamic Screen Text: Live Input Feedback */}
              <text 
                x="266" y="70" 
                fill={activeBtn ? '#86EFAC' : '#FFFFFF'} 
                fontSize="7.5" 
                fontFamily="'JetBrains Mono', monospace" 
                fontWeight="bold" 
                textAnchor="middle" 
                letterSpacing="0.5"
              >
                {screenFeedback}
              </text>
            </g>

            {/* ==========================================================
                LEFT: DIRECTIONAL D-PAD (Clickable in all 4 directions)
                ========================================================== */}
            <g filter="url(#chalkNoise)">
              {/* Circular Backdrop */}
              <circle cx="178" cy="100" r="24" fill="#15212D" stroke="#FFFFFF" strokeWidth="2.2" />
              
              {/* Cross D-Pad Shape */}
              <path 
                d="M 172,83 L 184,83 L 184,94 L 195,94 L 195,106 L 184,106 L 184,117 L 172,117 L 172,106 L 161,106 L 161,94 L 172,94 Z" 
                fill="#15212D" 
                stroke="#FFFFFF" 
                strokeWidth="1.8" 
                strokeLinejoin="round"
              />

              {/* D-Pad Up Arm (Boost) */}
              <rect 
                x="172" y="83" width="12" height="11" 
                fill={activeBtn === 'dpad-up' ? '#FDE047' : 'transparent'}
                className="cursor-pointer"
                style={{ pointerEvents: 'auto' }}
                onClick={() => triggerControl('boost', 'dpad-up')}
              />
              {/* D-Pad Down Arm (Brake) */}
              <rect 
                x="172" y="106" width="12" height="11" 
                fill={activeBtn === 'dpad-down' ? '#38BDF8' : 'transparent'}
                className="cursor-pointer"
                style={{ pointerEvents: 'auto' }}
                onClick={() => triggerControl('brake', 'dpad-down')}
              />
              {/* D-Pad Left Arm (Steer Left) */}
              <rect 
                x="161" y="94" width="11" height="12" 
                fill={activeBtn === 'dpad-left' ? '#67E8F9' : 'transparent'}
                className="cursor-pointer"
                style={{ pointerEvents: 'auto' }}
                onClick={() => triggerControl('left', 'dpad-left')}
              />
              {/* D-Pad Right Arm (Steer Right) */}
              <rect 
                x="184" y="94" width="11" height="12" 
                fill={activeBtn === 'dpad-right' ? '#67E8F9' : 'transparent'}
                className="cursor-pointer"
                style={{ pointerEvents: 'auto' }}
                onClick={() => triggerControl('right', 'dpad-right')}
              />

              {/* Center Pivot Dot */}
              <circle cx="178" cy="100" r="2.8" fill="#FFFFFF" />
            </g>

            {/* ==========================================================
                RIGHT: ACTION BUTTONS (PlayStation Style Diamond)
                ========================================================== */}
            <g filter="url(#chalkNoise)">
              {/* Circular Backdrop */}
              <circle cx="354" cy="100" r="24" fill="#15212D" stroke="#FFFFFF" strokeWidth="2.2" />
              
              {/* Top Button: Triangle ▲ (Boost) */}
              <g 
                className="cursor-pointer transition-transform" 
                style={{ pointerEvents: 'auto' }}
                onClick={() => triggerControl('boost', 'btn-triangle')}
              >
                <circle cx="354" cy="85" r="7" fill={activeBtn === 'btn-triangle' ? '#FB7185' : '#182430'} stroke="#FB7185" strokeWidth="1.5" />
                <polygon points="354,81 350.5,88 357.5,88" fill={activeBtn === 'btn-triangle' ? '#182430' : '#FB7185'} />
              </g>

              {/* Left Button: Square ■ (Steer Left) */}
              <g 
                className="cursor-pointer transition-transform" 
                style={{ pointerEvents: 'auto' }}
                onClick={() => triggerControl('left', 'btn-square')}
              >
                <circle cx="339" cy="100" r="7" fill={activeBtn === 'btn-square' ? '#FDE047' : '#182430'} stroke="#FDE047" strokeWidth="1.5" />
                <rect x="336.5" y="97.5" width="5" height="5" fill={activeBtn === 'btn-square' ? '#182430' : '#FDE047'} />
              </g>

              {/* Right Button: Circle ● (Steer Right) */}
              <g 
                className="cursor-pointer transition-transform" 
                style={{ pointerEvents: 'auto' }}
                onClick={() => triggerControl('right', 'btn-circle')}
              >
                <circle cx="369" cy="100" r="7" fill={activeBtn === 'btn-circle' ? '#34D399' : '#182430'} stroke="#34D399" strokeWidth="1.5" />
                <circle cx="369" cy="100" r="2.6" fill="none" stroke={activeBtn === 'btn-circle' ? '#182430' : '#34D399'} strokeWidth="1.5" />
              </g>

              {/* Bottom Button: Cross ✖ (Brake / Restart) */}
              <g 
                className="cursor-pointer transition-transform" 
                style={{ pointerEvents: 'auto' }}
                onClick={() => triggerControl('brake', 'btn-cross')}
              >
                <circle cx="354" cy="115" r="7" fill={activeBtn === 'btn-cross' ? '#38BDF8' : '#182430'} stroke="#38BDF8" strokeWidth="1.5" />
                <line x1="351.5" y1="112.5" x2="356.5" y2="117.5" stroke={activeBtn === 'btn-cross' ? '#182430' : '#38BDF8'} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="356.5" y1="112.5" x2="351.5" y2="117.5" stroke={activeBtn === 'btn-cross' ? '#182430' : '#38BDF8'} strokeWidth="1.5" strokeLinecap="round" />
              </g>
            </g>

            {/* ==========================================================
                BOTTOM CENTER: DUAL ANALOG THUMBSTICKS (Draggable & Clickable)
                ========================================================== */}
            <g filter="url(#chalkNoise)">
              
              {/* LEFT ANALOG THUMBSTICK (cx: 210, cy: 138) */}
              <g transform="translate(210, 138)">
                {/* Stick Base Socket Ring */}
                <circle cx="0" cy="0" r="18" fill="#101922" stroke="#FFFFFF" strokeWidth="2.2" />
                
                {/* Animated / Draggable Stick Head */}
                <g 
                  transform={`translate(${leftStickOffset.x}, ${leftStickOffset.y})`}
                  className="cursor-grab active:cursor-grabbing transition-transform duration-75"
                  style={{ pointerEvents: 'auto' }}
                  onPointerDown={(e) => handleStickPointerDown(e, 'left')}
                >
                  {/* Ring of 12 grip knurling dots */}
                  <circle cx="0" cy="-12" r="1.3" fill="#FFFFFF" />
                  <circle cx="6" cy="-10.4" r="1.3" fill="#FFFFFF" />
                  <circle cx="10.4" cy="-6" r="1.3" fill="#FFFFFF" />
                  <circle cx="12" cy="0" r="1.3" fill="#FFFFFF" />
                  <circle cx="10.4" cy="6" r="1.3" fill="#FFFFFF" />
                  <circle cx="6" cy="10.4" r="1.3" fill="#FFFFFF" />
                  <circle cx="0" cy="12" r="1.3" fill="#FFFFFF" />
                  <circle cx="-6" cy="10.4" r="1.3" fill="#FFFFFF" />
                  <circle cx="-10.4" cy="6" r="1.3" fill="#FFFFFF" />
                  <circle cx="-12" cy="0" r="1.3" fill="#FFFFFF" />
                  <circle cx="-10.4" cy="-6" r="1.3" fill="#FFFFFF" />
                  <circle cx="-6" cy="-10.4" r="1.3" fill="#FFFFFF" />
                  {/* Inner stick cap */}
                  <circle cx="0" cy="0" r="10" fill={leftStickOffset.x !== 0 ? '#1E3A8A' : '#1A2836'} stroke="#CBD5E1" strokeWidth="1.4" />
                  <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
                </g>
              </g>

              {/* RIGHT ANALOG THUMBSTICK (cx: 322, cy: 138) */}
              <g transform="translate(322, 138)">
                {/* Stick Base Socket Ring */}
                <circle cx="0" cy="0" r="18" fill="#101922" stroke="#FFFFFF" strokeWidth="2.2" />
                
                {/* Animated / Draggable Stick Head */}
                <g 
                  transform={`translate(${rightStickOffset.x}, ${rightStickOffset.y})`}
                  className="cursor-grab active:cursor-grabbing transition-transform duration-75"
                  style={{ pointerEvents: 'auto' }}
                  onPointerDown={(e) => handleStickPointerDown(e, 'right')}
                >
                  {/* Ring of 12 grip knurling dots */}
                  <circle cx="0" cy="-12" r="1.3" fill="#FFFFFF" />
                  <circle cx="6" cy="-10.4" r="1.3" fill="#FFFFFF" />
                  <circle cx="10.4" cy="-6" r="1.3" fill="#FFFFFF" />
                  <circle cx="12" cy="0" r="1.3" fill="#FFFFFF" />
                  <circle cx="10.4" cy="6" r="1.3" fill="#FFFFFF" />
                  <circle cx="6" cy="10.4" r="1.3" fill="#FFFFFF" />
                  <circle cx="0" cy="12" r="1.3" fill="#FFFFFF" />
                  <circle cx="-6" cy="10.4" r="1.3" fill="#FFFFFF" />
                  <circle cx="-10.4" cy="6" r="1.3" fill="#FFFFFF" />
                  <circle cx="-12" cy="0" r="1.3" fill="#FFFFFF" />
                  <circle cx="-10.4" cy="-6" r="1.3" fill="#FFFFFF" />
                  <circle cx="-6" cy="-10.4" r="1.3" fill="#FFFFFF" />
                  {/* Inner stick cap */}
                  <circle cx="0" cy="0" r="10" fill={rightStickOffset.x !== 0 ? '#1E3A8A' : '#1A2836'} stroke="#CBD5E1" strokeWidth="1.4" />
                  <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
                </g>
              </g>

            </g>
          </g>

          {/* ==========================================================
              4. SURROUNDING MATHEMATICS & PHYSICS CHALK DOODLES
              ========================================================== */}
          {/* Top Right Physics formula & Stars (Cleanly placed to right of monitor) */}
          <g opacity="0.9">
            <text x="368" y="22" fill="#FFFFFF" fontSize="13" fontFamily="Caveat" fontWeight="bold">
              dx / dt = v
            </text>
            <text x="375" y="44" fill="#93C5FD" fontSize="12" fontFamily="Caveat">
              x² + y² = r²
            </text>
            {/* Hand-Drawn Chalk Stars */}
            <path d="M 420 65 L 422 71 L 428 71 L 423 75 L 425 81 L 420 77 L 415 81 L 417 75 L 412 71 L 418 71 Z" stroke="#FDE047" strokeWidth="1.4" fill="none" />
            <path d="M 432 92 L 433 96 L 438 96 L 434 99 L 436 104 L 432 101 L 428 104 L 430 99 L 426 96 L 431 96 Z" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.75" />
          </g>

          {/* Right Bottom Math Formulas (Positioned Exactly per Reference) */}
          <g opacity="0.9">
            <text x="368" y="255" fill="#FFFFFF" fontSize="12" fontFamily="Permanent Marker" opacity="0.85">
              ΔV = 2/(3L)
            </text>
            <text x="372" y="312" fill="#93C5FD" fontSize="12" fontFamily="Caveat" opacity="0.95">
              max(h) = 1/2
            </text>
            <text x="380" y="358" fill="#FDE047" fontSize="14" fontFamily="Caveat">
              (x - 5) / 2
            </text>
          </g>

        </svg>

        {/* ==========================================================
            Layer 3: Accessible Full Touch & Mouse Overlay Hitboxes
            ========================================================== */}
        
        {/* 1. D-PAD CLUSTER (Top Left) */}
        <div 
          className="absolute z-30" 
          style={{ left: '20.5%', top: '65.2%', width: '10.5%', height: '11.8%' }}
        >
          {/* Up (Boost) */}
          <button
            onPointerDown={() => triggerControl('boost', 'dpad-up', null, 'down')}
            onPointerUp={() => triggerControl('boost', 'dpad-up', null, 'up')}
            onPointerLeave={() => triggerControl('boost', 'dpad-up', null, 'up')}
            className="absolute top-0 left-1/3 w-1/3 h-1/3 cursor-pointer hover:bg-yellow-400/20 active:scale-90 transition-all rounded-t"
            title="D-Pad Up (Nitro Boost)"
            aria-label="Nitro Boost"
          />
          {/* Down (Brake) */}
          <button
            onPointerDown={() => triggerControl('brake', 'dpad-down', null, 'down')}
            onPointerUp={() => triggerControl('brake', 'dpad-down', null, 'up')}
            onPointerLeave={() => triggerControl('brake', 'dpad-down', null, 'up')}
            className="absolute bottom-0 left-1/3 w-1/3 h-1/3 cursor-pointer hover:bg-sky-400/20 active:scale-90 transition-all rounded-b"
            title="D-Pad Down (Brake)"
            aria-label="Brake"
          />
          {/* Left (Steer Left) */}
          <button
            onPointerDown={() => triggerControl('left', 'dpad-left', null, 'down')}
            onPointerUp={() => triggerControl('left', 'dpad-left', null, 'up')}
            onPointerLeave={() => triggerControl('left', 'dpad-left', null, 'up')}
            className="absolute top-1/3 left-0 w-1/3 h-1/3 cursor-pointer hover:bg-cyan-400/25 active:scale-90 transition-all rounded-l"
            title="D-Pad Left (Steer Left)"
            aria-label="Steer Left"
          />
          {/* Right (Steer Right) */}
          <button
            onPointerDown={() => triggerControl('right', 'dpad-right', null, 'down')}
            onPointerUp={() => triggerControl('right', 'dpad-right', null, 'up')}
            onPointerLeave={() => triggerControl('right', 'dpad-right', null, 'up')}
            className="absolute top-1/3 right-0 w-1/3 h-1/3 cursor-pointer hover:bg-cyan-400/25 active:scale-90 transition-all rounded-r"
            title="D-Pad Right (Steer Right)"
            aria-label="Steer Right"
          />
        </div>

        {/* 2. LEFT ANALOG STICK HITBOX (Under D-Pad) */}
        <div 
          className="absolute z-30 flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ left: '27.5%', top: '74.2%', width: '9.0%', height: '10.2%' }}
          title="Left Analog Stick (Drag or Click Left/Right to Steer)"
        >
          {/* Left half click */}
          <button
            onPointerDown={() => triggerControl('left', 'left-stick-l', 'left', 'down')}
            onPointerUp={() => triggerControl('left', 'left-stick-l', 'left', 'up')}
            className="w-1/2 h-full hover:bg-cyan-400/20 active:scale-90 rounded-l-full"
            aria-label="Left Stick Steer Left"
          />
          {/* Right half click */}
          <button
            onPointerDown={() => triggerControl('right', 'left-stick-r', 'left', 'down')}
            onPointerUp={() => triggerControl('right', 'left-stick-r', 'left', 'up')}
            className="w-1/2 h-full hover:bg-cyan-400/20 active:scale-90 rounded-r-full"
            aria-label="Left Stick Steer Right"
          />
        </div>

        {/* 3. RIGHT ANALOG STICK HITBOX (Under Action Buttons) */}
        <div 
          className="absolute z-30 flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ left: '48.0%', top: '74.2%', width: '9.0%', height: '10.2%' }}
          title="Right Analog Stick (Drag or Click Left/Right to Steer)"
        >
          {/* Left half click */}
          <button
            onPointerDown={() => triggerControl('left', 'right-stick-l', 'right', 'down')}
            onPointerUp={() => triggerControl('left', 'right-stick-l', 'right', 'up')}
            className="w-1/2 h-full hover:bg-cyan-400/20 active:scale-90 rounded-l-full"
            aria-label="Right Stick Steer Left"
          />
          {/* Right half click */}
          <button
            onPointerDown={() => triggerControl('right', 'right-stick-r', 'right', 'down')}
            onPointerUp={() => triggerControl('right', 'right-stick-r', 'right', 'up')}
            className="w-1/2 h-full hover:bg-cyan-400/20 active:scale-90 rounded-r-full"
            aria-label="Right Stick Steer Right"
          />
        </div>

        {/* 4. ACTION BUTTONS CLUSTER (Top Right) */}
        <div 
          className="absolute z-30" 
          style={{ left: '52.8%', top: '65.2%', width: '10.5%', height: '11.8%' }}
        >
          {/* Triangle ▲ (Top - Boost) */}
          <button
            onPointerDown={() => triggerControl('boost', 'btn-triangle', null, 'down')}
            onPointerUp={() => triggerControl('boost', 'btn-triangle', null, 'up')}
            onPointerLeave={() => triggerControl('boost', 'btn-triangle', null, 'up')}
            className="absolute top-0 left-1/3 w-1/3 h-1/3 cursor-pointer hover:bg-rose-400/25 active:scale-90 transition-all rounded-full"
            title="Triangle (Boost)"
            aria-label="Triangle Boost"
          />
          {/* Cross ✖ (Bottom - Brake / Restart) */}
          <button
            onPointerDown={() => triggerControl('brake', 'btn-cross', null, 'down')}
            onPointerUp={() => triggerControl('brake', 'btn-cross', null, 'up')}
            onPointerLeave={() => triggerControl('brake', 'btn-cross', null, 'up')}
            className="absolute bottom-0 left-1/3 w-1/3 h-1/3 cursor-pointer hover:bg-sky-400/25 active:scale-90 transition-all rounded-full"
            title="Cross (Brake / Restart)"
            aria-label="Cross Brake"
          />
          {/* Square ■ (Left - Steer Left) */}
          <button
            onPointerDown={() => triggerControl('left', 'btn-square', null, 'down')}
            onPointerUp={() => triggerControl('left', 'btn-square', null, 'up')}
            onPointerLeave={() => triggerControl('left', 'btn-square', null, 'up')}
            className="absolute top-1/3 left-0 w-1/3 h-1/3 cursor-pointer hover:bg-yellow-400/25 active:scale-90 transition-all rounded-full"
            title="Square (Steer Left)"
            aria-label="Square Steer Left"
          />
          {/* Circle ● (Right - Steer Right) */}
          <button
            onPointerDown={() => triggerControl('right', 'btn-circle', null, 'down')}
            onPointerUp={() => triggerControl('right', 'btn-circle', null, 'up')}
            onPointerLeave={() => triggerControl('right', 'btn-circle', null, 'up')}
            className="absolute top-1/3 right-0 w-1/3 h-1/3 cursor-pointer hover:bg-emerald-400/25 active:scale-90 transition-all rounded-full"
            title="Circle (Steer Right)"
            aria-label="Circle Steer Right"
          />
        </div>

      </div>

    </div>
  );
}

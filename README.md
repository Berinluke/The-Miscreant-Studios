# THE MISCREANT STUDIOS | Digital Chaos Simulator

> Next-generation competitive game development studio web experience. Engineered with modular frontend architecture, WebGL ember physics, kinetic typography, and procedural Web Audio synthesis.

---

## 🏛️ Repository Architecture

Organized under enterprise-grade principal engineer standards with strict domain segregation:

```text
The-Miscreant-Studios/
├── .gitignore                      # Operating system, IDE & build ignore definitions
├── README.md                       # Studio architecture & development documentation
├── index.html                      # Root entry point & semantic HTML structure
├── netlify.toml                    # Netlify CI/CD build & static deployment rules
├── favicon.ico                     # Root legacy favicon fallback
├── app-ads.txt                     # Publisher authentication & ad verification
│
└── assets/
    ├── brand/                      # Brand identity, vectors & application icons
    │   ├── logo.png                # Primary studio badge
    │   ├── favicon.png             # Modern 128x128 PNG icon
    │   └── favicon-192.png         # High-DPI PWA / mobile touch icon
    │
    ├── images/                     # Categorized production visual media
    │   ├── hero/                   # Full-bleed 3D scene elements & controllers
    │   │   ├── hero-full-bg.jpg
    │   │   ├── hero-foreground-controller.png
    │   │   └── cyber-stage-bg.png
    │   ├── games/                  # Studio titles & operations key art
    │   │   ├── game-battleroyale.jpg   # Project Omega
    │   │   ├── game-deepvoid.jpg       # Deep Void
    │   │   ├── game-freefire.jpg       # Neon Grind
    │   │   └── game-runner.jpg         # Project Velocity
    │   └── tech/                   # Studio arsenal engine & tooling badges
    │       ├── tech-ue5.jpg        # Unreal Engine 5 Nanite/Lumen
    │       ├── tech-unity.jpg      # Unity 6 DOTS/URP
    │       ├── tech-cpp.jpg        # Bare-metal C++ / C#
    │       ├── tech-blender.jpg    # Blender 4.x Hard Surface & Geo Nodes
    │       ├── tech-houdini.jpg    # Houdini FX Procedural Sim
    │       └── tech-wwise.jpg      # Wwise Spatial Audio DSP
    │
    ├── css/                        # Scalable modular styling hierarchy
    │   ├── core/                   # Design tokens, variables & responsive breakpoints
    │   │   ├── main.css            # Base styles, color tokens & typography
    │   │   └── responsive.css      # Viewport adaptability & safe-area margins
    │   ├── fx/                     # Visual effects, shaders & interactive cursors
    │   │   ├── cyberpunk.css       # Neon glow, stage framing & ghosting
    │   │   ├── glitch.css          # Kinetic text scramble & chromatic split
    │   │   └── cursor.css          # Magnetic spotlight & follower physics
    │   └── sections/               # Page feature components
    │       ├── games-showcase.css  # 3D operations carousel stage
    │       ├── arsenal.css         # Tech stack telemetry & spec grids
    │       └── studio-universe.css # Studio lore & operational terminal
    │
    └── js/                         # Decoupled ES runtime engine
        ├── core/                   # Application bootstrap & event bus
        │   └── main.js             # Navigation, smooth scroll & command palette
        ├── fx/                     # Kinetic effects & WebGL shaders
        │   ├── three-scene.js      # Three.js floating ember particle system
        │   ├── cursor.js           # Sub-pixel lerp custom cursor engine
        │   ├── glitch.js           # Random matrix text decoders
        │   └── audio.js            # Web Audio API procedural sound synthesizer
        └── sections/               # Specialized telemetry & component scripts
            └── studio-sections.js  # Interactive terminal & universe controls
```

---

## ⚡ Local Development

To run the studio experience locally with zero configuration:

### Option 1: Python 3
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000`.

### Option 2: Node.js (npx)
```bash
npx serve -l 3000
```

---

## 🚀 Deployment (Netlify)

This project is configured for instantaneous static deployment via `netlify.toml`:
- **Publish directory**: `.` (Root)
- **Build command**: None required (Zero-build static runtime)
- **Headers**: Custom security headers and cache policies applied automatically.

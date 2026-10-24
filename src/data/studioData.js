// Complete Official Data for THE MISCREANT STUDIOS from CONTENT_ARCHIVE.md
// Clean, simple, easy-to-understand English

export const studioInfo = {
  name: "THE MISCREANT STUDIOS",
  shortName: "MISCREANT",
  tagline: "DIGITAL CHAOS SIMULATOR",
  subTagline: "Built for players. Designed for chaos.",
  year: "2026",
  location: "Chennai, Tamil Nadu, India",
  coordinates: "13.0827° N, 80.2707° E",
  sector: "Asia-South Node",
  emails: {
    general: "themiscreantstudios@gmail.com",
    careers: "career.themiscreantstudios@gmail.com",
    business: "themiscreantstudios@gmail.com"
  },
  socials: {
    github: "https://github.com/Berinluke",
    twitter: "https://x.com/TheMiscreantStudios",
    discord: "#",
    steam: "#"
  },
  metrics: [
    { label: "Server Tick Rate", value: "128 Hz", detail: "Twice as fast as standard games for zero ghost bullets" },
    { label: "Input Response", value: "< 2.1 ms", detail: "Near-instant reaction from mouse click to screen" },
    { label: "Physics Solver", value: "0.4 ms", detail: "Sub-millisecond AVX-512 real-time collision" },
    { label: "Studio Independence", value: "100%", detail: "Zero publisher interference, pure creative freedom" }
  ]
};

export const gameUniverse = [
  {
    id: "deep-void",
    title: "DEEP VOID",
    tagline: "Celestial Void MMORPG Flagship",
    badge: "EXPANSION 2.4 VOIDBREAKER",
    genre: "Space MMORPG",
    engine: "Unreal Engine 5.5 (Lumen & Nanite)",
    players: "64-Player Cosmic Raids",
    color: "#2563EB", // Hyper Cobalt Blue
    bgTint: "bg-blue-50/60",
    borderTint: "border-blue-200",
    description: "Explore shattered planetary rings, wield glowing void blades, and battle through massive 64-player raids with zero lag.",
    stats: {
      tick: "64 Hz",
      engine: "UE 5.5",
      raids: "64 Players",
      mesh: "Zero-Lag Mesh"
    },
    keyFeatures: ["Zero-lag server mesh", "Lumen dynamic raytracing", "Dynamic celestial bosses"]
  },
  {
    id: "project-omega",
    title: "PROJECT OMEGA",
    tagline: "Tactical Warfare with Hypersonic Air-Drops",
    badge: "CLOSED BETA WAVE 03",
    genre: "Tactical Battle Royale",
    engine: "Bare-Metal C++ & Chaos Physics",
    players: "100 Players Concurrent",
    color: "#FF2A5F", // Electric Coral
    bgTint: "bg-rose-50/60",
    borderTint: "border-rose-200",
    description: "100-player tactical warfare with supersonic drops, realistic weapon recoil, and fully destructible buildings running on 128Hz bare-metal servers.",
    stats: {
      tick: "128 Hz",
      capacity: "420K+ Tested",
      latency: "< 2.1 ms",
      antiCheat: "Vanguard++"
    },
    keyFeatures: ["128Hz high-tick rate", "Voxel destruction physics", "Sub-2.1ms hit registration"]
  },
  {
    id: "neon-grind",
    title: "NEON GRIND",
    tagline: "High-Velocity 4v4 Squad Clash",
    badge: "LIVE OPERATIONS",
    genre: "High-Speed Blitz Shooter",
    engine: "Unity 6 & DOTS Engine",
    players: "4v4 Cross-Play",
    color: "#FFA000", // Solar Amber
    bgTint: "bg-amber-50/60",
    borderTint: "border-amber-200",
    description: "Lightning-fast squad battles featuring vertical jetpack boosts, customizable streetwear styles, and non-stop respawn adrenaline matches.",
    stats: {
      matchTime: "4.5 Min",
      mode: "4v4 Blitz",
      uptime: "99.99%",
      crossplay: "PC & Console"
    },
    keyFeatures: ["Jetpack vertical mobility", "Dynamic streetwear arsenals", "Instant respawn pacing"]
  },
  {
    id: "project-velocity",
    title: "PROJECT VELOCITY",
    tagline: "Break the Sound Barrier through Neo-Chennai",
    badge: "STEAM NEXT FEST PROTOTYPE",
    genre: "Hyperspeed Parkour & Speedrun",
    engine: "Custom WebGPU & C# Solvers",
    players: "Global Time-Trials",
    color: "#059669", // Emerald Speed
    bgTint: "bg-emerald-50/60",
    borderTint: "border-emerald-200",
    description: "Tear through futuristic Neo-Chennai at Mach 2 with fluid wall-runs, grapple chains, and zero-gravity rail grinds tuned for competitive speedrunners.",
    stats: {
      fps: "120+ FPS",
      latency: "< 2.1 ms",
      audio: "Synthwave Reactive",
      boards: "Global Ladders"
    },
    keyFeatures: ["Mach-2 wall runs & grapples", "Synthwave audio-reactive world", "Rock-solid 120+ FPS"]
  },
  {
    id: "project-nebula",
    title: "PROJECT NEBULA",
    tagline: "Deep-Space Derelict Frigate Extraction",
    badge: "INTERNAL R&D CLASSIFIED",
    genre: "Zero-G Extraction Shooter",
    engine: "Spatial 3D Audio & Voxel Breaches",
    players: "Squad Extraction",
    color: "#7C3AED", // Violet Energy
    bgTint: "bg-purple-50/60",
    borderTint: "border-purple-200",
    description: "Raid abandoned alien space frigates in zero gravity. Salvage ancient glowing reactor cores while escaping oxygen loss and synthetic hunters.",
    stats: {
      hazard: "Zero-G Vacuum",
      audio: "HRTF 3D Audio",
      destruction: "Hull Breaches",
      status: "Classified"
    },
    keyFeatures: ["Zero-G vacuum combat", "Hull breaches & oxygen hazards", "Binaural 3D directional sound"]
  }
];

export const studioManifesto = {
  quote: "We reject predictable corporate formulas. We build for the players who hunger for unscripted chaos, physics that bite back, and combat loops where mastery is earned, never bought.",
  rules: [
    {
      num: "01",
      title: "CREATE",
      subtitle: "No Safe Ideas",
      desc: "If a game mechanic feels too safe or boring, we discard it. We build games that feel dangerous, electrifying, and fresh."
    },
    {
      num: "02",
      title: "EXPERIMENT",
      subtitle: "Prototype Relentlessly",
      desc: "Every Friday our team experiments with wild gameplay concepts. Only the most addictive 10% survive to become full games."
    },
    {
      num: "03",
      title: "BREAK",
      subtitle: "Stress-Test Everything",
      desc: "We intentionally flood our servers with 50,000 physics debris pieces to find every crash bug before any player ever sees it."
    },
    {
      num: "04",
      title: "REBUILD",
      subtitle: "Polish Into Perfection",
      desc: "We rebuild every system for buttery 120 FPS performance, punchy audio, and instant sub-2ms mouse responses."
    }
  ]
};

export const studioCulture = {
  city: "Chennai, India",
  vibe: "Open creative crucible fueled by South Indian filter coffee, hot pizza, and synthwave beats.",
  perks: [
    "Zero Crunch Culture — Respect for personal life and sustainable sprint goals",
    "100% Indie Autonomy — No publisher red-tape or corporate committees",
    "Studio Profit Share — Every team member shares in the financial success of our games",
    "Monstrous Workstations — RTX 4090 / 5090 machines with dual 4K displays",
    "Open Creative Space — Anyone can pitch an idea, from intern to founder"
  ]
};

export const leadershipTeam = [
  {
    name: "Berin Luke",
    role: "FOUNDER & CEO",
    initials: "BL",
    badge: "SYSTEMS ARCHITECT",
    bio: "Leads studio vision, bare-metal C++ physics engines, and real-time networking. Passionate about player freedom and zero-compromise framerates.",
    skills: ["Game Architecture", "Bare-Metal C++", "Netcode", "Studio Leadership"],
    github: "https://github.com/Berinluke"
  },
  {
    name: "Sai Sabareesh",
    role: "2D DESIGNER & ARTIST",
    initials: "SS",
    badge: "WORLDBUILDER",
    bio: "Visual craftsman shaping the bold 2D aesthetic, comic silhouettes, and striking cyberpunk character designs across The Miscreant Studios.",
    skills: ["2D Concept Art", "Character Silhouettes", "Worldbuilding", "Visual Identity"],
    github: "#"
  }
];

export const careerJobs = [
  {
    id: "unity-dev",
    title: "Unity Programmer (2D & 3D)",
    level: "Fresher / Junior Welcome",
    type: "Full-Time / Chennai or Remote",
    skills: "C#, Unity 2D & 3D, Game Physics, Vector Math",
    desc: "Build smooth player controls, interactive 2D gameplay loops, and assist on our Unity 6 projects."
  },
  {
    id: "artist-2d",
    title: "2D Artist & Sprite Crafter",
    level: "Fresher / Junior Welcome",
    type: "Full-Time / Chennai or Remote",
    skills: "Sprite Sheets, Environment Art, Digital Painting, Photoshop",
    desc: "Create eye-catching 2D game sprites, comic action panels, and vibrant daylight environments."
  },
  {
    id: "uiux-designer",
    title: "UI/UX Game HUD Designer",
    level: "Fresher / Junior Welcome",
    type: "Full-Time / Chennai or Remote",
    skills: "Figma, Game HUDs, Micro-Interactions, Wireframing",
    desc: "Design clean, high-contrast gaming user interfaces that look striking and feel instant to use."
  },
  {
    id: "concept-artist",
    title: "Concept Artist (Characters & Worlds)",
    level: "Fresher / Junior Welcome",
    type: "Full-Time / Chennai or Remote",
    skills: "Character Ideation, Moodboards, Photoshop, Procreate",
    desc: "Sketch out wild sci-fi warriors, cyberpunk streets, and futuristic machinery."
  },
  {
    id: "story-writer",
    title: "Game Story & Lore Writer",
    level: "Fresher / Junior Welcome",
    type: "Full-Time / Chennai or Remote",
    skills: "World Lore, Character Dialogues, Quest Narrative, Scripting",
    desc: "Write unforgettable dialogue, humorous character lines, and rich sci-fi lore for our universes."
  },
  {
    id: "song-artist",
    title: "Song & Synthwave Artist",
    level: "Fresher / Junior Welcome",
    type: "Full-Time / Chennai or Remote",
    skills: "OST Production, Cyberpunk Beats, Synthwave, Sound FX",
    desc: "Produce adrenaline-pumping soundtracks and punchy audio effects that make combat feel impactful."
  },
  {
    id: "designer-3d",
    title: "3D Hard-Surface Designer",
    level: "Fresher / Junior Welcome",
    type: "Full-Time / Chennai or Remote",
    skills: "Blender, Low-Poly & High-Poly, Texturing, UV Unwrapping",
    desc: "Model futuristic weapons, vehicles, and sci-fi lab props with clean topology."
  }
];

export const techArsenal = [
  {
    name: "Unity 6 & DOTS",
    badge: "MOBILE & DESKTOP",
    desc: "Data-Oriented technology simulating 64,000+ simultaneous moving game entities with ultra-smooth frame rates."
  },
  {
    name: "Bare-Metal C++ & C#",
    badge: "CUSTOM NETCODE",
    desc: "Custom network servers handling 128 updates per second directly on the CPU hardware for zero ghost bullets."
  },
  {
    name: "Unreal Engine 5.5",
    badge: "NEXT-GEN GRAPHICS",
    desc: "Nanite micro-geometry and Lumen real-time lighting for breathtaking, photorealistic celestial worlds."
  },
  {
    name: "Blender & Houdini DCC",
    badge: "CREATIVE PIPELINE",
    desc: "Custom 3D rigging, procedural building generation, and realistic building destruction simulations."
  }
];

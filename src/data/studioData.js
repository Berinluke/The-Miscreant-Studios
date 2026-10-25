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
    tagline: "Cinematic Narrative Sci-Fi Odyssey",
    badge: "STORY CAMPAIGN",
    genre: "Story-Based Adventure",
    engine: "Unreal Engine 5.5 (Lumen & Nanite)",
    players: "Single-Player & Co-op Story",
    color: "#2563EB", // Hyper Cobalt Blue
    bgTint: "bg-blue-50/60",
    borderTint: "border-blue-200",
    description: "Immerse yourself in a gripping narrative through shattered planetary rings, wielding ancient void relics and uncovering deep forgotten lore.",
    stats: {
      story: "12 Chapters",
      engine: "UE 5.5",
      lore: "Rich Narrative",
      audio: "Full Voiceover"
    },
    keyFeatures: ["Branching narrative choices", "Lumen dynamic cinematics", "Emotional orchestral score"]
  },
  {
    id: "neon-grind",
    title: "NEON GRIND",
    tagline: "Instant-Action 1-Tap Reflex Brawler",
    badge: "HYPER-CASUAL HIT",
    genre: "Hyper-Casual Action",
    engine: "Unity 6 & Instant-Play Engine",
    players: "Instant Pick-Up & Play",
    color: "#FFA000", // Solar Amber
    bgTint: "bg-amber-50/60",
    borderTint: "border-amber-200",
    description: "Lightning-fast, bite-sized arcade reflex combat with smooth one-tap controls, vibrant neon aesthetics, and endless addictive progression.",
    stats: {
      session: "60 Seconds",
      mode: "Endless Blitz",
      controls: "1-Tap Reflex",
      platforms: "Mobile & Web"
    },
    keyFeatures: ["Instant 1-tap mechanics", "Addictive progression loop", "Smooth 60 FPS mobile performance"]
  },
  {
    id: "project-omega",
    title: "PROJECT OMEGA",
    tagline: "High-Stakes Narrative Mystery Thriller",
    badge: "EPISODIC STORY",
    genre: "Story-Based Thriller",
    engine: "Custom Cinematic Engine",
    players: "Story Driven",
    color: "#FF2A5F", // Electric Coral
    bgTint: "bg-rose-50/60",
    borderTint: "border-rose-200",
    description: "A dark, suspenseful narrative adventure where every dialogue choice alters the survival outcome of an elite crew stranded in hostile territory.",
    stats: {
      endings: "8 Unique Paths",
      script: "40K Words",
      cinematics: "4K Motion Capture",
      tempo: "Tense Narrative"
    },
    keyFeatures: ["Multiple story endings", "Moral choice system", "High-fidelity facial capture"]
  },
  {
    id: "project-velocity",
    title: "PROJECT VELOCITY",
    tagline: "Hyperspeed Tap-to-Dash Reflex Runner",
    badge: "HYPER-CASUAL RUNNER",
    genre: "Hyper-Casual Speedrun",
    engine: "Ultra-Light 2D/3D Solver",
    players: "Global Leaderboards",
    color: "#059669", // Emerald Speed
    bgTint: "bg-emerald-50/60",
    borderTint: "border-emerald-200",
    description: "Dash, dodge, and slide at Mach speed through stylized neon tracks with effortless swipe controls and satisfying physics feedback.",
    stats: {
      mechanics: "Swipe & Tap",
      fps: "120 FPS",
      levels: "100+ Quick Stages",
      boards: "Global Speedrun"
    },
    keyFeatures: ["Zero-friction swipe controls", "Dynamic synthwave beats", "Bite-sized micro challenges"]
  },
  {
    id: "project-nebula",
    title: "PROJECT NEBULA",
    tagline: "Atmospheric Derelict Narrative Odyssey",
    badge: "STORY EXPLORATION",
    genre: "Story-Based Sci-Fi Mystery",
    engine: "Spatial 3D Audio & Narrative Solvers",
    players: "Solo Narrative",
    color: "#7C3AED", // Violet Energy
    bgTint: "bg-purple-50/60",
    borderTint: "border-purple-200",
    description: "A hauntingly beautiful environmental narrative game exploring derelict spacecraft across the cosmos to piece together the history of a lost civilization.",
    stats: {
      chapters: "Story Prologue",
      audio: "Binaural 3D Audio",
      style: "Atmospheric",
      puzzles: "Story Puzzles"
    },
    keyFeatures: ["Deep lore & audio logs", "Atmospheric environmental storytelling", "Zero-G puzzle mechanics"]
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

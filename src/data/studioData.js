// Complete Official Data for THE MISCREANT STUDIOS from CONTENT_ARCHIVE.md
// Clean, simple, easy-to-understand English

export const studioInfo = {
  name: "THE MISCREANT STUDIOS",
  shortName: "MISCREANT",
  tagline: "DIGITAL CHAOS SIMULATOR",
  subTagline: "Built for players. Designed for chaos.",
  year: "2026",
  location: "100% Remote Studio (Worldwide)",
  coordinates: "Global Distributed Team",
  sector: "Worldwide Creative Network",
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
    id: "master-the-wrap",
    title: "MASTER THE WRAP",
    tagline: "Addictive 2D Casual Mobile Arcade",
    badge: "RELEASED",
    genre: "2D Casual Mobile Game",
    status: "Released",
    engine: "Unity 2D Mobile",
    players: "Single-Player",
    color: "#10B981", // Emerald
    bgTint: "bg-emerald-50/60",
    borderTint: "border-emerald-200",
    description: "A delightfully addictive 2D casual mobile game featuring intuitive touch controls, satisfying wrapping puzzle mechanics, and snappy arcade levels designed for quick pick-up-and-play sessions.",
    stats: {
      status: "Released",
      platform: "Mobile",
      genre: "2D Casual",
      controls: "Touch / Tap"
    },
    keyFeatures: ["Intuitive one-touch mechanics", "Satisfying wrapping puzzle loops", "Quick bite-sized mobile stages"]
  },
  {
    id: "tethered-territories",
    title: "TETHERED TERRITORIES",
    tagline: "Strategic 2D Tether & Expand Mobile Game",
    badge: "IN PROGRESS",
    genre: "2D Casual Mobile Game",
    status: "In Progress",
    engine: "Unity 2D & Physics",
    players: "Single & Versus",
    color: "#3B82F6", // Cobalt Blue
    bgTint: "bg-blue-50/60",
    borderTint: "border-blue-200",
    description: "Capture and defend zones using dynamic tethering mechanics. Expand your territory, outmaneuver rivals, and dominate the map in this engaging 2D casual mobile experience.",
    stats: {
      status: "In Progress",
      platform: "Mobile",
      genre: "2D Casual",
      mechanic: "Tether & Expand"
    },
    keyFeatures: ["Dynamic tether mechanics", "Territory expansion strategy", "Smooth touch responsiveness"]
  },
  {
    id: "world-kneel",
    title: "WORLD KNEEL",
    tagline: "Atmospheric 2D Story-Driven Platformer",
    badge: "IN PROGRESS",
    genre: "2D Platformer Story-Based Game",
    status: "In Progress",
    engine: "Custom 2D Engine",
    players: "Story Campaign",
    color: "#F59E0B", // Amber
    bgTint: "bg-amber-50/60",
    borderTint: "border-amber-200",
    description: "Journey through a ruined, majestic world in this deep narrative-driven 2D platformer. Uncover lost histories, master acrobatic traversal, and shape the destiny of a falling kingdom.",
    stats: {
      status: "In Progress",
      type: "2D Platformer",
      story: "Story-Based",
      art: "Hand-Crafted"
    },
    keyFeatures: ["Fluid precision platforming", "Emotional narrative campaign", "Atmospheric world exploration"]
  },
  {
    id: "the-ghost",
    title: "THE GHOST",
    tagline: "Psychological 3D Horror & Thriller Narrative",
    badge: "IN PROGRESS",
    genre: "3D Horror Thriller Story-Based Game",
    status: "In Progress",
    engine: "Unreal Engine 5 (Lumen & Nanite)",
    players: "Solo Horror Experience",
    color: "#7C3AED", // Violet
    bgTint: "bg-purple-50/60",
    borderTint: "border-purple-200",
    description: "A bone-chilling 3D psychological horror and thriller story-based game. Navigate terrifying hyper-realistic environments, evade supernatural horrors, and unravel a harrowing mystery where every sound matters.",
    stats: {
      status: "In Progress",
      visuals: "3D Hyper-Real",
      genre: "Horror Thriller",
      audio: "Binaural 3D"
    },
    keyFeatures: ["Atmospheric psychological tension", "Binaural spatial horror soundscape", "Branching investigative storyline"]
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
  city: "100% Remote / Global",
  vibe: "Open creative crucible fueled by hot coffee, collaborative brainstorms, and synthwave beats.",
  perks: [
    "Zero Crunch Culture — Respect for personal life and sustainable sprint goals",
    "100% Indie Autonomy — No publisher red-tape or corporate committees",
    "Studio Profit Share — Every team member shares in the financial success of our games",
    "Monstrous Workstations — Top-tier hardware stipends for all remote contributors",
    "Open Creative Space — Anyone can pitch an idea, from intern to founder"
  ]
};

export const leadershipTeam = [
  {
    name: "Berin Luke",
    role: "FOUNDER & CEO",
    initials: "BL",
    badge: "SYSTEMS ARCHITECT",
    bio: "Leads studio vision, game architecture, and creative direction. Passionate about player freedom, responsive controls, and engaging worlds.",
    skills: ["Game Architecture", "Game Design", "Creative Direction", "Studio Leadership"],
    github: "https://github.com/Berinluke"
  },
  {
    name: "Sai Sabareesh",
    role: "2D DESIGNER & ARTIST",
    initials: "SS",
    badge: "WORLDBUILDER",
    bio: "Visual craftsman shaping the bold 2D aesthetic, comic silhouettes, and striking character designs across The Miscreant Studios.",
    skills: ["2D Concept Art", "Character Silhouettes", "Worldbuilding", "Visual Identity"],
    github: "#"
  }
];

export const careerJobs = [
  {
    id: "unity-dev",
    title: "Unity Programmer (2D & 3D)",
    level: "Fresher / Junior Welcome",
    type: "Full-Time / 100% Remote",
    skills: "C#, Unity 2D & 3D, Game Physics, Vector Math",
    desc: "Build smooth player controls, interactive 2D gameplay loops, and assist on our Unity projects."
  },
  {
    id: "artist-2d",
    title: "2D Artist & Sprite Crafter",
    level: "Fresher / Junior Welcome",
    type: "Full-Time / 100% Remote",
    skills: "Sprite Sheets, Environment Art, Digital Painting, Photoshop",
    desc: "Create eye-catching 2D game sprites, comic action panels, and vibrant daylight environments."
  },
  {
    id: "uiux-designer",
    title: "UI/UX Game HUD Designer",
    level: "Fresher / Junior Welcome",
    type: "Full-Time / 100% Remote",
    skills: "Figma, Game HUDs, Micro-Interactions, Wireframing",
    desc: "Design clean, high-contrast gaming user interfaces that look striking and feel instant to use."
  },
  {
    id: "concept-artist",
    title: "Concept Artist (Characters & Worlds)",
    level: "Fresher / Junior Welcome",
    type: "Full-Time / 100% Remote",
    skills: "Character Ideation, Moodboards, Photoshop, Procreate",
    desc: "Sketch out wild characters, stylized worlds, and imaginative game environments."
  },
  {
    id: "story-writer",
    title: "Game Story & Lore Writer",
    level: "Fresher / Junior Welcome",
    type: "Full-Time / 100% Remote",
    skills: "World Lore, Character Dialogues, Quest Narrative, Scripting",
    desc: "Write unforgettable dialogue, humorous character lines, and rich lore for our story-based universes."
  },
  {
    id: "song-artist",
    title: "Song & Synthwave Artist",
    level: "Fresher / Junior Welcome",
    type: "Full-Time / 100% Remote",
    skills: "OST Production, Atmospheric Beats, Synthwave, Sound FX",
    desc: "Produce adrenaline-pumping soundtracks and punchy audio effects that make combat feel impactful."
  },
  {
    id: "designer-3d",
    title: "3D Hard-Surface Designer",
    level: "Fresher / Junior Welcome",
    type: "Full-Time / 100% Remote",
    skills: "Blender, Low-Poly & High-Poly, Texturing, UV Unwrapping",
    desc: "Model stylish 3D assets, horror game environments, and props with clean topology."
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

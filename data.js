/* ==========================================================================
   DATA.JS — All structured content for the portfolio.
   Keeping content as data lets the HTML stay lean and the render logic
   in animations.js / script.js stay generic and reusable.
   ========================================================================== */

const STRENGTHS = [
  { title: "Game Design Documentation", desc: "Complete GDDs — story, systems, mechanics, progression, and player journeys in studio-ready blueprints." },
  { title: "Game Concept Development", desc: "Turning a single idea into a full game concept with identity, hook, and vision." },
  { title: "World Building", desc: "Designing worlds that feel alive — cultures, histories, ecosystems, and moods before a single asset is made." },
  { title: "Player Psychology", desc: "Understanding what makes a player care, lean forward, or put the controller down." },
  { title: "Creative Vision", desc: "Holding one clear vision across every design decision, from mechanics to mood." },
  { title: "Game Pitch & Communication", desc: "Presenting a game idea so clearly that an entire team sees the same unmade game." }
];

/* --------------------------------------------------------------------------
   PROJECTS
   Each project is a full case: story, gameplay vision, loop, motivation,
   mechanics, USPs, systems, progression, exploration, future ideas,
   and a development roadmap.
   -------------------------------------------------------------------------- */
const PROJECTS = [
  {
    id: "pokemon-life",
    index: "01",
    codename: "WORLD-01",
    title: "Pokémon Life",
    subtitle: "Journey of the Master",
    genre: "AAA Open World Monster RPG",
    status: "Concept / Design Document",
    tags: ["Open World", "Life Simulation", "Creature Systems", "Ecosystem"],
    heroNote: "A living region, not a route between gyms.",
    story: "Somewhere between a first Poké Ball and a Champion's title, an entire region is quietly living its own life. Pokémon Life reframes the classic monster-collecting journey as a genuine open world: the player is one resident among thousands of wild, tamed, and wandering creatures, each following their own routines long before and after the player arrives.",
    gameplayVision: "The vision is a huge, breathing world where becoming a Master is a by-product of actually living somewhere — building friendships, learning terrain, adapting to weather, and understanding an ecosystem well enough to belong in it.",
    loop: "Explore a biome → observe creature behavior shaped by time and weather → engage, befriend, or capture → return to town to rest, trade, and strengthen bonds → push into a harder, less familiar biome.",
    motivation: "Players are driven by curiosity about what's over the next ridge, attachment to specific creatures they've raised, and the social pull of a world that keeps moving whether they're watching or not.",
    mechanics: [
      "Real day/night cycle that changes creature spawns, behavior, and available activities",
      "Dynamic weather systems that alter terrain, movement, and creature temperament",
      "NPC daily schedules — townsfolk work, rest, and socialize on believable routines",
      "Friendship and trust systems that unlock unique creature behaviors and abilities",
      "Naturalistic capture and taming, replacing menu-first encounters with readable animal behavior"
    ],
    usp: [
      "A world that runs on its own clock, not the player's convenience",
      "Creature relationships that persist and evolve like real companionship",
      "Exploration rewarded with lore and ecosystem understanding, not just loot"
    ],
    systems: [
      "Ecosystem simulation layer governing spawn density, migration, and food chains",
      "Bond meter driving creature loyalty, obedience, and battle synergy",
      "Weather-reactive biome states affecting both wild AI and player traversal"
    ],
    progression: "Mastery is measured across four tracks — Region Knowledge, Creature Bonds, Battle Craft, and Community Standing — so a player can be a Master of empathy as easily as a Master of combat.",
    exploration: "Verticality, hidden groves, migratory herds that only appear during certain seasons, and settlements that change character between day and night reward players who wander off the critical path.",
    future: [
      "Cross-region migration events tied to real-world seasons",
      "Player-built sanctuaries that other players' worlds can visit",
      "Legacy save system where a retired Master's world state seeds a new save"
    ],
    roadmap: [
      { phase: "Pre-Production", detail: "Core loop prototype, ecosystem simulation tech test", pct: 100 },
      { phase: "Vertical Slice", detail: "One biome, full day/night + weather + 12 creatures", pct: 70 },
      { phase: "Systems Build", detail: "Friendship, capture, and progression systems online", pct: 35 },
      { phase: "Content Scale-Up", detail: "Full region, all biomes, complete creature roster", pct: 10 },
      { phase: "Polish & Ship", detail: "Performance pass, accessibility, launch content", pct: 0 }
    ]
  },
  {
    id: "mind-hunting",
    index: "02",
    codename: "WORLD-02",
    title: "Mind Hunting",
    subtitle: "Psychological Horror",
    genre: "Narrative Psychological Horror",
    status: "Concept / Design Document",
    tags: ["Horror", "Multiple Endings", "Reality Manipulation", "Atmosphere"],
    heroNote: "The scariest enemy is your own certainty.",
    story: "A patient volunteers for an experimental therapy meant to isolate and destroy a traumatic memory. The procedure works — almost too well. As the treatment continues, the line between memory, hallucination, and present reality erodes, and the player must work out what is actually happening before their own mind decides for them.",
    gameplayVision: "Fear here isn't jump scares — it's the slow removal of certainty. The camera, the UI, even save prompts can lie. The game is designed so that doubting the game itself becomes part of the horror.",
    loop: "Investigate a fractured environment → notice a detail that doesn't add up → decide whether to trust it → act on that belief → face a consequence that reshapes the world and the player's confidence.",
    motivation: "Players are pulled forward by the need to resolve dissonance — to know which version of events is real — and by dread of what happens if they choose wrong.",
    mechanics: [
      "Reality manipulation puzzles where solving them can be true progress or self-deception",
      "Dream-logic sequences that recontextualize earlier 'real' scenes",
      "A corruption meter tracking the mind's stability, subtly altering UI and audio as it rises",
      "Player-authored choices that brand specific endings without ever showing a choice menu"
    ],
    usp: [
      "Horror built from unreliable narration rather than monster design alone",
      "Multiple distinct endings determined by accumulated behavior, not a final dialogue choice",
      "Atmospheric storytelling — most lore is felt, not explained"
    ],
    systems: [
      "Mind corruption state machine driving environmental and UI distortion",
      "Branching narrative graph tracking small decisions toward one of several endings",
      "Adaptive audio mixing that responds to player hesitation and backtracking"
    ],
    progression: "There is no XP — progression is psychological, measured by which truths the player has accepted or rejected, quietly shaping which ending becomes reachable.",
    exploration: "Environments repeat with small, unsettling differences on return visits, encouraging players to explore carefully rather than quickly.",
    future: [
      "New Game+ mode that recontextualizes the entire story once the truth is known",
      "Companion audio drama exploring a secondary patient's parallel treatment",
      "Community-tracked ending archive without spoiling individual playthroughs"
    ],
    roadmap: [
      { phase: "Concept & Narrative Bible", detail: "Full branching structure and ending map", pct: 100 },
      { phase: "Prototype", detail: "Core corruption-meter and one reality-shift puzzle", pct: 55 },
      { phase: "Vertical Slice", detail: "Opening hour, two branching outcomes playable", pct: 20 },
      { phase: "Full Production", detail: "All chapters, full ending set", pct: 0 },
      { phase: "Ship & Post-Launch", detail: "Accessibility pass for horror-sensitive players", pct: 0 }
    ]
  },
  {
    id: "dragon-train-life",
    index: "03",
    codename: "WORLD-03",
    title: "Dragon Train Life",
    subtitle: "Open World Dragon Life Simulator",
    genre: "Open World Life Simulator",
    status: "Concept / Design Document",
    tags: ["Dragons", "Village Life", "Survival", "Crafting"],
    heroNote: "Raise a dragon. Build a life around it.",
    story: "A remote sky-village survives by bonding with dragons — not as weapons, but as partners in travel, farming, and survival. The player arrives as an outsider, earns a hatchling, and grows a life around raising it, flying it, and becoming part of a community that lives and dies by its relationship with these creatures.",
    gameplayVision: "The dragon is the vehicle, the companion, and the emotional anchor at once. The game is as much about tending a village and a bond as it is about flight.",
    loop: "Tend to village and dragon needs → gather and craft resources → fly out to explore or trade → face a survival challenge → return and reinvest in the village and the bond.",
    motivation: "Players stay for the attachment to a dragon that visibly grows and changes with care, and for the satisfaction of a self-sufficient life built from nothing.",
    mechanics: [
      "Dragon raising system — diet, training, and personality shape flight style and abilities",
      "Physically grounded flight model with momentum, wind, and stamina",
      "Village-life simulation covering farming, crafting, and relationships with fellow villagers",
      "Survival systems for weather exposure, resource scarcity, and seasonal change",
      "Companion AI so the dragon behaves as a partner in combat, travel, and exploration"
    ],
    usp: [
      "Flight that must be earned through care, not unlocked through a skill tree",
      "A dragon that ages and its personality that solidifies based on how it was raised",
      "Village life and open-world flight treated as one connected system, not two separate modes"
    ],
    systems: [
      "Bond and temperament simulation influencing dragon behavior in and out of combat",
      "Seasonal survival cycle affecting crafting recipes and village needs",
      "Trade and reputation economy linking the player's village to neighboring settlements"
    ],
    progression: "Growth is dual-tracked: the dragon matures physically and temperamentally, while the player's homestead expands from a single hut to a self-sufficient hold.",
    exploration: "Aerial traversal opens vertical exploration — cliffside nests, storm-locked valleys, and migratory dragon flocks that can only be reached once flight skill and dragon trust are high enough.",
    future: [
      "Breeding system introducing inherited traits across dragon generations",
      "Cooperative multiplayer village-building",
      "Dynamic dragon migrations tied to a persistent world calendar"
    ],
    roadmap: [
      { phase: "Concept & Flight Prototype", detail: "Core flight feel and dragon-bond loop", pct: 90 },
      { phase: "Village Systems", detail: "Farming, crafting, and NPC relationships", pct: 60 },
      { phase: "Vertical Slice", detail: "One valley, full flight + survival + village loop", pct: 25 },
      { phase: "World Expansion", detail: "Full map, dragon variety, migrations", pct: 5 },
      { phase: "Ship & Live Content", detail: "Seasonal events, breeding update", pct: 0 }
    ]
  },
  {
    id: "dream-inside-dream",
    index: "04",
    codename: "WORLD-04",
    title: "Dream Inside Dream",
    subtitle: "A Recursive Dream Narrative",
    genre: "Surreal Narrative Puzzle",
    status: "Concept / Design Document",
    tags: ["Dreams", "Memory", "Reality Shift", "Puzzle Narrative"],
    heroNote: "You fall asleep. Then you fall asleep again.",
    story: "The player falls asleep — and inside that dream, falls asleep once more. Each layer down warps a little further from anything stable, and each dream quietly rewrites the ones still waiting above it. By the final layer, the player can no longer be sure which world, if any, was ever real.",
    gameplayVision: "Memory itself is the primary gameplay material. What the player notices, forgets, or misremembers in one dream physically alters the dream layers around it.",
    loop: "Enter a dream layer → gather memory fragments and impressions → descend into a deeper, altered dream → carry (or lose) fragments across the transition → resurface to find the world above changed by what happened below.",
    motivation: "Players are driven by the disorienting pull of not knowing what's real, and the desire to reconstruct a coherent memory from fragments scattered across layers.",
    mechanics: [
      "Nested dream-layer traversal with unique physical rules per layer",
      "A memory-fragment inventory that actively edits earlier and later dream layers",
      "Forward-bleed and backward-bleed effects — actions ripple both up and down the dream stack",
      "Wake-state checkpoints that are themselves never guaranteed to be 'real'"
    ],
    usp: [
      "Memory as a manipulable gameplay resource, not a collectible or lore dump",
      "Recursive structure where every layer can rewrite every other layer",
      "No fixed 'real world' anchor — ambiguity is a permanent design pillar, not a twist"
    ],
    systems: [
      "Dream-stack state manager tracking which fragments exist in which layer at any time",
      "Rule-remapping engine — physics, geometry, and logic reconfigure per layer",
      "Memory-integrity meter subtly signalling how coherent the player's current recollection is"
    ],
    progression: "There is no traditional levelling — progression is measured by how many memory fragments the player has reconciled into a stable (if uncertain) personal truth.",
    exploration: "Each layer hides fragments that only make sense once viewed from a different layer, encouraging players to move up and down the dream stack rather than only downward.",
    future: [
      "A layer editor letting players build and share their own dream levels",
      "Audio-only 'blind dream' challenge mode built around sound-based navigation",
      "A canon interpretation released post-launch as a director's-cut epilogue"
    ],
    roadmap: [
      { phase: "Narrative Architecture", detail: "Full dream-stack map and rule matrix", pct: 100 },
      { phase: "Rule-Remap Prototype", detail: "Two connected layers with working bleed effects", pct: 45 },
      { phase: "Vertical Slice", detail: "Four-layer descent, full memory system", pct: 10 },
      { phase: "Full Production", detail: "Complete layer set and endings", pct: 0 },
      { phase: "Ship", detail: "Accessibility pass, layer editor beta", pct: 0 }
    ]
  },
  {
    id: "mera-mind",
    index: "05",
    codename: "WORLD-05",
    title: "MERA MIND",
    subtitle: "Browser Game",
    genre: "Educational / Competitive Cognitive Game",
    status: "Concept / Design Document",
    tags: ["Browser Game", "Cognition", "Competitive", "Educational"],
    heroNote: "The only opponent worth studying is your own mind.",
    story: "MERA MIND is a lightweight browser game built around a simple premise: your memory, reaction time, attention, and decision-making are measurable, trainable, and — against friends — competitive. No world to save, just a mirror held up to how your brain actually performs under pressure.",
    gameplayVision: "Short, sharp sessions that feel like a arcade reflex game on the surface but are quietly built on real cognitive-science mechanics underneath.",
    loop: "Choose a cognitive challenge → play a short, intense round → receive an instant performance breakdown → compare against friends or your own history → jump into another round to beat it.",
    motivation: "Players return for measurable self-improvement, bragging rights on leaderboards, and the addictive clarity of a score that can't be argued with.",
    mechanics: [
      "Rotating mini-challenges targeting memory, reaction time, attention, and decision-making",
      "Adaptive difficulty that scales with the player's recent performance",
      "Score breakdown translating raw numbers into plain-language cognitive insights",
      "Friend and global leaderboards with weekly resets to keep competition fresh"
    ],
    usp: [
      "Genuinely educational mechanics disguised as an addictive arcade game",
      "Instant, honest feedback instead of vague gamified praise",
      "Built for the browser — zero install, zero friction, one link to share"
    ],
    systems: [
      "Lightweight analytics engine tracking performance trends per cognitive category",
      "Adaptive difficulty curve tuned per challenge type",
      "Social leaderboard and challenge-a-friend sharing layer"
    ],
    progression: "Progress is visualized as a personal cognitive profile that sharpens over time across the four tracked categories, not a level number.",
    exploration: "Exploration here is internal — new challenge types are unlocked as the player demonstrates consistency, encouraging players to explore their own weaker categories rather than only replaying their strengths.",
    future: [
      "Classroom mode for teachers to track group cognitive-skill trends",
      "Daily challenge mode with a shared global puzzle",
      "API for third-party sites to embed a MERA MIND challenge widget"
    ],
    roadmap: [
      { phase: "Core Prototype", detail: "Four challenge types, scoring engine", pct: 100 },
      { phase: "Adaptive Difficulty", detail: "Per-player scaling and profile tracking", pct: 65 },
      { phase: "Social Layer", detail: "Leaderboards and friend challenges", pct: 30 },
      { phase: "Public Beta", detail: "Browser launch, feedback loop", pct: 5 },
      { phase: "Classroom & API", detail: "Education tools, embeddable widget", pct: 0 }
    ]
  },
  {
    id: "masti-khor",
    index: "06",
    codename: "WORLD-06",
    title: "MASTI KHOR",
    subtitle: "Comedy Adventure in the Indian Mohalla",
    genre: "Top-Down 2D Comedy Adventure",
    status: "Concept / Design Document",
    tags: ["Comedy", "Stealth", "Indian Culture", "Chase", "Puzzle"],
    heroNote: "Masti toh honi hi hai — sawaal hai kitni!",
    story: "In the heart of a bustling Indian mohalla lives Kabir, a 12-year-old boy known for his endless mischief. One fateful day, his pranks go too far, and he must face the consequences — being chased by 5 unique enemies across the neighborhood. From a mad dog to a vengeful ghost, Kabir must use his wits, stealth, and the help of friendly NPCs to survive each level and ultimately earn forgiveness.",
    gameplayVision: "Comedy-driven gameplay where every chase has a humorous twist. The game celebrates Indian culture through authentic mohalla settings, colorful characters, and dialogue that makes you smile.",
    loop: "Explore the mohalla → Find safe paths → Solve puzzles → Avoid unique enemies → Help NPCs → Reach the goal → Complete the level.",
    motivation: "Players stay for the humor, the charming Indian setting, and the satisfaction of outsmarting each uniquely designed enemy.",
    mechanics: [
      "5 unique enemy AI types — Dog, Monkey, Bees, Bull, Ghost — each with distinct chase behavior",
      "Stealth system with hiding spots, visibility meter, and noise detection",
      "Environmental puzzles using mohalla objects — crates, stalls, lanterns, ropes",
      "NPC dialogue system with humor-driven interactions and hints",
      "Stamina and health system for strategic gameplay"
    ],
    usp: [
      "Authentic Indian mohalla setting — no other game has this cultural backdrop",
      "5 distinct chase-based levels with unique enemy AI per level",
      "Comedy-first design where humor drives the gameplay, not just the dialogue"
    ],
    systems: [
      "Enemy AI state machine — Idle, Patrol, Alert, Chase, Confused, Return",
      "Detection system with sight cones, hearing range, and scent trails",
      "Inventory system with level-specific items and power-ups",
      "Dialogue system with character portraits and multiple choice responses"
    ],
    progression: "Each level introduces new mechanics — from basic hiding in Level 1 to riddle puzzles and lantern mechanics in Level 5. Mastery grows with each escape.",
    exploration: "The mohalla is dense with hidden alleys, interactive objects, and NPC side quests that reward curious players with items and humorous dialogue.",
    future: [
      "Multiplayer chase mode — one player as Kabir, others as enemies",
      "Level editor for community-created mohalla levels",
      "Festival-themed seasonal content (Diwali, Holi, Navratri)"
    ],
    roadmap: [
      { phase: "Pre-Production", detail: "GDD finalization, art style testing, Godot 4.7 setup", pct: 100 },
      { phase: "Prototype", detail: "Core movement, stealth, and Dog AI (Level 1)", pct: 40 },
      { phase: "Vertical Slice", detail: "Level 1 complete with all mechanics", pct: 15 },
      { phase: "Production", detail: "All 5 levels, full enemy AI, puzzles, NPC dialogue", pct: 0 },
      { phase: "Polish & Release", detail: "Audio, UI polish, PC/Web launch", pct: 0 }
    ]
  }
];

/* --------------------------------------------------------------------------
   SKILL NETWORK — nodes + connections for the interactive skills graph
   -------------------------------------------------------------------------- */
const SKILL_NODES = [
  { id: "core", label: "Game Design", x: 500, y: 300, r: 46, core: true,
    desc: "The hub discipline — every other skill exists to serve the design of meaningful play." },
  { id: "gdd", label: "GDD Writing", x: 200, y: 200, r: 34,
    desc: "Turning vision into a complete Game Design Document — the blueprint a full studio team builds from." },
  { id: "worldbuilding", label: "World Building", x: 800, y: 200, r: 34,
    desc: "Designing environments, cultures, and histories that make a world feel inhabited before a single asset is built." },
  { id: "psychology", label: "Player Psychology", x: 300, y: 480, r: 30,
    desc: "Understanding motivation, tension, and reward well enough to predict how a player will feel." },
  { id: "direction", label: "Creative Direction", x: 700, y: 480, r: 30,
    desc: "Holding one coherent vision steady across art, tech, audio, and narrative." },
  { id: "vision", label: "Game Pitching", x: 500, y: 520, r: 28,
    desc: "Presenting a game idea so clearly that an entire team sees, and believes in, the same unmade game." }
];
const SKILL_LINKS = [
  ["core","gdd"], ["core","worldbuilding"], ["core","psychology"],
  ["core","direction"], ["core","vision"],
  ["gdd","worldbuilding"], ["worldbuilding","psychology"],
  ["psychology","direction"], ["direction","vision"], ["vision","gdd"]
];

/* --------------------------------------------------------------------------
   TIMELINE / ROADMAP
   -------------------------------------------------------------------------- */
const TIMELINE = [
  {
    year: "Foundation",
    title: "The Spark",
    text: "A childhood fascination with games grows into a discipline — studying not just what makes games fun, but what makes them matter."
  },
  {
    year: "Now",
    title: "Design Documentation & Case Building",
    text: "Building complete, studio-ready Game Design Documents for original IPs — Pokémon Life, Mind Hunting, Dragon Train Life, Dream Inside Dream, and MERA MIND."
  },
  {
    year: "Next",
    title: "Studio Integration",
    text: "Joining a design team where systems, narrative, and world-building intersect — contributing to an open-world or life-simulation title in production."
  },
  {
    year: "Near Future",
    title: "Lead Design Ownership",
    text: "Owning core gameplay loops and progression systems end-to-end on a shipped title, from prototype to live service."
  },
  {
    year: "Vision",
    title: "Creative Direction",
    text: "Directing an original open-world life experience game from first pitch to launch — a world players remember for years."
  },
  {
    year: "Dream Companies",
    title: "Where This Leads",
    text: "Naughty Dog · Rockstar Games · CD Projekt Red · Guerrilla Games · Studios building worlds people want to live inside."
  }
];

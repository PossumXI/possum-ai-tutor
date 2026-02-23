# PossumXI AI Tutor — Design Brainstorm

## Chosen Design: REDLINE TERMINAL

**Design Movement:** Cyberpunk Ops / Tactical Hacker Terminal — Den of Thieves × Snowden × GraySwan Red Team

**Core Principles:**
1. Deep black (#050505) backgrounds with crimson (#DC143C) as the only accent — no purple, no blue
2. Monospace + sharp sans-serif typography — feels like a live terminal session
3. Scan-line overlays, glitch micro-animations, and CRT flicker to reinforce the hacker aesthetic
4. Asymmetric left-anchored layouts — content bleeds to the right, never centered

**Color Philosophy:**
- Background: `#050505` near-black — the void of a dark ops terminal
- Primary accent: `#DC143C` crimson red — danger, precision, authority
- Secondary: `#8B0000` dark red — depth and shadow
- Text: `#E8E8E8` off-white — readable but not clinical
- Muted: `#3A3A3A` dark gray — secondary elements
- Glow: `rgba(220,20,60,0.4)` — red neon glow on hover states

**Layout Paradigm:**
- Full-width hero with left-anchored text and terminal-style typewriter animation
- Horizontal rule dividers styled as `// ----` terminal comments
- Cards with left-border accent lines (1px crimson) instead of full borders
- Staggered reveal on scroll — sections slide in from left with opacity fade

**Signature Elements:**
1. Scanline overlay on hero — subtle horizontal lines at 2px intervals
2. Blinking cursor `_` after key headings and the name "PossumXI"
3. Custom possum-themed cursor: red crosshair with a small possum silhouette

**Interaction Philosophy:**
- Custom cursor: red crosshair ring that expands on hover over clickable elements
- Smooth scroll with section snap
- Hover states: text glows red, borders illuminate

**Animation:**
- Hero: typewriter effect on main headline (character by character)
- Sections: slide-in-from-left with stagger (framer-motion)
- Stats counter: count-up animation when scrolled into view
- Glitch effect on name "PossumXI" — random character flicker every 4s
- Terminal boot sequence on page load (fast, 1.5s)

**Typography System:**
- Display: `JetBrains Mono` — monospace, technical, authoritative
- Body: `Space Grotesk` — modern, readable, slightly geometric
- Accent labels: `Courier New` fallback for inline code snippets
- Size scale: 72px hero → 48px section → 24px sub → 16px body

---

<response>
<text>Approach A: REDLINE TERMINAL — chosen above</text>
<probability>0.07</probability>
</response>

<response>
<text>Approach B: GHOST PROTOCOL — muted gray-green phosphor terminal, Matrix-inspired, green-on-black</text>
<probability>0.06</probability>
</response>

<response>
<text>Approach C: CLASSIFIED DOCUMENT — redacted document aesthetic, black bars, stamped text, bureaucratic horror meets AI</text>
<probability>0.05</probability>
</response>

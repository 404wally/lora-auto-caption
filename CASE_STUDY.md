# LoRA Auto Caption: Case Study

## Building an AI-Powered Training Tool with Claude Code

**Project:** LoRA Auto Caption
**Timeline:** January 2026
**Tools Used:** Claude Code, Claude API, Node.js, Express, Tailwind CSS, Gemini (image generation)
**Status:** Live at [lora-auto-caption.onrender.com](https://lora-auto-caption.onrender.com)

---

## The Problem

Training custom LoRA models on platforms like Civitai requires a tedious manual process:
1. Collect 20-40 images of your subject
2. Resize each image to consistent dimensions (512x512, 768x768, or 1024x1024)
3. Write detailed caption files (.txt) for each image describing visual elements
4. Package everything correctly for upload

The captioning step is particularly painful—each image needs a trigger word followed by comma-separated tags describing the character's features, pose, expression, clothing, background, and more. For 40 images, that's hours of repetitive work.

---

## The Solution

**LoRA Auto Caption** automates the entire workflow:

1. **Upload** - Drag and drop your training images
2. **Analyze** - Claude AI examines each image and generates optimized captions
3. **Review** - Edit, regenerate, or approve captions as needed
4. **Export** - Download a ZIP with resized images + matching caption files

What used to take hours now takes minutes.

---

## Development Journey

### Phase 1: Core Functionality

Started with a clear prompt specifying the full tech stack and architecture:
- Node.js + Express backend
- Vanilla HTML/JS frontend (no React build step for simplicity)
- Tailwind CSS via CDN
- JSZip for client-side ZIP generation
- Anthropic API for image analysis

The initial build included:
- `/api/analyze-image` endpoint calling Claude Sonnet with vision
- Multi-step wizard UI (Upload → Review → Export)
- Client-side image resizing using canvas
- Sequential image processing with live UI updates

### Phase 2: Testing & Validation

Tested the complete flow:
- Image upload and preview grid
- Caption generation via Claude API
- Edit/regenerate/delete/approve actions
- ZIP export with properly structured files

Everything worked on first deployment—images resized correctly, captions generated accurately, ZIP structure matched Civitai's requirements.

### Phase 3: UI/UX Transformation

The functional prototype worked, but needed personality. Consulted my **Creative Director Knowledge Base**—a Gemini RAG store containing 38 design resources including:
- Müller-Brockmann's Grid Systems
- Vignelli Canon
- Thinking With Type
- Gerstner's Designing Programmes

The KB recommended principles for tool-based interfaces:
- **Visual Hierarchy** - Primary actions should dominate
- **Systematic Design** - Consistent grid and spacing
- **High Contrast** - Functional color usage
- **Clear Status** - Users should always know system state

### Phase 4: LCARS Theme Implementation

Decided to give the interface real personality with a **Star Trek LCARS** (Library Computer Access/Retrieval System) inspired design:

**Visual Elements:**
- Characteristic orange/lavender/blue/peach color palette on black
- Rounded "elbow" corners and pill-shaped buttons
- Sidebar frame with numbered sections
- Progress bar in header

**Interactive Details:**
- Live stardate calculator
- Pulsing "READY" status indicator
- Blinking "ANALYZING" state during processing
- Scanning animation on drag-over
- Step indicators that turn green with checkmarks

**Typography:**
- Antonio font (condensed, bold)
- All-caps text with wide letter-spacing
- Technical terminology ("TRIGGER WORD DESIGNATION", "INITIATE CAPTION ANALYSIS")

**Easter Eggs:**
- README.txt ends with "LIVE LONG AND PROSPER"
- Version number "v4.7.2" in footer

### Phase 5: Polish & Responsiveness

Added interactive feedback and mobile support:

**Sound Effects (Web Audio API):**
- Synthesized LCARS-style blips and chirps
- No external audio files needed
- Subtle feedback on button clicks and state changes

**Hover Interactions:**
- Glow effects on interactive elements
- Sidebar buttons slide on hover
- Brightness shifts for visual feedback

**Responsive Design:**
- Mobile: Sidebars hidden, compact footer, touch-friendly
- Tablet: Full layout with adjusted spacing
- Desktop: Complete LCARS frame experience

### Phase 6: Deployment & Social Sharing

**Deployed to Render.com:**
- Connected GitHub repo for auto-deploy
- Environment variable for API key
- Live at custom URL

**Open Graph Integration:**
- Custom social preview image generated with Gemini AI
- Clean "LAC" logo design—iconic and minimal
- Meta tags for rich link previews on social/messaging

---

## Technical Highlights

### Smart Caption Generation

The Claude prompt is optimized for LoRA training:
```
- Start with trigger word
- Comma-separated tags only
- Include: features, colors, pose, expression, clothing, background
- Under 50 words
- No full sentences
```

### Client-Side Image Processing

All image resizing happens in the browser using canvas:
- Calculates scale to cover target dimensions
- Centers and crops (like CSS object-fit: cover)
- Exports as PNG for consistent quality

### Efficient ZIP Packaging

JSZip creates the download package client-side:
```
lora-training-package.zip
├── images/
│   ├── 01.png
│   ├── 02.png
│   └── ...
├── 01.txt
├── 02.txt
└── README.txt
```

### Web Audio Synthesis

Sound effects generated entirely in code:
```javascript
// No audio files needed
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(880, ctx.currentTime);
// Creates authentic LCARS-style beeps
```

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Vanilla JS over React | Simpler deployment, no build step, faster iteration |
| Client-side resize | Reduces server load, works offline after initial load |
| Sequential processing | Prevents API rate limits, shows real-time progress |
| LCARS theme | Memorable UX, stands out from generic tools |
| Web Audio API | No external dependencies for sound effects |
| Minimal OG image | Clean branding > busy screenshots for social sharing |

---

## Results

**Before:** 2-4 hours manually captioning 40 images
**After:** ~5 minutes with AI-generated captions + quick review

The tool transforms a tedious prerequisite into an enjoyable part of the LoRA training workflow.

---

## Lessons Learned

1. **Start functional, add personality later** - Get the core working first, then invest in UX
2. **Knowledge bases accelerate decisions** - Having design principles indexed in RAG made the UI direction clear
3. **Theme commits create cohesion** - Going all-in on LCARS meant every element reinforced the concept
4. **Claude Code enables rapid iteration** - Full-stack app built, themed, and deployed in a single session
5. **Social previews matter** - A clean OG image makes sharing more impactful than a busy screenshot
6. **Mobile-first finishing** - Testing on actual devices reveals issues desktop simulation misses

---

## What's Next

- Add style presets (anime, photorealistic, etc.)
- Batch processing progress indicator
- Explore direct Civitai API integration
- Consider PWA for offline capability

---

## Try It Yourself

**Live Demo:** [lora-auto-caption.onrender.com](https://lora-auto-caption.onrender.com)

**Source Code:** [github.com/404wally/lora-auto-caption](https://github.com/404wally/lora-auto-caption)

**Tech Stack:**
- Node.js 18+
- Express 4.x
- Anthropic API (Claude Sonnet)
- Tailwind CSS (CDN)
- JSZip (CDN)

**Environment:**
```
ANTHROPIC_API_KEY=your-key-here
```

---

## Social Media Snippets

### LinkedIn Version (Professional)

> Built an AI tool that turns hours of manual work into minutes.
>
> LoRA Auto Caption uses Claude's vision capabilities to automatically generate training captions for custom AI models. Upload images, review AI-generated descriptions, export a ready-to-train package.
>
> The interesting part? I consulted a knowledge base of classic design texts (Vignelli, Müller-Brockmann, Gerstner) to inform the UI decisions, then went full Star Trek LCARS for the visual theme.
>
> Sometimes the best tools are the ones that make tedious tasks feel like you're on the bridge of the Enterprise.
>
> Try it: lora-auto-caption.onrender.com
>
> #AI #MachineLearning #DeveloperTools #UXDesign #ClaudeAI

### Threads/X Version (Casual)

> just shipped my first vibe code project
>
> LoRA Auto Caption: drag images → AI analyzes each one → generates training captions → exports ZIP
>
> gave it a Star Trek LCARS interface because why not
>
> "INITIATE CAPTION ANALYSIS" hits different
>
> lora-auto-caption.onrender.com

### Technical Version

> New project: LoRA Auto Caption
>
> Stack: Node.js + Express + Claude API + vanilla JS
>
> Features:
> - Vision API for image analysis
> - Client-side canvas resizing
> - JSZip for browser-side packaging
> - LCARS-themed UI with Web Audio sound effects
> - Responsive mobile/tablet support
>
> Turns 2-4 hours of manual captioning into 5 minutes.
>
> Built entirely in Claude Code in one session.
>
> Live: lora-auto-caption.onrender.com

---

*Case study updated: January 2026*
*A WAREZ.STUDIO project*

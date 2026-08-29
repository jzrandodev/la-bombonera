# Asset list

**2026-08-30 — direction changed.** Juan looked at the live render and called it: the procedural 3D scene has hit its ceiling. Boxes and cylinders lit with three.js lights can look clean and geometric; they can't look like kage, because kage's look comes from actual artwork composited over a simpler 3D layer, not from better light tuning. Proven the hard way last session — a full pass of shadows, PBR materials and light re-aims made the piece measurably worse, not better.

**New plan: Juan generates the environment art. Everything below this line is superseded** by the full shot list further down, which specs one background plate and one foreground cutout per chapter — real pictures replacing what the procedural scene currently tries and fails to do. The scroll choreography, chapter structure, camera pacing and audio all stay exactly as they are; only the picture changes.

This also ends the "zero image assets, everything generated at runtime" claim in the README and repo description. That was a real technical flex and it's a real thing to give up — but Juan's call, and the right one for a piece people are actually going to look at.

---

## Full shot list — one background + one foreground per chapter

**Do not mass-generate all nine before checking style.** Generate the **hero and tribuna** first — they're the two "hero shots" of the piece, bookending the emotional arc — get those looking right, lock the palette and grain approach, then do the remaining seven against that reference. Regenerating nine images because chapter one didn't match chapter two's style is the expensive way to learn this.

**Shared direction for every background plate:**
- Near-black / deep navy / gold / raw concrete — the palette the site already commits to everywhere else (CSS variables, procedural textures, the audio's implied setting). A plate that drifts warm-orange or clean-daylight will look like it belongs to a different site.
- Night, artificial light only — sodium/halogen warm highlights against cold blue-black shadow. No sky detail, no daylight.
- Heavy atmosphere: haze, grain, a sense of humidity in the air. Nothing crisp or clean.
- Wide/cinematic framing — subject placed per the notes below, generous negative space above and to the sides so text can sit over it without a crop fight.
- **Size: 2400 × 1500** (roughly 8:5). Wide enough to crop to ultrawide desktop, tall enough to crop to portrait mobile without losing the subject — keep the important content within the centre 70% so `object-fit: cover` has room to breathe on both ends.
- **Format:** WebP, quality ~78–82. Target 250–350 KB each.
- **Path:** `assets/scenes/00-hero.webp` … `08-manifiesto.webp`

**Shared direction for every foreground cutout:**
- **Real alpha.** Transparent everywhere except the silhouette itself — these composite over the background plate and the 3D layer both.
- Bottom-anchored: the subject sits at the bottom of the frame with nothing but transparency above roughly the bottom third, since it's pinned to the bottom of the viewport on the page.
- Silhouette-forward and a little graphic rather than photoreal — chainlink, concrete edges, flags, smoke should read at a glance, not reward close inspection.
- **Size: 2200 × 700**, alpha WebP. Target 200–350 KB each (alpha pushes weight up — this is the heaviest category on the list).
- **Path:** `assets/foreground/00-hero.webp` … `08-manifiesto.webp`

| # | Chapter | Background plate — what's in frame | Foreground cutout |
| --- | --- | --- | --- |
| 00 | **Hero** (pilot) | Street-level view down a narrow Caminito block toward a lit wall in the far distance — corrugated tin houses close on both sides, laundry lines crossing overhead, one warm streetlamp mid-frame, the suggestion of floodlight glow leaking over the rooftops far ahead. This is the title-card shot: needs to hold its own with large type over it. | Kerb-level: parked cars, a bollard or two, wet-street reflections of the lamp light |
| 01 | Barrio | Closer in on the tin housing — a corner where two clashing paint colours meet, a balcony overhead, one window lit warm from inside. Intimate, textural, the "you are three blocks from the ground" chapter. | Corrugated wall corner in silhouette, laundry hanging across the frame |
| 02 | Estadio | The street ends and a flat concrete wall rises the full height of frame — four storeys, ghost-painted with decades of old advertising, a gated entrance with turnstiles at street level, lit from below by warm lamps against the wall's own cold grey. This is the "the building arrives" beat. | Shuttered gate, iron bars, turnstile silhouettes |
| 03 | Túnel | Looking down a low concrete underpass — pillars every few metres in rough poured concrete, receding into a flat white rectangle of light at the far end. Claustrophobic, symmetrical, the last quiet place before the noise. | Concrete steps rising, chainlink fence at the top of them |
| 04 | Cancha | Eye-level at the touchline, looking up and back at a stand climbing almost vertically above — the crowd should read as mass and colour rather than individual figures, floodlight glare cutting across the top of frame. This is "the stands are a ceiling." | Painted touchline and grass blades at boot height |
| 05 | **Tribuna** (pilot) | The full stand from a raised angle — steep tiers absolutely packed, blue and gold smoke drifting across floodlights, confetti caught mid-air, the most energetic and brightest frame in the entire piece. This is the climax; it needs to be the loudest image on the page. | Chainlink fence, flags mid-wave, a drum, smoke banks, crowd silhouettes along the bottom edge |
| 06 | Trofeos y Leyendas | A dim underground room, cases and plinths lit by hard individual spotlights against near-total darkness, trophies and framed photographs just visible in the pools of light. Quiet, reverent, a tonal drop after the tribuna. | Vitrine edges and plinth silhouettes in the dark |
| 07 | Camisetas y Escudos | Shirts hanging on a rail under warm spotlights, badges/emblems glowing on backlit panels further down the same room — same quiet underground palette as 06, slightly warmer. | Folded shirts on a bench, light-box glow spilling onto the floor |
| 08 | **Manifiesto** (pilot) | Pulled far back and high, the whole ground as one lit shape sitting in the dark city — floodlight towers, the stadium's silhouette against the night sky, no visible detail, all mass and light. The closing, pulled-back shot. | The ground's silhouette from outside: floodlight pylons, roofline, the flat wall of lit boxes |

### Weight and loading

Nine backgrounds plus nine foregrounds is a real amount of weight — roughly 2.5–3 MB for the plates and 2–3 MB for the alpha cutouts, on top of the ~1 MB the page loads today. That's fine **if it's lazy-loaded per chapter** rather than all fetched on first paint: only the hero's pair loads immediately, everything else loads as its chapter approaches the viewport, the same pattern already used for the editorial plates. I'll build that loader once the first images land — no point building it against a spec that might shift after the pilot.

### What I need from you before generating all nine

Just the hero and tribuna. Send those back, I'll wire them in and we'll look at it together before committing to the rest.

---

## Superseded — the original code-only audit

Kept for reference; the recommendations below no longer apply to chapters getting real art, since "leave it, it reads fine" was my judgment of the procedural version and the whole point now is that the procedural version isn't good enough.

Working spec for artwork to be generated externally and dropped in. Every dimension below is taken from the actual slot in `index.html`, not estimated.

## What's actually there now

There are no image files in this project. Three different things look like imagery, and they want different treatment — worth knowing before generating replacements for something that shouldn't be replaced.

| # | What | Actually is | Reads as | Best path |
| --- | --- | --- | --- | --- |
| — | Editorial plate cards ×8 | Live offscreen renders of the scene from other camera positions | Slightly dark thumbnails of the background | **Code.** They share almost the same grade as the screen (bloom 0.74 vs 0.66, grain 0.08 vs 0.055), so they read as screenshots rather than as separate stills. A distinct grade fixes this for free |
| — | Legend card fronts ×12 | Hatched placeholder panel | Obviously unfinished | **Art.** Slot already built |
| — | Emblems ×5 | `emblemTexture()` — shield, ring, stars | Simple, deliberately placeholder-ish | Either |
| 00 | Rooftops and wires | Canvas2D | Good | Leave |
| 01 | Corrugated wall + laundry | Canvas2D | Good — the tin is some of the strongest work here | Leave |
| 02 | Gate, bars, turnstiles | Canvas2D | Good | Leave |
| 03 | Concrete steps + chainlink | Canvas2D | Fine | Leave |
| 04 | Grass + touchline | Canvas2D | Good — the blade scatter reads convincingly | Leave |
| 05 | The stand: flags, drums, smoke, crowd | Canvas2D | Good, most energy of any layer | Leave |
| 06 | The cabinet: vitrines, plinths, frames | Canvas2D | **Weak** — rectangles with gradients, written fast during the chapter merge | **Code** |
| 07 | Shirts bench + light boxes | Canvas2D | **Weak** — same problem | **Code** |
| 08 | Stand as flat silhouette | Canvas2D | **Weak** — a crude polygon, and it's the last thing you see | **Code** |

Textures — corrugated tin, concrete, pitch stripes, chainlink, smoke — are all generated at runtime and all hold up. The tin in particular is doing a lot of work in the barrio and shouldn't be touched.

### Recommended order of attack

1. **Plate grade** — cheapest, highest visible return, zero weight. Push contrast, cool the shadows, heavier grain, deeper vignette so the cards read as photographs sitting on the page rather than views of what's behind them.
2. **Foreground layers 06, 07, 08** — the three genuinely weak ones. All fixable in Canvas2D for no weight.
3. **Legend card art** — the one place a generated image is unambiguously the right answer.
4. Everything else on the list below, only if the zero-assets trade is worth making.

---

## Before starting: the zero-assets trade

The project currently claims, in three places, that nothing is loaded from disk:

- `README.md` — "There is not one photograph, texture file, or placeholder image in this repository"
- The GitHub repo description — "Zero assets — every surface and every sound is generated at runtime"
- Manifesto item 01 on the page itself

The first image that lands makes all three false. They come out together, or the art doesn't go in. Worth deciding deliberately: the claim is currently the rarest thing about the piece, and better imagery is a real trade against it, not a free addition.

A middle path exists: keep the procedural scene and use art **only** for the legend cards and the social preview, then reword the claim to "every surface in the 3D scene is generated at runtime," which stays true and still says the interesting thing.

---

## Priority 1 — slot already built, ships immediately

### Legend card fronts · 12 files
- **Size:** 750 × 1050 (5:7). Card renders at ~150–300 CSS px, so this covers 2×.
- **Format:** WebP, quality ~82. No alpha needed.
- **Target:** ~90 KB each.
- **Path:** `assets/legends/01.webp` … `12.webp`
- **Wiring:** already done. Add `art: './assets/legends/01.webp'` to the entry in the `LEGENDS` array. No code change needed.
- **Direction:** portrait crop, chest up, heavy contrast, near-black background so it sits in the card frame. The card supplies its own gold name bar and number, so leave the lower third uncluttered.
- **Note:** this is the one category with a likeness question attached, since these are real identifiable people. Your call, but worth going in aware.

### Social preview · 1 file
- **Size:** 1200 × 630.
- **Format:** WebP or PNG.
- **Path:** `assets/og-preview.webp`
- **Wiring:** needs two `<meta>` tags adding — I'll do it.
- **Why:** there is currently **no preview image at all**, so the link renders as a bare grey card everywhere it's shared. Highest value-per-kilobyte item on this list, and it doesn't touch the zero-assets claim about the scene itself.

---

## Priority 2 — needs a loader built first (small job, say the word)

### Editorial plates · 8 files
- **Size:** 1800 × 1350 (4:3). Currently rendered live at 900 × 675.
- **Format:** WebP, quality ~80. Target ~180 KB each.
- **Path:** `assets/plates/01.webp` … `08.webp`
- **Chapters:** barrio, estadio, túnel, cancha, tribuna ×2, trofeos, camisetas.
- **Trade-off worth knowing:** these are currently offscreen renders of the *same live world* from different camera positions. That trick — the still is literally the scene you're standing in — is a large part of why the cards feel connected to the background. A generated plate looks better in isolation and breaks that link.

### Emblems · 5 files
- **Size:** 512 × 610, **alpha required**.
- **Format:** WebP. Target ~40 KB each.
- **Path:** `assets/emblems/01.webp` … `05.webp`
- **Wiring:** `EMBLEMS` entries take `{ src: '...' }` instead of a shape spec.

### Foreground cutouts · 9 files
- **Size:** 1900 × 560, **alpha required**.
- **Format:** WebP. Target ~200 KB each — these are the heaviest items here.
- **Path:** `assets/foreground/00.webp` … `08.webp`
- **Direction:** silhouette-forward, bottom-anchored, transparent above. Chainlink, concrete steps, flags, drums, smoke, grass, vitrine edges.
- **Lowest priority:** the procedural versions already read well, and nine large alpha images is the single biggest weight addition on this list.

---

## Priority 3 — video

The play icons on the editorial cards are currently decorative and do nothing. Real footage would make them work.

- **Size:** 1280 × 960 (4:3, matching the card frame).
- **Length:** 4–8 s, seamless loop.
- **Format:** MP4 (H.264) plus WebM if convenient. Muted, no audio track.
- **Target:** under 1.5 MB each — video dominates page weight fast.
- **Wiring:** needs building — swap the card canvas for a `<video>` that plays on hover and on click, pauses off-screen, and respects `prefers-reduced-motion`.
- **Start with one** card as a test before producing eight.

---

## Weight budget

The page currently loads about **1 MB total** — 157 KB of HTML and 856 KB of vendored Three.js and fonts.

| If you add | Adds | Running total |
| --- | --- | --- |
| Social preview | ~80 KB | ~1.1 MB |
| 12 legend cards | ~1.1 MB | ~2.2 MB |
| 8 plates | ~1.4 MB | ~3.6 MB |
| 5 emblems | ~200 KB | ~3.8 MB |
| 9 foregrounds | ~1.8 MB | ~5.6 MB |
| 8 videos | ~12 MB | ~17 MB |

Everything below the fold should be lazy-loaded, which I'll wire in — but a 17 MB page is a different kind of site than a 1 MB one, and the first-load feel is part of what makes this read as craft.

---

## Conventions

- **WebP** for everything still. Not PNG unless alpha quality demands it.
- **Zero-padded numeric filenames**, lowercase, no spaces: `01.webp`.
- **Relative paths only** — `./assets/...` — so the site keeps working from a repo subpath.
- Drop files in and tell me; I'll wire the loaders and re-verify.

## On generation

I don't know Higgsfield's prompt syntax or its controls, so the direction notes above are tool-agnostic art direction rather than prompts. Paste back what a tool gives you and I can help iterate on framing, palette and consistency across a set — keeping the near-black / deep navy / gold / concrete palette the scene already uses, so the art and the live render don't fight each other.

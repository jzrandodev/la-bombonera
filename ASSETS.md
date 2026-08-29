# Asset list

Working spec for artwork generated externally and dropped in. Every dimension is read from the actual slot in `index.html`, not estimated.

**Method reference:** kage's README documents its own approach — scene plates and foreground artwork generated with GPT Image 2, then art-directed and composed with the live Three.js scene. Measuring that repo: **4 scene plates and 10 alpha props, 2.54 MB total.** He does not have one background per chapter — the cutouts are *objects*, reused and recombined, which is why 10 files cover 5 chapters. This list follows that shape.

**Delivery is incremental.** The loader is built so a file that doesn't exist yet is never requested. Hand over one asset at a time; the site stays shippable throughout, with each chapter falling back to its current generated layer until its props land.

---

## Shared rules — read before generating anything

This is what makes twelve separately-generated images feel like one place.

**Palette** — the literal CSS tokens the site uses:

| | |
| --- | --- |
| `#08090c` | near-black |
| `#0d1b3e` | navy |
| `#17306b` | lifted navy |
| `#f0b323` | gold |
| `#8a8b88` | concrete |
| `#e8e6e0` | bone |

**Light:** night, artificial only. Sodium/halogen warm highlights against cold blue-black shadow. No daylight, no sky detail, no clean white light.

**Atmosphere:** heavy. Haze, grain, humidity in the air. If it looks sharp and well-lit, it's wrong.

**Format:** WebP throughout. Props need **real alpha** — transparent everywhere except the subject.

### Anti-brief — what makes an asset unusable

- Any club crest, badge, sponsor logo or wordmark. Colour and geometry only.
- Recognisable faces on crowd figures — silhouette and mass, never portraits.
- Daylight, blue sky, sunlit pitch.
- Clean modern stadium architecture. This is worn concrete, rust, patched paint.

---

## The 8 props

Bottom-anchored. On the page these sit pinned to the bottom of the viewport, so **the subject lives in the lower portion of the frame with transparency above it.**

Two size classes:

- **Wide** — `1800 × 700`, alpha WebP, 150–250 KB
- **Tall** — `900 × 1200`, alpha WebP, 120–200 KB

Path: `assets/props/<name>.webp`

### 01 · `tin-panel` — wide · hero, barrio
A section of corrugated zinc wall filling one edge of frame, two or three mismatched paint colours meeting at a seam.

- **Angle:** flat elevation, very slight perspective. Sits frame-left or frame-right as the thing you look *past*.
- **Vibe:** patched, weathered, painted by whoever had paint. Rust bleeding from the fixings. Utilitarian and old, not picturesque.
- **Inspiration:** the conventillos of La Boca — corrugated sheet over timber, painted in leftover marine paint from the port, no two panels agreeing.
- **Note:** needs one clean vertical edge so it can be flipped and reused on the opposite side.

### 02 · `laundry-line` — wide · hero, barrio
Washing strung on a line crossing the frame, seen from below.

- **Angle:** shallow upward angle — the line sags across the top, garments hang down into frame.
- **Vibe:** ordinary domestic life above a street that's about to get loud. Muted bone, faded blue, dull red. Backlit so cloth glows faintly.
- **Inspiration:** lines strung between balconies across a narrow street.
- **Note:** the line reads as a thin dark curve. Keep garment spacing irregular.

### 03 · `streetlamp` — tall · hero, barrio
An old street lamp head on its bracket, with visible warm falloff.

- **Angle:** from below. Lamp head upper third, post running down out of frame.
- **Vibe:** sodium-orange, hard falloff, the kind of light that makes everything under it look jaundiced. Haze halo around the bulb.
- **Inspiration:** sodium-vapour street lighting, warm and slightly sickly, pre-LED.
- **Note:** the glow must be **in the alpha** — soft radial falloff fading to transparent, not a hard-edged cutout.

### 04 · `concrete-step` — wide · túnel, tribuna
Raw poured concrete terracing — two or three steps, edges worn and chipped.

- **Angle:** low and close, looking along the steps so they recede slightly to one side.
- **Vibe:** unpainted, stained, decades old. Cold grey with damp patches. Texture you'd scrape a hand on.
- **Inspiration:** raw terracing in older grounds — poured, never finished, worn round at the edges by use.
- **Note:** reads as the bottom edge of frame, so the top edge needs a clean silhouette against transparency.

### 05 · `chainlink` — wide · túnel, cancha, tribuna
A section of chainlink fence, close and slightly out of focus. The thing you look *through*.

- **Angle:** dead-on, filling the frame.
- **Vibe:** galvanised grey-green, some rust, a few bent links. Slightly soft — nearest thing to camera, shouldn't compete for attention.
- **Inspiration:** perimeter fencing between terrace and pitch.
- **Note:** **the most important prop in the set.** It appears in three chapters and does most of the depth work — if only one prop is excellent, make it this one. Diamond apertures large enough to see through clearly. Keep it roughly tileable horizontally so it scales without an obvious seam.

### 06 · `crowd-row` — wide · cancha, tribuna
A row of silhouetted spectators from behind — heads, shoulders, some arms raised.

- **Angle:** from behind and slightly below, as if standing among them.
- **Vibe:** near-total silhouette with rim light from floodlights above. Mass, not individuals. Irregular heights.
- **Inspiration:** a packed terrace backlit by floodlights — you read the shape of a crowd, never a face.
- **Note:** **no identifiable faces.** Silhouette only. Hard requirement.

### 07 · `flag` — tall · tribuna
A large terrace flag on a pole, mid-wave.

- **Angle:** from below. Pole enters bottom of frame, flag fills the upper portion.
- **Vibe:** hand-made, heavy fabric, not a printed banner. Navy and gold bands. Caught mid-motion with a real fold in it.
- **Inspiration:** hand-painted terrace banners hoisted on long poles.
- **Note:** **no crest, no lettering, no text.** Bands and colour only.

### 08 · `smoke-bank` — wide · estadio, cancha, tribuna
A drifting bank of smoke catching light from one side.

- **Angle:** horizontal drift across the lower frame, thinning upward into transparency.
- **Vibe:** ideally a pair — one lit navy-blue, one lit gold. Volumetric, soft, no hard edges anywhere.
- **Inspiration:** flare haze drifting across floodlight beams.
- **Note:** the most forgiving asset here. Soft alpha throughout, hard to get wrong, and it carries three chapters.

---

## The 4 hero stills

These replace the live offscreen render in four of the eight editorial cards. The other four keep their live renders.

**Spec:** `1800 × 1350` (4:3), WebP, ~180 KB. Path: `assets/plates/<name>.webp`
**Framing:** sits in a bordered card with a caption bar below and a centred play icon over the image. Keep the subject centred and clear of the bottom edge.

### A · `barrio.webp`
Street-level down a narrow Caminito block. Tin housing close both sides, laundry crossing overhead, one warm lamp mid-frame, floodlight glow leaking over the rooftops far ahead.
**Vibe:** intimate, cluttered, alive. The most human frame in the piece.

### B · `estadio.webp`
The wall. A flat concrete face rising the full height of frame, four storeys, ghost-painted with decades of old announcements, a gated entrance at street level lit from below.
**Vibe:** the building arriving. Monolithic, indifferent.

### C · `tribuna.webp`
The stand from a raised angle. Steep tiers packed, blue and gold smoke across floodlights, confetti mid-air.
**Vibe:** the loudest image on the page. This is the climax and should be the most energetic thing anywhere in the piece.

### D · `trofeos.webp`
A dim underground room, cases and plinths lit by hard individual spots against near-total darkness, trophies just visible in the pools of light.
**Vibe:** reverent, still, cold. The tonal drop after the tribuna. **No identifiable trophies or crests** — shape and gleam only.

---

## Also ready, no code needed

### Legend card fronts · 12 files
- **Size:** `750 × 1050` (5:7). WebP, ~90 KB each. No alpha.
- **Path:** `assets/legends/01.webp` … `12.webp`
- **Wiring:** already built. Add `art: './assets/legends/01.webp'` to the entry in the `LEGENDS` array.
- **Direction:** portrait crop, chest up, heavy contrast, near-black background. The card supplies its own gold name bar and number, so **leave the lower third uncluttered.**
- **Note:** the one category with a likeness question attached, since these are real identifiable people.

### Social preview · 1 file
- **Size:** `1200 × 630`. WebP or PNG.
- **Path:** `assets/og-preview.webp`
- **Why:** there is currently **no preview image at all**, so every shared link renders as a blank grey card. Highest value per kilobyte on this list.
- **Wiring:** needs two `<meta>` tags, added in the same commit as the file.

---

## What stays generated

Chapters **trofeos, camisetas, manifiesto** keep their Canvas2D foreground layers for now — they were rebuilt recently and hold up better than the ones being replaced. Expand the prop library later if they start to feel like the weak ones.

The 3D scene stays the backdrop throughout. Props and stills sit in front of and inside it; nothing here papers over it.

---

## Weight

Page today: **~1 MB** — 856 KB vendored Three.js and fonts, 161 KB HTML.

| | Count | Est. |
| --- | --- | --- |
| Props | 8 | ~1.4 MB |
| Hero stills | 4 | ~0.7 MB |
| Social preview | 1 | ~80 KB |
| **New total** | | **~3.2 MB** |

Kage ships 2.54 MB of imagery, so this lands in the same territory. Only acceptable with lazy-loading in place, so first paint still pulls only the hero's props.

---

## Conventions

- **WebP** for everything. Not PNG unless alpha quality demands it.
- Lowercase, hyphenated, no spaces: `tin-panel.webp`.
- **Relative paths only** — `./assets/...` — so the site keeps working from a repo subpath.
- Drop files in and say so; the loaders are already wired to pick them up.

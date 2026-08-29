# Asset list

Working spec for artwork to be generated externally and dropped in. Every dimension below is taken from the actual slot in `index.html`, not estimated.

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

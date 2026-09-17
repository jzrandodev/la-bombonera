# La Bombonera

A six-chapter cinematic walk from the streets of La Boca into the stands, rendered live in WebGL. Editorial typography over a continuous 3D camera path — an art book that happens to be a real-time scene.

**[View it live](https://la-bombonera-gules.vercel.app)** · [View the source](https://github.com/jzrandodev/la-bombonera) · Built by [Juan Zamora](https://www.jjzamora.com)

## What it does

- Moves a single WebGL camera along one continuous path as the page scrolls. Six named chapters over eight camera anchors, no cuts, no scene swaps — each is a composed shot on the same path. The barrio and the túnel are anchors you pass through rather than chapters that announce themselves.
- Builds the whole world procedurally: corrugated tin houses, laundry lines strung over the street, a concrete tunnel, a bowl with near-vertical tiers, a flat wall of lit boxes, floodlight towers, and the glow they throw into the night air above the ground.
- Renders its own post-processing at runtime — bright-pass, separable bloom, a filmic tone curve, film grain, vignette and a touch of chromatic aberration, all hand-written as fullscreen passes.
- Layers editorial cards over the live scene whose images are **offscreen renders of the same world**, plus foreground cutouts painted to canvas with real alpha — chainlink, concrete steps, flags, drums, smoke.
- Keeps working without any of it: reduced motion, no WebGL, a lost GPU context, or the module failing to load at all still leave the complete page readable. Two of those are tested rather than asserted. Killing the context with `WEBGL_lose_context` leaves the readable text byte-identical, the chapter menu and the language toggle both still working, and the scene comes back when the context is restored. A failed vendor fetch is the other, and it is a real failure mode rather than a hypothetical: the reveal animation hides every paragraph until script reveals it, so without a failsafe it would leave a blank scroll.

## Every surface is drawn at runtime

No texture files, no photographic source material. Every surface in the scene is computed in the browser at load:

| Surface | How |
| --- | --- |
| Corrugated tin | Sine-ribbed shading with rust bleeding from the seams, drawn into an `ImageData` buffer |
| Concrete | Layered value noise with formwork joins and aggregate speckle |
| Pitch | Mown stripes, wear noise, chalk lines drawn with Canvas2D |
| Chainlink | One diamond lattice tile, reused by the 3D fence and the foreground layers |
| Editorial plates | The live scene, re-rendered offscreen through the post chain at eight authored framings |
| Foreground cutouts | Canvas2D silhouettes with real alpha, painted once at boot |

The crowd bounce and the falling confetti run in the vertex stage — the beat is a uniform, not a CPU loop.

The one image in the repository is `assets/og-preview.jpg`, the social card that link previews need. It is composited from the live scene, not sourced.

## How it is made

`index.html` holds everything: document structure, CSS, scene construction, scroll choreography, and interaction logic. A vendored Three.js r185 ESM build provides the renderer. There is no framework, no bundler, no package manager, and no build step.

Scroll position maps to a chapter-anchored `t` value rather than raw pixels, so every chapter lands on its exact framing regardless of how tall the sections end up. The camera interpolates along a Catmull-Rom path with critical damping, and picks up a deliberate tremor in the stands chapter that fades out either side of it.

## Run locally

```bash
python3 -m http.server 4173
```

Then open <http://127.0.0.1:4173/>.

No environment variables, no analytics, no runtime network requests. Python only serves the files — any static server works.

## Project structure

```text
la-bombonera/
├── index.html          everything: markup, CSS, scene, choreography
├── PRODUCT.md          who it is for and what it is
├── ASSETS.md           artwork specs, for art that has not landed yet
├── HANDSHAKE.md        the idea in plain words
├── PROMPT.md           the brief it was built from
├── README.md
├── LICENSE
├── vercel.json         clean URLs, and a year of immutable caching on vendor
└── assets/
    ├── og-preview.jpg  the social card, composited from the live scene
    └── vendor/
        ├── three.module.min.js
        ├── three.core.min.js
        ├── THREE-LICENSE
        └── fonts/      Archivo and Piazzolla, variable Latin subsets
```

## Legend cards

The legends chapter renders from a single `LEGENDS` array in `index.html`. **Every value in it is a placeholder** — no real player, no real appearance count, no real goal tally. Fill it in from a source you trust; career figures are exactly the kind of detail that is easy to get confidently wrong.

To add card art, give an entry an `art` path and it replaces the placeholder panel on the front:

```js
{ no: '10', name: '...', art: './assets/legends/whoever.webp', position: '...', years: '...', apps: '...', goals: '...', note: '...' }
```

Cards flip on hover, on keyboard focus, and on click, so they work on touch and with a keyboard rather than hover alone.

## Swapping in your own emblems

The badge chapter ships with **original emblems invented for this page** — shield outlines, rings, stars and bars, drawn procedurally from the shared vocabulary of football crests. No real club crest is drawn anywhere in this project.

They are placeholders by design. To hang your own artwork instead, replace an entry in the `EMBLEMS` array in `index.html` with `{ src: './assets/emblems/your-file.webp' }` and load it as a texture.

The same applies to the shirts: they carry a colour and a band and nothing else. No sponsor, no manufacturer mark, no crest.

## Design and attribution

An independent, unofficial tribute to Boca Juniors and the barrio of La Boca, and to the format of MengTo's [Kage](https://github.com/MengTo/kage) — a five-chapter Three.js night walk. The code here is original and shares none of Kage's source.

Not affiliated with, endorsed by, or licensed by the club. No crest, badge, sponsor mark or kit design appears anywhere in the project; every emblem and shirt in it was invented for this page. The twelve players named in the legends chapter are real, and their career figures are matters of public record — see the source note above the `LEGENDS` array in `index.html`, and verify before relying on them.

Vendored Three.js r185 keeps its MIT notice. The type is Argentine: **Archivo** by Omnibus-Type of Buenos Aires and **Piazzolla** by Huerta Tipográfica, named for Ástor Piazzolla. Both are used under the SIL Open Font License 1.1, self-hosted as variable Latin subsets with the license text included.

## License

MIT — see [LICENSE](LICENSE). The vendored Three.js runtime and the fonts remain under their own licenses.

# La Bombonera

A five-chapter cinematic walk from the streets of La Boca into the stands, rendered live in WebGL. Editorial typography over a continuous 3D camera path — an art book that happens to be a real-time scene.

**[View the source](https://github.com/jzrandodev/la-bombonera)** · Built by [Juan Zamora](https://www.jjzamora.com)

## What it does

- Moves a single WebGL camera along one continuous path as the page scrolls. Five chapters, no cuts, no scene swaps — each chapter is a composed shot on the same path.
- Builds the whole world procedurally: corrugated tin houses, laundry lines strung over the street, a concrete tunnel, a bowl with near-vertical tiers, a flat wall of lit boxes, and floodlight towers.
- Renders its own post-processing at runtime — bright-pass, separable bloom, a filmic tone curve, film grain, vignette and a touch of chromatic aberration, all hand-written as fullscreen passes.
- Layers editorial cards over the live scene whose images are **offscreen renders of the same world**, plus foreground cutouts painted to canvas with real alpha — chainlink, concrete steps, flags, drums, smoke.
- Keeps working without any of it: reduced motion, no WebGL, or a lost GPU context all still leave the complete page readable.

## Zero image assets

There is not one photograph, texture file, or placeholder image in this repository. Every surface is generated in the browser at load:

| Surface | How |
| --- | --- |
| Corrugated tin | Sine-ribbed shading with rust bleeding from the seams, drawn into an `ImageData` buffer |
| Concrete | Layered value noise with formwork joins and aggregate speckle |
| Pitch | Mown stripes, wear noise, chalk lines drawn with Canvas2D |
| Chainlink | One diamond lattice tile, reused by the 3D fence and the foreground layers |
| Editorial plates | The live scene, re-rendered offscreen through the post chain at four authored framings |
| Foreground cutouts | Canvas2D silhouettes with real alpha, painted once at boot |

The crowd bounce and the falling confetti run in the vertex stage — the beat is a uniform, not a CPU loop.

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
├── index.html
├── PROMPT.md
├── README.md
├── LICENSE
├── vercel.json
└── assets/vendor/
    ├── three.module.min.js
    ├── three.core.min.js
    ├── THREE-LICENSE
    └── fonts/
```

## Design and attribution

An independent design study, inspired by the architecture and atmosphere of La Boca and by the format of MengTo's [Kage](https://github.com/MengTo/kage) — a five-chapter Three.js night walk. The code here is original and shares none of Kage's source.

Not affiliated with, endorsed by, or licensed by any football club. No club marks, crests, or photography are used; the palette is just a palette.

Vendored Three.js r185 keeps its MIT notice. Big Shoulders and Big Shoulders Stencil are used under the SIL Open Font License 1.1, self-hosted with the license text included.

## License

MIT — see [LICENSE](LICENSE). The vendored Three.js runtime and the fonts remain under their own licenses.

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, both confirmed, in priority order:

1. **Hiring managers and design directors** evaluating Juan Zamora professionally. They arrive from a portfolio index or a shared link, usually with several tabs open, and decide within seconds whether to keep scrolling. They are judging capability, not reading documentation.
2. **Juan himself.** This is also a passion project about La Boca and football. Work that serves only the first audience at the expense of the second is a failed trade.

## Product Purpose

A six-chapter cinematic walk from the streets of La Boca into the stands of a football ground, rendered live in WebGL and driven entirely by scroll position. The barrio and the túnel are still walked through, but they are scenery rather than chapters — the opening view and a silent pass under the stand, neither announced. Editorial typography over one continuous camera path — an art book that happens to be a real-time scene.

The journey is the point: your neighbourhood, the building arriving, going in, out onto the grass, the stands, then the quiet rooms on the way out. It **builds to the tribuna** as its climax and comes down from it.

Success is a viewer who scrolls the whole way through and remembers the place.

## Positioning

**Decided 2026-08-30: story-led, not technique-led. Club named explicitly 2026-09-15.**

The piece is positioned on the experience and the storytelling — the walk, the atmosphere, the bilingual narrative — not on how it is built. The craft should be evident without being announced.

This replaced a positioning that led with a "zero image assets, everything generated at runtime" claim, which appeared in `README.md`, the GitHub repo description and manifesto item 01.

**Resolved 2026-09-05.** All three were rewritten together. The page now says every surface in the scene is drawn at runtime, which is true, and the README names the one image in the repository and what it is for.

## Operating Context

- Encountered as a shared link or from a portfolio index; first impression happens in the first viewport, before any scrolling.
- Read on both desktop and phone. Verified at 1440×900 and 375×812, in both languages, every time.
- Scroll is the only navigation. There is a chapter rail and nav, but the primary interaction is continuous scrolling.
- Audio is opt-in behind a toggle and synthesized at runtime; the piece must work silently.
- Shared links render a proper preview card. It is composited from the live scene rather than sourced, and is regenerated when the render changes materially.

## Capabilities and Constraints

- **Six named chapters over eight camera anchors**, one continuous path, no cuts or scene swaps. Scroll maps to a chapter-anchored `t` value, so each anchor lands on its exact framing regardless of section height. Two anchors — 00 barrio and 02 túnel — carry no copy and appear in no nav: the walk passes through them. Reduced from eight named chapters on 2026-09-17 because the piece read as too busy.
- **Bilingual EN/ES**, complete parity, including a stencil-inversion device where the English view shows Spanish words. Spanish is rioplatense throughout.
- **Synthesized audio** — filtered noise beds, procedural drum, massed voices from detuned oscillators. No recordings.
- **No build step.** One HTML file (~190 KB), a vendored Three.js r185 ESM build, and two fonts. No framework, bundler, or package manager. Deploys by copying files; currently on Vercel.
- **Artwork is arriving incrementally.** A manifest-driven loader is in place: any asset path left `null` is never requested, and each chapter falls back to its generated Canvas2D layer until its art lands. The page must stay shippable at every point in that process.
- **IP boundaries, as they now stand.** The club is named and twelve real players are named, deliberately, as of 2026-09-15. What did not change and must not: no crest, no badge, no sponsor mark, no kit design, no sampled chants. Every emblem and shirt in the project is invented for the page. The disclaimer reads as an independent, unofficial tribute, in both languages and in the README.
- **Undecided:** whether the editorial cards keep their live offscreen renders, take generated stills, or mix both — the loader supports all three.

## Brand Commitments

- Authored by **Juan Zamora**; the page carries his name and links to jjzamora.com and github.com/jzrandodev.
- Project is MIT licensed. The vendored Three.js retains its MIT notice; Archivo and Piazzolla retain theirs under the SIL Open Font License. These notices currently live only in the manifesto chapter.

## Evidence on Hand

Real and available:
- The live site — https://la-bombonera-gules.vercel.app
- The public repo — https://github.com/jzrandodev/la-bombonera
- `ASSETS.md` — twelve briefed artwork specs (8 reusable props, 4 hero stills) with angle, vibe, inspiration and dimensions.

Explicitly absent — future work must not fabricate these:
- No testimonials, clients, press, awards, or usage metrics of any kind.
- No artwork yet. Every asset path in the loader is currently `null`.
- **The twelve legend cards are real people, as of 2026-09-15.** Twelve Boca Juniors players with real career figures, sourced from Wikipedia's scorers table (which states its basis as official competitions only) plus DataFactory for Riquelme. The source and that basis are written into a comment above the `LEGENDS` array. **Verify before relying on them, and never extend the list from memory** — appearance and goal counts differ by source depending on whether cup and continental games count, and these are real people in a public repository.
- **No player photographs, and none may be added.** Names and career statistics are public record; images of these players are licensed. `LEGENDS[].art` stays `null` and the card front is typographic.

## Product Principles

1. **The journey is the product.** Chapter order, pacing, and the build to the tribuna outrank any individual frame looking good in isolation.
2. **Show, don't announce.** The craft should be felt in the experience, not claimed in the copy.
3. **Never ship a broken intermediate.** Artwork arrives one file at a time; the page must be complete and shippable at every step.
4. **Both languages are the product**, not a translation of it.
5. **The fallbacks are the same story, not a lesser one.**

## Accessibility & Inclusion

Binding, confirmed by the user:

- **Reduced motion is not a degraded version — it is the same story, held still.**
- **No-WebGL and lost-GPU-context both leave a complete, readable page.**
- **Bilingual EN/ES parity** is an accessibility and audience commitment, not a feature.

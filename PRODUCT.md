# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, both confirmed, in priority order:

1. **Hiring managers and design directors** evaluating Juan Zamora professionally. They arrive from a portfolio index or a shared link, usually with several tabs open, and decide within seconds whether to keep scrolling. They are judging capability, not reading documentation.
2. **Juan himself.** This is also a passion project about La Boca and football. Work that serves only the first audience at the expense of the second is a failed trade.

## Product Purpose

A nine-chapter cinematic walk from the streets of La Boca into the stands of a football ground, rendered live in WebGL and driven entirely by scroll position. Editorial typography over one continuous camera path — an art book that happens to be a real-time scene.

The journey is the point: your neighbourhood, the building arriving, going in, out onto the grass, the stands, then the quiet rooms on the way out. It **builds to the tribuna** as its climax and comes down from it.

Success is a viewer who scrolls the whole way through and remembers the place.

## Positioning

**Decided 2026-08-30: story-led, not technique-led.**

The piece is positioned on the experience and the storytelling — the walk, the atmosphere, the bilingual narrative — not on how it is built. The craft should be evident without being announced.

This replaces the previous positioning, which led with a "zero image assets, everything generated at runtime" claim. That claim currently appears in three places (`README.md`, the GitHub repo description, and manifesto item 01 on the page) and is being retired as real artwork enters the project.

**Open decision:** the replacement copy for those three places has not been written. Until it is, the page still makes the retired claim.

## Operating Context

- Encountered as a shared link or from a portfolio index; first impression happens in the first viewport, before any scrolling.
- Read on both desktop and phone. Verified at 1440×900 and 390×844.
- Scroll is the only navigation. There is a chapter rail and nav, but the primary interaction is continuous scrolling.
- Audio is opt-in behind a toggle and synthesized at runtime; the piece must work silently.
- Shared links currently render as a blank grey card — there is no preview image of any kind.

## Capabilities and Constraints

- **Nine chapters, one continuous camera path**, no cuts or scene swaps. Scroll maps to a chapter-anchored `t` value, so each chapter lands on its exact framing regardless of section height.
- **Bilingual EN/ES**, complete parity, including a stencil-inversion device where the English view shows Spanish words. Spanish is rioplatense throughout.
- **Synthesized audio** — filtered noise beds, procedural drum, massed voices from detuned oscillators. No recordings.
- **No build step.** One HTML file (~161 KB), a vendored Three.js r185 ESM build, and a font. No framework, bundler, or package manager. Deploys by copying files; currently on Vercel.
- **Artwork is arriving incrementally.** A manifest-driven loader is in place: any asset path left `null` is never requested, and each chapter falls back to its generated Canvas2D layer until its art lands. The page must stay shippable at every point in that process.
- **IP boundaries currently in force** (present in the code and copy today; the user did not mark these as immutable, but they are the current state and removing them would be a deliberate decision, not a side effect): no club crests, badges, sponsor marks or wordmarks; no sampled chants; a non-affiliation statement on the page.
- **Undecided:** whether the editorial cards keep their live offscreen renders, take generated stills, or mix both — the loader supports all three.

## Brand Commitments

- Authored by **Juan Zamora**; the page carries his name and links to jjzamora.com and github.com/jzrandodev.
- Project is MIT licensed. The vendored Three.js retains its MIT notice and the font its OFL notice. These notices currently live only in the manifesto chapter.

## Evidence on Hand

Real and available:
- The live site — https://la-bombonera-gules.vercel.app
- The public repo — https://github.com/jzrandodev/la-bombonera
- `ASSETS.md` — twelve briefed artwork specs (8 reusable props, 4 hero stills) with angle, vibe, inspiration and dimensions.

Explicitly absent — future work must not fabricate these:
- No testimonials, clients, press, awards, or usage metrics of any kind.
- No artwork yet. Every asset path in the loader is currently `null`.
- No social preview image.
- The twelve legend cards are placeholders named "Player 01"–"Player 12"; no real player names, likenesses, or statistics have been used.

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

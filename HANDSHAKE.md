# Handshake · La Bombonera

Status: complete · 2026-09-15

## The idea in plain words

Juan is looking for a job. When he sends someone his portfolio, he wants one link that makes them stop.

So this is a web page about walking to a football ground in La Boca. The page is one long walk. You scroll, and a camera moves down a street, up to the stadium wall, through a tunnel, out onto the grass, and up into the stands where it is loudest. Then it comes back down through two quiet rooms and ends. The camera never cuts. It is one path the whole way.

The computer draws the world live while you scroll. Some real pictures will sit in front of it, because the drawn version alone did not look good enough.

It works in English and Spanish, and both count the same. If someone turns off animations, they still get the whole story, just held still.

He will know it worked when someone who is hiring sees it and wants to talk to him. Because the top of the page is what most people will ever see, that part matters more than the rest.

## Why this matters

Two reasons, both confirmed in the PRODUCT.md interview on 2026-08-30:

1. To show Juan's skills to hiring managers and design directors.
2. Because Juan wants it to exist. It is a passion project about La Boca and football.

Work that serves the first at the expense of the second is a failed trade.



## Who it's for

Primary: hiring managers and design directors, arriving from a portfolio index or a shared link, several tabs open, deciding within seconds whether to keep scrolling.

Secondary and non-negotiable: Juan.

## What exists today

Verified against the code at commit `893942d`, not claimed.

- Nine chapters (`grep -c 'data-chapter='` returns 9), one continuous WebGL camera path, driven by scroll position. Order: hero, barrio, estadio, tunel, cancha, tribuna, trofeos y leyendas, camisetas y escudos, manifiesto.
- Bilingual EN and ES, both present in the markup (`data-lang="en"`, `data-lang="es"`).
- Audio synthesized at runtime. No recordings.
- Single `index.html`, roughly 161 KB, vendored Three.js r185, no build step, deployed on Vercel.
- Live at https://la-bombonera-gules.vercel.app, source at https://github.com/jzrandodev/la-bombonera.
- An art loader is wired and inert: 10 asset paths currently `null`, so nothing is requested and every chapter falls back to a generated Canvas2D layer.
- Zero image files in the repository today.

Documents already in the project: `README.md`, `PRODUCT.md`, `ASSETS.md` (twelve artwork briefs), `PROMPT.md`.

## What success looks like

**It gets Juan conversations.** Someone in hiring sees it, and it changes how they read the rest of his portfolio. Success is counted in interviews and replies, not in traffic or peer recognition. Confirmed 2026-08-30.

Two consequences the planner must treat as load bearing:

1. The real bar is **impressive within about five seconds to a design director**, not impressive after a full read.
2. The **first viewport is the highest stakes surface in the piece**. It is the hero chapter. Everything after it only matters to people the hero already convinced.

## The visual problem, diagnosed

Asked on 2026-08-30 what he is reacting to when he says the site looks bad, Juan selected **all four** offered failures:

1. It reads as 3D shapes, not a place. The eye clocks a WebGL demo rather than a street in La Boca.
2. Too dark. Large parts of the frame are near black and the scene is a strain to read.
3. Empty. Dead space, sparse detail, nothing rewarding a close look.
4. The type and layout feel ordinary rather than designed.

This is the single most important finding in this document. Two consequences:

**No single axis fix will move it.** Three prior sessions each attacked one dimension and failed, at real cost. Tightening the bloom improved darkness slightly and made emptiness worse. Adding street lights improved the hero and flattened the tribuna. The measured brightness curve now peaks at chapter 0 instead of the tribuna, which inverts the intended build, and that regression is live in commit `c20e65c`.

**The art pipeline is necessary but not sufficient.** Artwork addresses 1 and 3. Exposure and grading address 2. A typography and layout pass addresses 4. All four have to land for the piece to clear the five second bar.

## Decisions already made

- Positioning is story-led, not technique-led. The "zero image assets, generated at runtime" claim is being retired. Confirmed 2026-08-30.
- Real artwork is coming in, generated externally by Juan. 8 reusable props plus 4 hero stills, briefed in `ASSETS.md`.
- The live 3D scene stays as the backdrop. Artwork sits in front of and inside it, it does not replace it.
- Chapter order is settled after four passes. The walk builds to the tribuna and comes down from it.
- Assets arrive one at a time. The page must stay shippable at every point.

## Decisions still open

Only one, and it is not blocking: **whether to keep leading with the technique at all.** The positioning moved to story-led, and the copy followed, but the meta strip in the opening still lists Render, Geometry, Surfaces and Build step. That is a deliberate residue rather than an oversight. Default: leave it. It reads as a colophon rather than a boast, and a technical reviewer looks for exactly that.

## Constraints and guardrails

Confirmed binding by Juan on 2026-08-30:

- Bilingual EN and ES parity. Both languages are the product, not a translation of it.
- Reduced motion is the same story held still, not a degraded version. No-WebGL and lost-GPU-context both leave a complete readable page.

Present in the code today, not marked binding by Juan, would need a deliberate decision to remove:

- No club crests, badges, sponsor marks or wordmarks. No sampled chants. A non-affiliation statement on the page.
- No build step.

## Out of scope

- **A build step.** No bundler, no package manager, no framework. This is load-bearing: it is stated in the README, it is why the page is one file, and it is the reason the 733 KB of Three.js cannot be tree-shaken. Giving it up would be a real trade, not a cleanup.
- **Club marks of any kind.** No crest, no badge, no sponsor, no kit design, no sampled chants. Naming the club and the players is as far as this goes.
- **Player photographs.** Names and career figures are public record; the images are licensed.
- **More chapters.** Eight was reached by merging down from nine, deliberately.
- **Anything that fetches at runtime.** See the deferred fixtures API.

## Open questions for research

1. **Does the reduced-motion media query actually fire on a real machine?** The rules it contains are verified; the trigger is not, because no harness here can set the OS preference. Matters because it is one of two binding constraints.
2. **Do the twelve players' figures survive a second source?** They come from Wikipedia's scorers table on a stated basis, plus DataFactory for Riquelme, and they cross-check. But they are real people in a public repo, so a second opinion is cheap insurance.
3. **Does the Spanish read as rioplatense to a native?** It uses voseo, *bombo*, *tablones*, *papel picado* throughout and is grammatically sound. Register is the part I cannot check.

## Handoff notes

Everything is one file, `index.html`, about 190 KB, no build step. A local server on `:4173` is the whole toolchain.

**Read `PRODUCT.md` first** for who this is for, then `ASSETS.md` for what artwork is still needed and at what dimensions.

**The single check that matters** is the eight-value luma sweep across the chapters — but run it the way `VERIFY.md` specifies: on the **composite**, at **both viewports**, and **settled** (120 stepped frames per chapter, averaged). Corrected 2026-09-16: the sweep had been sampling only the WebGL canvas, while the foreground art sits in separate canvases covering the bottom 47% of the frame, and it receives none of the per-chapter `GRADE`.

Measured properly, **desktop is fine** — it still peaks at the tribuna (55.5), with the barrio a close second (52.2), so the build is shallow rather than broken. **Mobile is a different curve**: it peaks at the túnel (50.0) and the tribuna comes 4th of 8 (22.6), because `camera.fov` is vertical and held constant while only `aspect` changes, collapsing the horizontal fov to ~46% in portrait. Do not tune brightness against the old stage-only number, and do not read the sweep under-settled — a 14-frame read invents an inversion on desktop that does not exist.

**The loader is inert by design.** Asset paths are `null` and a `null` is never requested, so the site is always shippable regardless of how much artwork exists. Activating one is a one-line change.

**Verify on mobile as well as desktop, and exercise controls rather than measuring them.** Both rules were written after real breaks: Spanish was unreachable on a phone for weeks, and a skip link that passed every size check did nothing at all.

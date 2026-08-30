# Handshake · La Bombonera

Status: draft, interview in progress

## The idea in plain words

TODO, written after a read-back passes.

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

TODO, each with a recommended default.

## Constraints and guardrails

Confirmed binding by Juan on 2026-08-30:

- Bilingual EN and ES parity. Both languages are the product, not a translation of it.
- Reduced motion is the same story held still, not a degraded version. No-WebGL and lost-GPU-context both leave a complete readable page.

Present in the code today, not marked binding by Juan, would need a deliberate decision to remove:

- No club crests, badges, sponsor marks or wordmarks. No sampled chants. A non-affiliation statement on the page.
- No build step.

## Out of scope

TODO.

## Open questions for research

TODO.

## Handoff notes

TODO.

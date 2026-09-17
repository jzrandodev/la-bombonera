# Verification

## The luma sweep, corrected 2026-09-16

The eight-value luma sweep is the check this project leans on. **Until now it
measured the wrong thing**, and every brightness decision on the piece was tuned
against that wrong number.

The sweep sampled `#stage canvas` — the WebGL canvas. But the foreground art
lives in `#foreground` as **separate canvases**, one per chapter, and at
1440×900 the active one occupies `y = 476…900`: the bottom **47%** of the frame.
None of it was ever in the measurement.

So the sweep reported the 3D void *behind* the foreground layer, not the frame
the viewer sees. It also means the per-chapter `GRADE` table only ever graded
the top half of the composite: the foreground canvases are outside the WebGL
pipeline and receive no `uExposure` / `uContrast`.

### What the two measurements say

All figures are the **settled** composite: 120 stepped frames per chapter, then
the mean of the last four samples. Settling matters — a 14-frame read made the
desktop curve look inverted, and it is not. Chapter 4 oscillates by ~1.4
because it is `TREMOR_CHAPTER`, so always average it.

Desktop, 1440×900:

| | 00 barrio | 01 estadio | 02 túnel | 03 cancha | 04 tribuna | 05 trofeos | 06 camisetas | 07 manifiesto |
|---|---|---|---|---|---|---|---|---|
| Stage only (old metric) | 35 | 18.6 | **14.3** | 36 | 42.2 | 14.1 | 20.3 | 10.8 |
| Composite (true) | 52.2 | 18.8 | 31.3 | 37.9 | **55.5** | 18.1 | 20.3 | 12.2 |

Mobile, 375×812, composite: `28.1 · 19.4 · **50.0** · 16.1 · 22.6 · 20.1 · 45.5 · 7.9`

### Three findings that follow

1. **Desktop is fine, and the old metric was not wrong about that.** The
   composite still peaks at the tribuna (55.5). The barrio is a close second at
   52.2, so the build to the climax is *shallow* — 3.3 of lead — but it is not
   inverted. An earlier under-settled read here claimed an inversion; it was an
   artifact, and the claim was withdrawn.

2. **Mobile is a genuinely different curve, and the climax is 4th of 8.** It
   peaks at the **túnel** (50.0), with camisetas — a quiet interior room —
   second at 45.5. The **tribuna reads 22.6**, under half the brightest frame.
   Cause: `camera.fov` is the *vertical* fov and is held constant while only
   `camera.aspect` changes (`index.html:4503`, `:4587`). At 375×812 the
   horizontal fov collapses to ~46% of desktop, so wide vistas — tribuna,
   cancha, manifiesto — are cropped to their dark centres, while the narrow
   corridor of the túnel fills the portrait frame with its lit exit.
   Survives settling; reproduced forward and reverse.

### Tried and reverted twice: the smoke sprites (2026-09-16)

The large soft blue discs over the cancha, the tribuna and the manifiesto are
the most prominent "this is a WebGL demo" artifact left in the piece. **Two
measured attempts to fix them both regressed and both were reverted.**

The arithmetic first, because it explains the trap. With `sizeAttenuation`, a
sprite's on-screen height is `size / (2 * d * tan(fov/2))`. At the shipped
`size: 7.2` that is **half the frame height at 13 units** and still a fifth of
it at 30. A particle that large cannot read as haze at any distance the camera
actually occupies. The earlier 8 -> 7.2 change could never have fixed this: the
size is off by a factor, not a fraction.

**Attempt 1 — fade near particles instead of culling them.** The hard cull is
stuck between two failures (cull at 7 deletes the tribuna's haze because the
camera stands inside the smoke; cull at 2.6 leaves everything from 2.6 to ~8
units rendering as a disc). Since the blending is additive, scaling a
particle's colour scales its intensity, so near particles can dim to nothing
instead of swelling. Implemented with a `colBase` array so the fade cannot
compound. Result: coverage down everywhere — **estadio -6.6**, tribuna -1.7 —
and visually no better. The blobs remained, because they are not primarily
near-camera particles; they are *any* particles, at this size. A murky orange
mass also became more visible once the blue was dimmed.

**Attempt 2 — cut the size by a factor and raise the population.**
`size: 2.0`, `N: 4600`, opacity 0.34. This does remove the discs, and frame
cost was fine at 0.8 ms. But it overshoots into the opposite failure: the
smoke reads as discrete blue dots, like snow, rather than atmosphere. And it
cost the climax nearly a fifth of its coverage — **tribuna -9.7**, 61.2 to
51.5. Reverted.

**Conclusion: size tuning alone cannot fix this.** Too large reads as blobs,
too small reads as dots, and the tribuna pays for both because the camera sits
inside the volume there. A third size is not the answer. What is untried: a
genuine depth-graded haze (a shader term, or a few large low-opacity gradient
planes) carrying the atmosphere, with the point sprites reduced to a sparse
accent or removed. **Do not attempt another size or cull constant.** Counting
the earlier orange-disc pass, atmosphere tuning has now regressed three times.

### Tried and reverted: portrait fov compensation (2026-09-16)

The obvious fix for finding 2 — widen the vertical fov as the frame narrows, so
portrait keeps more of the horizontal extent — **was implemented, measured, and
reverted.** It made every chapter darker and fixed nothing:

| | 00 | 01 | 02 | 03 | 04 tribuna | 05 | 06 | 07 |
|---|---|---|---|---|---|---|---|---|
| Before | 28.1 | 19.4 | 50.0 | 16.1 | 22.6 | 20.1 | 45.5 | 7.9 |
| After (reverted) | 21.2 | 9.1 | 30.3 | 17.6 | **17.6** | 16.6 | 31.1 | 6.6 |

Two reasons it cannot work, and they are structural rather than a tuning miss:

- **Widening the fov admits more unlit scene.** The walk is mostly dark geometry
  around a few lit subjects, so any increase in field of view lowers mean luma.
  The direction is monotonic — a gentler constant moves less, not differently.
- **The cap flattens the fov language.** Restoring horizontal extent at aspect
  0.46 needs ~119°, so any usable cap saturates: 7 of 8 chapters came out at
  exactly 74°, erasing the authored 46→64 range that gives each chapter its
  focal character.

The tribuna stayed 4th of 8 throughout. **Do not re-attempt this.** The
diagnosis in finding 2 is still correct — constant vertical fov IS why mobile is
a different curve — but compensating the fov is not the remedy. What is left
untried: per-shot mobile framing (separate `pos`/`look` for portrait), or an
aspect-aware term in `GRADE` that exposes the cropped vistas harder.

This is the fifth framing change on this project to measure worse and be
reverted. The pattern is consistent enough to be a rule: **framing and lighting
changes on this scene regress it.** Do not attempt another without new material
in the frame.

3. **The túnel was never the weak frame.** Three sessions treated it as the
   darkest chapter and tried lighting and reframing it. It reads 31 on desktop
   and is the *brightest frame in the walk* on mobile. The genuinely weak frame
   at both sizes is **07 manifiesto** (12.2 / 7.9), then 05 trofeos and 01
   estadio.

## Mean luma is a poor metric. Use midtone coverage.

Added 2026-09-16, after looking at the frames instead of only measuring them.

Mean luma does not track how good a frame looks, and on mobile it actively
inverts the ranking. The túnel measured **50 — the brightest frame in the walk**
— while being visibly the worst frame on the page: a flat, featureless white
rectangle floating in black. One small very bright region carries the whole
mean.

The signature of that failure is visible in the spread, not the mean: ch02 had
the highest mean (50), the **highest sd (88)**, and **66% of the frame near
black**. Nothing was clipped — blown pixels were 0.0% — the card simply sat flat
at 239–242 across its entire area.

**Midtone coverage** — the share of pixels in luma 25…235 — matches the eye far
better, and it measures the two things actually complained about (too dark,
empty):

```js
let mid = 0, n = 0;
for (let i = 0; i < d.length; i += 4) {
  const v = (d[i] + d[i+1] + d[i+2]) / 3;
  if (v >= 25 && v <= 235) mid++;
  n++;
}
const midtonePct = mid / n * 100;
```

On mobile it moved the túnel from 1st by mean to **7th by coverage**, and put
camisetas and tribuna on top — which is what the contact sheet shows. On desktop
mean and coverage agree, which is a useful signal in itself: **desktop is
healthy, mobile is not.**

Average coverage is ~31% desktop and ~21% mobile. No frame exceeds 62%. That
number is the "empty" complaint, quantified.

**Always build a contact sheet and look at it.** Every wrong conclusion on this
project came from trusting a scalar. Composite each chapter into a grid canvas
and POST it to a local sink to view it — the Browser pane cannot screenshot
while hidden, and `img.decode()` hangs there, so draw the source canvases
straight into the sheet rather than round-tripping through an `Image`.

## Verified baseline, 2026-09-16

Midtone coverage, composite, settled, corrected harness (`last = 0`):

| | 00 | 01 | 02 | 03 | 04 | 05 | 06 | 07 | avg |
|---|---|---|---|---|---|---|---|---|---|
| Desktop | 51.2 | 22.4 | 34.1 | 39.6 | **61.2** | 19.5 | 16.5 | 11.5 | 32.0 |
| Mobile | 27.4 | 30.7 | 24.1 | 13.2 | **33.0** | 15.0 | 30.2 | 7.9 | 22.7 |

**Two fixes landed against this, and both were the same move: a flat
placeholder replaced with a generated texture.** Neither touched a light, a
camera or a framing.

- **02 túnel mouth.** A flat white `MeshBasicMaterial` card capped the corridor.
  It was the brightest thing in the chapter and completely featureless — sitting
  at 239–242 across its whole area. Replaced with sky, far stand, crowd speckle,
  perimeter boards and pitch. **+2.6 desktop, +10.8 mobile.**
- **01 estadio facade.** Used `MAT.concrete` with no repeat set, so a 256px tile
  stretched across a 26×18 m slab and the aggregate speckle came out at metre
  scale. Every other concrete surface clones the map and sets a repeat; this one
  did not. Replaced with a 6 m facade texture, repeated per slab.
  **+1.9 desktop, +5.3 mobile.**

### How to A/B a change honestly

`git stash push index.html`, rebuild the harness, sweep; `git stash pop`,
rebuild, sweep again. Under a matched `__T` schedule the corrected harness is
**deterministic to the decimal**: in both runs above, every chapter other than
the two touched came back byte-identical. That is the control — if unrelated
chapters move, the schedules did not match and the comparison is void.

Do not compare against numbers from an earlier session or an older harness. The
pre-2026-09-16 figures were taken with the corrupted clock and are not a valid
baseline for anything.

## Performance, measured 2026-09-17

Prompted by "takes too long to load and feels laggy". Two of the three parts
are measurable here; one is not, and the docs previously carried a frame-cost
number that was wrong.

**Load is not the problem.** On the live deploy, behind Vercel's compression:

| | transfer | decoded |
|---|---|---|
| index.html | 59 KB | 198 KB |
| three.core.min.js | 102 KB | 376 KB |
| three.module.min.js | 88 KB | 357 KB |
| arch-var-latin.woff2 | 88 KB | — |
| piaz-var-latin.woff2 | 50 KB | — |
| **total** | **388 KB** | |

TTFB 24 ms, domInteractive 446 ms, load 973 ms. Procedural texture generation
— every noise field and canvas texture in the scene — is **16 ms**, and the
whole module init finishes by ~199 ms locally. Nothing here is pathological.
The 190 KB of compressed Three.js is the floor, and cutting it needs a build
step, which is out of scope.

**Frame cost cannot be measured in this harness, and the old number was
wrong.** The plan claimed 1.15 ms/frame; that was JS-only timing, which
returns before the GPU has done anything. Forcing a sync with a 1×1
`gl.readPixels` after each frame gives 9–23 ms instead — trofeos 23.5,
barrio 19.9, manifiesto 19.5, against a 16.7 ms budget for 60 fps. That
matches the reported lag.

But those figures are **not trustworthy either**: sweeping `setPixelRatio`
produced lower resolutions measuring *slower* (1.0 → 30 ms vs 1.75 → 20 ms),
which is impossible for fragment-bound work, and one chapter drifted
20.8 → 39.1 → 36.7 → 32.9 within a single run. The Browser pane is hidden, so
GPU work is descheduled unpredictably. **Do not tune frame cost against
numbers taken here.** Judge it on a real machine, or instrument with
`EXT_disjoint_timer_query`.

### What was changed, and on what grounds

Since frame time is unmeasurable here, these were justified by arithmetic and
verified not to break the image, rather than by a timing delta:

- **`setPixelRatio` 1.75 → 1.5.** 2520×1575 → 2160×1350, **26% fewer
  fragments**, which the scene pays for twice: once for the bowl and its
  twenty-odd point lights, again for the additive sprites over it. Reversible
  by one number.
- **Confetti 1500 → 620.** The busiest thing in the frame and 1500
  double-sided planes with a custom vertex shader behind it.
- **Smoke 1100 → 720**, size unchanged. Population is free to come down;
  *size* is what gives these their character and changing it has regressed
  twice (see above).

Midtone coverage cost of all three together, desktop:
`-1.1 · -1.5 · -0.1 · -4.0 · -2.2 · -0.2 · +0.2 · -1.3`. The worst is cancha,
where the confetti was densest. That is an accepted trade: "too busy" was the
brief, and coverage counts bright confetti pixels as content.

## Running the sweep

Local server on `:4173`. Rebuild the temporary `verify.html` harness, which
exposes `__seek(t)` (`tTarget = tCurrent = v; dirty = true`) and `__step(ms)`.
**Delete `verify.html` before committing.**

Measure the composite, not the stage:

```js
const s = document.createElement('style');
s.textContent = '*{transition:none!important;animation:none!important}';
document.head.appendChild(s);                    // trap 1, see below

const stage = document.querySelector('#stage canvas');
function luma(vw, vh) {
  const W = 240, H = Math.round(240 * vh / vw);
  const t = document.createElement('canvas'); t.width = W; t.height = H;
  const x = t.getContext('2d');
  x.drawImage(stage, 0, 0, W, H);
  const act = document.querySelector('.fg-layer.is-active');   // class, NOT opacity
  if (act) {
    const r = act.getBoundingClientRect();
    x.drawImage(act, r.x / vw * W, r.y / vh * H, r.width / vw * W, r.height / vh * H);
  }
  const d = x.getImageData(0, 0, W, H).data;
  let sum = 0, n = 0;
  for (let i = 0; i < d.length; i += 4) { sum += (d[i] + d[i+1] + d[i+2]) / 3; n++; }
  return +(sum / n).toFixed(1);
}
const out = [];
for (let t = 0; t <= 7; t++) {
  window.__seek(t);
  for (let i = 0; i < 30; i++) window.__step(1e5 + t * 800 + i * 16);
  out.push(luma(1440, 900));
}
```

Run it at **1440×900 and 375×812**, in both languages. Mobile is not optional;
it is where the real breaks have been, and it is a different curve, not a
scaled one.

## The harness lies in five specific ways

Each has cost a full cycle, some more than once. The first one cost one *today*.

- **Transitioned properties freeze at their from-value.** Inject
  `*{transition:none!important;animation:none!important}` **before** reading.
  `.fg-layer` has a 900ms opacity transition, so selecting the active layer by
  computed `opacity` returns a *stale* layer — that error composited chapter
  2's art onto all eight frames and produced a plausible, entirely wrong table.
  **Select by `.is-active`, never by opacity.**
- **Never await `requestAnimationFrame`.** Throttled to zero; hangs ~45s.
- **`:focus` never matches**, because `document.hasFocus()` is false. Test focus
  via `activeElement`.
- **`IntersectionObserver` does not fire**, so text reveals cannot be observed.
  Note this does *not* affect foreground layers: `setChapter` is driven from the
  render loop via `tCurrent` (`index.html:4535`), so `__seek` does switch them.
- **`__unpause()` corrupts the animation clock.** `paused` initialises from
  `document.hidden`, and the Browser pane is usually hidden, so every frame
  returns early and the whole sweep reads 0 — hence the hook. But setting
  `last = performance.now()` then calling `__step(16)` yields
  `dt = (16 - 60000)/1000`, a large negative dt that throws `U_TIME` backwards
  by an arbitrary, per-run amount. Animated chapters then sit at a different
  phase every run: stable *within* a run (range 0.2) but swinging up to 9
  points *between* runs. Static content is unaffected — the tunnel mouth
  measured 24.1 with zero variance across 8 samples and across runs.
  **Set `last = 0` in the hook, and only compare numbers taken under the same
  `__T` schedule.** Treat cross-run deltas on animated chapters (01 estadio,
  03 cancha, 04 tribuna) as noise unless the schedules match.
- **Cached pages are served** after an edit; add a query string.

## The rest of the pass

1. Both languages at both viewports.
2. Contrast audit, tap targets, overflow, console, network.
3. **Exercise controls, do not just measure them.** Every significant bug lately
   passed a size or screenshot check.
4. `node --check` the extracted module — parse errors only, so read the console
   too. A check that silently receives an empty string reports "module OK";
   assert on the extracted length before trusting it.

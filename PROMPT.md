# Build brief

A portable description of what this project is, written so the experience could be rebuilt or reinterpreted from scratch. This is an original brief for La Bombonera — it is not the brief from any other project.

## The idea

A single page that walks the reader from the streets of a dockside barrio into the stands of a football ground on a matchday night. It should read as a printed art book laid over a living 3D world — deliberate, quiet in its typography, loud in its imagery — and never as a product landing page.

## Environment

Build the world procedurally in a fixed, full-viewport Three.js canvas. Nothing is loaded from disk: sheet-metal houses, balconies, laundry strung between rooftops, a concrete underpass, steeply raked terraces, a flat wall of lit boxes, and lattice floodlight towers are all constructed in code, as are every texture and every particle.

Light it like a night fixture: one hard, cold key from above, deep unlit shadow everywhere else, warm interior windows as the only relief. Hold the palette to near-black, deep navy, gold, and raw concrete grey. Air should be doing something in every shot — haze, drifting smoke, paper still falling.

## Camera

One camera, one path, no cuts. Scroll drives a normalised position along a spline, damped so it never snaps. Anchor each chapter to an exact framing so a reader who lands mid-page sees a composed shot rather than an accident. One chapter — the stands — earns a tremor in the camera; nowhere else does.

## Post-processing

Write the passes yourself rather than importing a stack: threshold the bright regions, blur them separably at reduced resolution, then composite bloom, a filmic tone curve, film grain, vignette, and a small amount of edge chromatic aberration in one shader. Grain belongs in display space; in linear it multiplies through the shadows.

## Page

Structure it as eight chapters — arrival, the streets, the wall of the ground itself, the threshold, the pitch, the stands, then two quiet rooms under the stand on the way out, and a closing manifesto. The walk should build to the loudest chapter and come down from it, not peak in the middle. Set oversized, left-aligned, condensed display headings against small technical labels in mono, thick rules, and a lot of empty space. A second, larger stencil word sits behind each chapter as texture.

Editorial cards carry stills of the same world, framed differently and rendered offscreen. Foreground elements — fencing, steps, flags, drums, smoke — sit at the bottom of the viewport with real alpha, arriving at full opacity, holding while their chapter is active, then blurring away at the handoff.

## Motion

Reveal headings a word at a time and supporting elements one by one. Move slowly and precisely. Let navigation, the chapter rail, the cards and the foreground all respond to which chapter is active. Every piece of motion should carry narrative weight; none should be decoration.

## Constraints

- One `index.html` holding structure, styling, scene, choreography and interaction.
- A vendored renderer. No framework, no bundler, no package manager, no build step.
- All assets local, all paths relative, so the page works from a repository subpath as readily as from a domain root.
- No analytics, no trackers, no remote fonts, no network requests at runtime.
- No placeholder imagery, no glassmorphism, no indiscriminate glow.
- A custom cursor only where the pointer is fine.
- Working anchor navigation, a real mobile layout, semantic landmarks, accessible labels.
- Reduced motion must deliver the entire reading experience, not a degraded one. The same is true when WebGL is unavailable.

## Before shipping

Check every asset for 404s. Parse every inline script. Read the console. Scroll the whole page and use the navigation at desktop width and at roughly 390 × 844.

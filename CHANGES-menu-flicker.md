# Mobile menu: pre-animation flicker fix (surgical)

Animation, easing, durations, markup and visuals are unchanged. Files touched: `src/mobile-menu.css`, `src/modules/menu.js`.

Causes found (measured in Chromium, not guessed):
1. **Scrollbar jump** – `html.mm-lock{overflow:hidden}` removed the classic scrollbar on the click frame, so the header/button moved 15px (313 -> 328). Fix: `scrollbar-gutter:stable` while locked.
2. **Button background snap** – `.mb` background is a gradient; gradients can't transition, so it flipped instantly on frame 1. Fix: same two gradients driven by registered `@property` variables, morphing with the existing .5s timing.
3. **Focus ring pop-in** – `mb.focus()` on close made the ring appear instantly. Fix: ring colour fades in; pointer-initiated focus no longer requests `focus-visible`.
4. **Work on the click frame** – `getBoundingClientRect` + forced reflow + scroll-spy ran inside the click. Now done on `pointerdown` (also lets the layer get painted, still fully clipped). Keyboard path is unchanged.

## v3 – real-device (Samsung) investigation
No visual/production CSS change. Added opt-in on-device diagnostics: open `https://<site>/?mmdiag` on the phone
(`src/modules/menu-diag.js`, separate chunk, not requested without the flag). It records frame times, viewport/visualViewport
changes, long-animation-frames and layout shifts for each open/close, and has chips that switch single suspects off for A/B.

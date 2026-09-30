# MAGICAL website

Vite + vanilla JavaScript (no framework). English and Armenian.

    npm install
    npm run dev       # http://localhost:5173
    npm run build     # output in dist/
    npm run preview

## Structure
- `index.html` — all page markup and the SVG icon sprite
- `src/styles.css` — all styling, animations, responsive rules, reduced-motion rules
- `src/main.js` — entry point (fonts, CSS, modules in order)
- `src/modules/content.js` — services, principles and process-step copy (English)
- `src/modules/translations.js` — Armenian translations, keyed by the English text
- `src/modules/render.js` — builds the cards from content.js
- `src/modules/terminal.js` — typed code window in the hero
- `src/modules/reveal.js` — scroll reveals, process line, card spotlight, contact form
- `src/modules/i18n.js` — EN / Armenian switcher (choice saved in localStorage)
- `src/modules/motion.js` — star field, parallax, card tilt, magnetic buttons, cursor glow, scroll progress
- `public/assets/` — `magical-m.png` (logo, white on transparent), `hero-network.jpg`, `brand/Magical-02.original.jpg` (your original logo file)

## Notes
- Fonts (Outfit, Inter, Noto Sans Armenian) are installed from npm (@fontsource) and bundled.
- To add or change text: edit `content.js` or `index.html`, then add/update the matching key in `translations.js`.
- The contact form does not send anything yet (see `reveal.js`, last lines). Connect it to a real email/backend before launch.
- Contact details shown: magical.am, Instagram @official_magical_company, "Armenia". No email/phone is shown because none was confirmed.

## Responsive notes
- No element may exceed the viewport width. The hero/CTA glow (`.orb`) is sized in `vw`, sections use `overflow-x: clip`, grid/flex children have `min-width: 0`, and long text uses `overflow-wrap`.
- Mobile rules (≤640 / ≤480 / ≤360px) are at the end of `src/styles.css`.

## Mobile navigation (<=960px)
- `index.html` — `#mb` (the "M" portal button, inside the header) and `#mm` (full-screen layer). Both are `display:none` above 960px, so desktop is unchanged.
- `src/mobile-menu.css` — all menu styling and animation. `src/modules/menu.js` — open/close, scroll-spy, particles, link handling.
- Menu items use the same English text keys as the desktop nav, so `translations.js` translates them automatically. Links point to the existing sections (#services, #why, #work, #process, #about, #contact).

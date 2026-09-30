// Mobile navigation: "M" portal button + full-screen layer (markup lives in index.html, styles in mobile-menu.css).
// Desktop is untouched: the button/layer are display:none above 960px, and this module closes the layer if the viewport grows past it.
const mb = document.getElementById('mb'), mm = document.getElementById('mm');
if (mb && mm) {
  const header = document.querySelector('header'), root = document.documentElement;
  const links = [...mm.querySelectorAll('a[href^="#"]')];
  const items = [...mm.querySelectorAll('.mm-i')];
  const desk = matchMedia('(min-width:961px)');
  const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
  let isOpen = false;

  // floating particles (few, small, slow)
  const dots = mm.querySelector('.mm-dots');
  if (dots && !RM) {
    const cols = ['#a78bfa', '#a78bfa', '#38bdf8', '#ffffff'];
    for (let i = 0; i < 14; i++) {
      const d = document.createElement('i'), s = (1.5 + Math.random() * 2).toFixed(1);
      d.style.cssText = `--x:${(Math.random() * 100).toFixed(1)}%;--s:${s}px;--t:${(9 + Math.random() * 9).toFixed(1)}s;--d:-${(Math.random() * 14).toFixed(1)}s;--pc:${cols[i % cols.length]}`;
      dots.appendChild(d);
    }
  }

  // which section is currently on screen (quiet highlight in the menu)
  const targets = items.map(a => [a, document.querySelector(a.getAttribute('href'))]).filter(t => t[1]);
  function spy() {
    const y = innerHeight * 0.35; let cur = null;
    targets.forEach(([a, s]) => { if (s.getBoundingClientRect().top <= y) cur = a; });
    targets.forEach(([a]) => { a.classList.toggle('cur', a === cur); a === cur ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'); });
  }
  function rail() { const n = mm.querySelector('.mm-nav'); n.style.setProperty('--rail', n.offsetHeight + 'px'); }
  const label = o => document.documentElement.lang === 'hy' ? (o ? 'Փակել' : 'Մենյու') : (o ? 'Close menu' : 'Menu');

  function setOpen(o, opts = {}) {
    if (o === isOpen) return;
    isOpen = o;
    if (o) {
      const r = mb.getBoundingClientRect();
      mm.style.setProperty('--ox', (r.left + r.width / 2) + 'px');
      mm.style.setProperty('--oy', (r.top + r.height / 2) + 'px');
      spy(); rail();
    }
    mm.classList.toggle('open', o); mb.classList.toggle('open', o); header.classList.toggle('mo', o);
    root.classList.toggle('mm-lock', o);
    mb.setAttribute('aria-expanded', String(o)); mb.setAttribute('aria-label', label(o));
    mm.setAttribute('aria-hidden', String(!o));
    if (o) setTimeout(() => { if (isOpen) links[0].focus({ preventScroll: true }); }, 520);
    else if (opts.focus !== false) mb.focus({ preventScroll: true });
  }

  mb.addEventListener('click', () => setOpen(!isOpen));
  addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) setOpen(false); });
  desk.addEventListener('change', e => { if (e.matches) setOpen(false, { focus: false }); });

  // tapping a link: close, then glide to the real section (same smooth scroll the desktop nav uses)
  links.forEach(a => a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    setOpen(false, { focus: false });
    setTimeout(() => { t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); history.replaceState(null, '', a.getAttribute('href')); }, 80);
  }));

  // spotlight follows the finger / cursor; mouse hover lights a row (touch uses :active)
  items.forEach(a => {
    const move = e => { const r = a.getBoundingClientRect(); a.style.setProperty('--x', (e.clientX - r.left) + 'px'); a.style.setProperty('--y', (e.clientY - r.top) + 'px'); };
    a.addEventListener('pointermove', move); a.addEventListener('pointerdown', move);
    a.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { move(e); a.classList.add('hot'); } });
    a.addEventListener('pointerleave', () => a.classList.remove('hot'));
  });
}

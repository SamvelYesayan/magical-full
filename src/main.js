import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/noto-sans-armenian/400.css';
import '@fontsource/noto-sans-armenian/500.css';
import '@fontsource/noto-sans-armenian/600.css';
import '@fontsource/noto-sans-armenian/700.css';
import './styles.css';
import './mobile-menu.css';

// Order matters: render the cards first, then everything that reads the DOM.
import './modules/render.js';
import './modules/terminal.js';
import './modules/reveal.js';
import './modules/menu.js';
import './modules/i18n.js';
import './modules/motion.js';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted fonts — no Google CDN request, no FOUT.
// Poppins for display, Inter (variable) for body. Weights match PLAN.md §3.2.
//
// Poppins is pulled in latin-only: the site has no Devanagari copy, and those
// subsets are ~50 kB per weight. Inter has no latin-only stylesheet, so it
// ships every subset — harmless, because each @font-face carries a
// unicode-range and the browser only fetches the subsets the page actually
// needs. `wght` is the upright weight axis; italic is not used anywhere.
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-500.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-700.css';
import '@fontsource-variable/inter/wght.css';

import './styles/global.css';

import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found in index.html');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

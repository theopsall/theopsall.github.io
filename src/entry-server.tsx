import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { toMarkdown } from './lib/toMarkdown';
import { toJsonLd } from './lib/toJsonLd';

// Used by scripts/prerender.mjs at build time to bake the page into the raw HTML.
export const render = () => renderToString(<App />);
export { toMarkdown, toJsonLd };

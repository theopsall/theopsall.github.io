// Bakes the rendered page into build/index.html and writes the agent-facing static files.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { writePages, pageSlugs } from './pages.mjs';

process.loadEnvFile('.env');
const SITE = (process.env.VITE_SITE_URL ?? '').replace(/\/$/, '');
if (!SITE) throw new Error('VITE_SITE_URL is not set (.env)');

const ssrFile = readdirSync('build-ssr').find((f) => /^entry-server.*\.(m?js)$/.test(f));
const { render, toMarkdown, toJsonLd } = await import(pathToFileURL(`build-ssr/${ssrFile}`).href);

const pixelFont = readdirSync('build/assets').find((f) => /^GeistPixel-Circle.*\.woff2$/.test(f));
const preload = pixelFont
  ? `<link rel="preload" href="./assets/${pixelFont}" as="font" type="font/woff2" crossorigin />\n    `
  : '';

const html = readFileSync('build/index.html', 'utf8')
  .replace('<!--app-html-->', render())
  .replace('</head>', `${preload}<script type="application/ld+json">${toJsonLd(SITE)}</script>\n  </head>`);
writeFileSync('build/index.html', html);
writeFileSync('build/index.md', toMarkdown(SITE));
for (const f of ['llms.txt', 'robots.txt']) {
  writeFileSync(`build/${f}`, readFileSync(`build/${f}`, 'utf8').replaceAll('{{SITE}}', SITE));
}

writePages(SITE);
const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  'build/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE}/</loc><lastmod>${today}</lastmod></url>\n${pageSlugs.map((s) => `  <url><loc>${SITE}/${s}</loc><lastmod>${today}</lastmod></url>\n`).join('')}</urlset>\n`,
);
writeFileSync(
  'build/404.html',
  `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Page not found · Theodoros Psallidas</title>
<style>body{margin:0;background:#000;color:#a1a1a1;font:16px/1.6 system-ui,sans-serif;padding:4rem 1.25rem}main{max-width:40rem;margin:0 auto}h1{color:#ededed;font-size:1.5rem}a{color:#52a8ff}</style></head>
<body><main><h1>404: this page does not exist</h1>
<p>The portfolio is a single page. Try one of these instead:</p>
<ul><li><a href="${SITE}/">Home</a></li><li><a href="${SITE}/index.md">Home as Markdown</a></li><li><a href="${SITE}/llms.txt">llms.txt</a></li><li><a href="${SITE}/sitemap.xml">Sitemap</a></li></ul>
</main></body></html>
`,
);
console.log(`prerendered ${SITE} (${html.length} bytes)`);

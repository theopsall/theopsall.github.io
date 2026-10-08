// Static trust-anchor pages (About, Contact, Privacy). Plain HTML, styled by the site's own CSS bundle.
import { readdirSync, writeFileSync } from 'node:fs';

const css = readdirSync('build/assets').find((f) => /^index-.*\.css$/.test(f));

const PAGES = {
  about: {
    title: 'About',
    lede: 'Theodoros Psallidas is a Senior Software Engineer building agentic platforms.',
    body: [
      'I am a Senior Software Engineer at ProxyFoods, where I build agentic recipe generation with LangGraph, retrieval-augmented generation, human-in-the-loop ingredient matching, and cross-service authorization with OpenFGA. I work remotely from Athens, Greece.',
      'Before that I worked on full-stack and machine-learning systems at MyTripMyWay, Behavioral Signals, NCSR Demokritos and Optechain: travel recommendation, real-time agent routing, audio deepfake detection, music copyright monitoring, and digital signage and EV-charging software.',
      'I am a PhD candidate in Computer Science at the University of Thessaly, with an MSc in Data Science from the University of Peloponnese. My research covers multimodal video summarization, computer vision and audio. The papers are listed with DOI links on the home page and on Google Scholar.',
      'This site is a single-page portfolio. It has no accounts, no API and no store. Everything on it is also available as plain Markdown at index.md and summarized for agents in llms.txt.',
    ],
  },
  contact: {
    title: 'Contact',
    lede: 'The best way to reach Theodoros Psallidas is email.',
    body: [
      'Email: theopsall@gmail.com. Write about senior engineering roles, agentic-platform work, research collaboration, or questions about a paper or an open-source repository.',
      'Profiles: GitHub (github.com/theopsall) for code, LinkedIn (linkedin.com/in/tpsallidas) for professional contact, and Google Scholar for publications. The Scholar profile is at scholar.google.com/citations?user=478yYkIAAAAJ.',
      'Location: Athens, Greece, working remotely. There is no phone line and no contact form on this site, so nothing you type here is collected. A CV is available as a PDF from the home page.',
      'For work with ProxyFoods, the company site is proxyfoods.ai. This portfolio is personal and does not speak for the company.',
    ],
  },
  privacy: {
    title: 'Privacy',
    lede: 'This site does not track you.',
    body: [
      'There are no cookies, no analytics, no advertising scripts and no third-party trackers on this site. The fonts, styles and scripts are served from the same host as the page, so loading it does not send your visit to other companies.',
      'No forms exist, so the site collects no personal data. If you email theopsall@gmail.com, I will use your message only to reply to you and will not share it or add you to a list.',
      'The site is hosted on GitHub Pages, and GitHub may keep standard server logs such as IP addresses for security and operations. That is governed by GitHub\'s own privacy statement, and I do not have access to those logs.',
      'Links to GitHub, LinkedIn, Google Scholar, DOI publishers and other sites lead to services with their own privacy practices. This page was last reviewed on 8 October 2026.',
    ],
  },
};

export const pageSlugs = Object.keys(PAGES);

export const writePages = (site) => {
  for (const [slug, p] of Object.entries(PAGES)) {
    const paras = p.body.map((t) => `<p class="masthead-sub">${t.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</p>`).join('\n      ');
    writeFileSync(
      `build/${slug}.html`,
      `<!doctype html>
<html lang="en" class="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <title>${p.title} · Theodoros Psallidas</title>
  <meta name="description" content="${p.lede}" />
  <link rel="canonical" href="${site}/${slug}" />
  <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
  <link rel="stylesheet" href="./assets/${css}" />
</head>
<body>
  <main class="pf">
    <header>
      <p><a class="pf-link" href="./">← Theodoros Psallidas</a></p>
      <h1 class="pf-h2" style="font-size:2rem;margin-top:2.5rem">${p.title}</h1>
      <p class="masthead-line">${p.lede}</p>
    </header>
    <section class="pf-section">
      ${paras}
    </section>
  </main>
</body>
</html>
`,
    );
  }
};

import { EXPERIENCE_DATA, EDUCATION_DATA } from '@/components/Portfolio/data';
import { PUBLICATIONS, doiUrl } from '@/components/Portfolio/publications';
import { PROJECTS, repoUrl } from '@/components/Portfolio/projects';
import { CONTACT_LINKS } from '@/components/Portfolio/annotations';

// Markdown twin of the page (index.md), generated from the same data the page renders.
export const toMarkdown = (siteUrl: string): string => {
  const roles = EXPERIENCE_DATA.map((r) =>
    [
      `### ${r.title}, ${r.url ? `[${r.org}](${r.url})` : r.org}`,
      `${r.location} · ${r.date}`,
      '',
      ...r.highlights.map((h) => `- ${h}`),
      '',
      `Stack: ${r.tech.join(', ')}`,
    ].join('\n'),
  );
  const edu = EDUCATION_DATA.map(
    (e) => `- **${e.degree}**, ${e.school} (${e.date})${e.thesis ? `. Thesis: ${e.thesis}` : ''}`,
  );
  const pubs = PUBLICATIONS.map((p) => `- ${p.year}. [${p.title}](${doiUrl(p.doi)}). ${p.authors}, ${p.venue}`);
  const repos = PROJECTS.map((p) => `- [${p.name}](${repoUrl(p.name)}): ${p.description} (${p.language})`);
  const links = CONTACT_LINKS.map((l) => `- [${l.label}](${l.href}): ${l.text}`);
  return [
    '# Theodoros Psallidas',
    '',
    'Senior Software Engineer at ProxyFoods building frontier agentic platforms with LangGraph. PhD candidate in Computer Science, University of Thessaly.',
    '',
    `Canonical: ${siteUrl}/`,
    '',
    '## Experience',
    '',
    roles.join('\n\n'),
    '',
    '## Publications',
    '',
    pubs.join('\n'),
    '',
    '## Education',
    '',
    edu.join('\n'),
    '',
    '## Open source',
    '',
    repos.join('\n'),
    '',
    '## Contact',
    '',
    links.join('\n'),
    '',
  ].join('\n');
};

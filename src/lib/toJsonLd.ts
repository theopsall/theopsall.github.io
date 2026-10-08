import { PROJECTS, repoUrl } from '@/components/Portfolio/projects';
import { PUBLICATIONS, doiUrl } from '@/components/Portfolio/publications';

// Publications as ScholarlyArticle JSON-LD, authored by the site's Person node (@id set in index.html).
export const toJsonLd = (siteUrl: string): string =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [...PUBLICATIONS.map((p) => ({
      '@type': 'ScholarlyArticle',
      '@id': doiUrl(p.doi),
      url: doiUrl(p.doi),
      name: p.title,
      datePublished: String(p.year),
      isPartOf: { '@type': 'Periodical', name: p.venue },
      author: [{ '@id': `${siteUrl}/#person` }],
    })),
    ...PROJECTS.map((p) => ({
      '@type': 'SoftwareSourceCode',
      '@id': repoUrl(p.name),
      name: p.name,
      description: p.description,
      codeRepository: repoUrl(p.name),
      programmingLanguage: p.language,
      author: { '@id': `${siteUrl}/#person` },
    }))],
  });

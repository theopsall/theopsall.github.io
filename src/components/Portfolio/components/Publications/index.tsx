import React from 'react';
import ExternalLink from '@/components/ExternalLink';
import { CONTACT_LINKS } from '@/components/Portfolio/annotations';
import { PUBLICATIONS, doiUrl } from '@/components/Portfolio/publications';

const SCHOLAR = CONTACT_LINKS.find((l) => l.icon === 'scholar')!;

const Publications: React.FC = () => (
  <section className="pf-section" aria-labelledby="publications-h">
    <h2 id="publications-h" className="pf-h2">Publications</h2>
    <ol className="pub-list">
      {PUBLICATIONS.map((p) => (
        <li key={p.doi} className="pub-row">
          <span className="pub-year">{p.year}</span>
          <ExternalLink href={doiUrl(p.doi)} className="pub-title">{p.title}</ExternalLink>
          <span className="pub-meta">{p.authors} · {p.venue}</span>
        </li>
      ))}
    </ol>
    <p className="pf-hint">
      Full list on <ExternalLink href={SCHOLAR.href} className="pf-link">Google Scholar</ExternalLink>.
    </p>
  </section>
);

export default Publications;

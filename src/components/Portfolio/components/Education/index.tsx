import React from 'react';
import ExternalLink from '@/components/ExternalLink';
import { CERTIFICATIONS_DATA, EDUCATION_DATA } from '@/components/Portfolio/data';

const range = (d: string) => d.replace(' - ', ' – ').replace('Present', 'present');

const Education: React.FC = () => (
  <section className="pf-section" aria-labelledby="education-h">
    <h2 id="education-h" className="pf-h2">Education</h2>
    <ul className="edu-list">
      {EDUCATION_DATA.map((edu) => (
        <li key={edu.degree} className="edu-row">
          <span className="edu-degree">{edu.degree}</span>
          <span className="edu-school">{edu.school} · {range(edu.date)}</span>
          {edu.thesis && <span className="edu-thesis">Thesis: {edu.thesis}</span>}
        </li>
      ))}
    </ul>
    <h3 className="pf-h3">Certifications</h3>
    <ul className="edu-list">
      {CERTIFICATIONS_DATA.map((c) => (
        <li key={c.name} className="edu-row">
          <span className="edu-degree">
            {c.url ? <ExternalLink href={c.url} className="pub-title">{c.name}</ExternalLink> : c.name}
          </span>
          <span className="edu-school">{c.issuer} · {range(c.date)}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default Education;

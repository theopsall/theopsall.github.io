import React from 'react';
import { EDUCATION_DATA } from '@/components/Terminal/constants';

const Education: React.FC = () => (
  <section className="pf-section" aria-labelledby="education-h">
    <h2 id="education-h" className="pf-h2">Education</h2>
    <ul className="edu-list">
      {EDUCATION_DATA.map((edu) => (
        <li key={edu.degree} className="edu-row">
          <span className="edu-degree">{edu.degree}</span>
          <span className="edu-school">{edu.school} · {edu.date.replace(' - ', ' – ').replace('Present', 'present')}</span>
          {edu.thesis && <span className="edu-thesis">Thesis: {edu.thesis}</span>}
        </li>
      ))}
    </ul>
  </section>
);

export default Education;

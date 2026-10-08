import React from 'react';
import { FaRegStar } from 'react-icons/fa6';
import ExternalLink from '@/components/ExternalLink';
import { GITHUB_USER_URL, PROJECTS, repoUrl } from '@/components/Portfolio/projects';

const Projects: React.FC = () => (
  <section className="pf-section" aria-labelledby="projects-h">
    <h2 id="projects-h" className="pf-h2">Open source</h2>
    <ul className="proj-grid">
      {PROJECTS.map((p) => (
        <li key={p.name}>
          <ExternalLink href={repoUrl(p.name)} className="proj-card">
            <span className="proj-name">{p.name}</span>
            <span className="proj-desc">{p.description}</span>
            <span className="proj-meta">
              <span>{p.language}</span>
              <span className="proj-stars"><FaRegStar aria-hidden="true" /> {p.stars}<span className="sr-only"> stars</span></span>
            </span>
          </ExternalLink>
        </li>
      ))}
    </ul>
    <p className="pf-hint">
      More on <ExternalLink href={GITHUB_USER_URL} className="pf-link">GitHub</ExternalLink>.
    </p>
  </section>
);

export default Projects;

import React from 'react';
import ExternalLink from '@/components/ExternalLink';
import { Button } from '@/components/ui/button';
import { CV_HREF, CONTACT_LINKS } from '@/components/Portfolio/annotations';
import { ICONS } from '@/components/Portfolio/icons';

const PROFILES = CONTACT_LINKS.filter((l) => l.icon === 'github' || l.icon === 'linkedin' || l.icon === 'scholar');

const Masthead: React.FC = () => (
  <header className="masthead">
    <h1 className="masthead-name">Theodoros Psallidas</h1>
    <p className="masthead-line">Building frontier agentic platforms with LangGraph.</p>
    <p className="masthead-sub">
      Senior Software Engineer at ProxyFoods. PhD candidate in Computer Science, University of Thessaly.
    </p>
    <div className="masthead-actions">
      <Button asChild className="pf-btn pf-btn-primary">
        <ExternalLink href={CV_HREF}>Download CV</ExternalLink>
      </Button>
      <Button asChild variant="ghost" className="pf-btn">
        <ExternalLink href={CONTACT_LINKS[0].href}>Email</ExternalLink>
      </Button>
    </div>
    <ul className="masthead-links" aria-label="Profiles">
      {PROFILES.map(({ icon, label, href }) => {
        const Icon = ICONS[icon];
        return (
          <li key={label}>
            <Button asChild variant="ghost" className="pf-btn">
              <ExternalLink href={href}>
                <Icon aria-hidden="true" />
                {label}
              </ExternalLink>
            </Button>
          </li>
        );
      })}
    </ul>
  </header>
);

export default Masthead;

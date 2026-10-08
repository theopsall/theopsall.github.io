import React from 'react';
import ExternalLink from '@/components/ExternalLink';
import { CONTACT_LINKS } from '@/components/Portfolio/annotations';
import { ICONS } from '@/components/Portfolio/icons';

const Contact: React.FC = () => (
  <section className="pf-section" aria-labelledby="contact-h">
    <h2 id="contact-h" className="pf-h2">Contact</h2>
    <ul className="contact-list">
      {CONTACT_LINKS.map((link) => {
        const Icon = ICONS[link.icon];
        return (
          <li key={link.label}>
            <ExternalLink href={link.href} className="contact-link" aria-label={`${link.label}: ${link.text}`}>
              <Icon className="contact-icon" aria-hidden="true" />
              <span className="contact-label">{link.label}</span>
              <span className="contact-text">{link.text}</span>
            </ExternalLink>
          </li>
        );
      })}
    </ul>
  </section>
);

export default Contact;

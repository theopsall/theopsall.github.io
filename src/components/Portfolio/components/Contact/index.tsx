import React from 'react';
import ExternalLink from '@/components/ExternalLink';
import { CONTACT_LINKS } from '@/components/Portfolio/annotations';

const Contact: React.FC = () => (
  <section className="pf-section" aria-labelledby="contact-h">
    <h2 id="contact-h" className="pf-h2">Contact</h2>
    <dl className="contact-list">
      {CONTACT_LINKS.map((link) => (
        <div key={link.label} className="contact-row">
          <dt>{link.label}</dt>
          <dd><ExternalLink href={link.href} className="pf-link">{link.text}</ExternalLink></dd>
        </div>
      ))}
    </dl>
  </section>
);

export default Contact;

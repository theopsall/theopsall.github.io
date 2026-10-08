import React from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import ExternalLink from '@/components/ExternalLink';
import { Button } from '@/components/ui/button';
import { CV_HREF } from '@/components/Portfolio/annotations';
import Contact from '../Contact';

const READS = [
  { label: 'Markdown', href: './index.md' },
  { label: 'llms.txt', href: './llms.txt' },
  { label: 'Sitemap', href: './sitemap.xml' },
];

const PAGES = [
  { label: 'About', href: './about' },
  { label: 'Contact', href: './contact' },
  { label: 'Privacy', href: './privacy' },
];

const Footer: React.FC = () => (
  <footer className="pf-footer">
    <div className="ft-top">
      <img className="ft-sign" src="./signature.svg" alt="Theo Psallidas, signature" width="319" height="75" />
      <div className="ft-actions">
        <Button asChild className="pf-btn pf-btn-primary">
          <ExternalLink href={CV_HREF}>Download CV</ExternalLink>
        </Button>
        <Button asChild variant="ghost" className="pf-btn">
          <ExternalLink href="#top" target="_self">
            <FaArrowUp aria-hidden="true" /> Back to top
          </ExternalLink>
        </Button>
      </div>
    </div>
    <div className="ft-mid">
      <Contact />
      <nav aria-label="Machine-readable versions">
        <h2 className="pf-h2">For agents</h2>
        <ul className="ft-reads">
          {[...PAGES, ...READS].map(({ label, href }) => (
            <li key={label}>
              <ExternalLink href={href} target="_self" className="pf-link-quiet">{label}</ExternalLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    <p className="ft-fine">Theodoros Psallidas · Athens, Greece · No cookies, no analytics, no tracking.</p>
  </footer>
);

export default Footer;

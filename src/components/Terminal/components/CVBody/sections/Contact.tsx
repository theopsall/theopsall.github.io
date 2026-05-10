import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ExternalLink from '@/components/ExternalLink';
import { CVPrompt, CVSeparator } from '../helpers';

interface ContactCardProps {
  href: string;
  className: string;
  children: React.ReactNode;
  isMailto?: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({ href, className, children, isMailto }) => (
  <ExternalLink href={href} className={className} target={isMailto ? '_self' : '_blank'}>
    {children}
  </ExternalLink>
);

const Contact: React.FC = () => (
  <>
    <CVSeparator />
    <CVPrompt cmd="./contact --connect" hint="# establishing secure handshake…" />
    <p className="cv-meta-text">[ OK ] handshake verified · 4 channels online · pgp fingerprint 7F3A · preferred: email</p>
    <div className="cv-contact-cards">
      <ContactCard href="mailto:theo@tpsallidas.dev" className="cv-contact-card cv-contact-card-bright" isMailto>
        <Mail size={14} /><span>theo@tpsallidas.dev</span>
      </ContactCard>
      <ContactCard href="https://github.com/tpsallidas" className="cv-contact-card cv-contact-card-mid">
        <FaGithub size={14} /><span>github.com/tpsallidas</span>
      </ContactCard>
      <ContactCard href="https://linkedin.com/in/tpsallidas" className="cv-contact-card cv-contact-card-mid">
        <FaLinkedin size={14} /><span>linkedin.com/in/tpsallidas</span>
      </ContactCard>
      <div className="cv-contact-card cv-contact-card-dim">
        <MapPin size={14} style={{ color: '#ffffff' }} /><span>Athens · GR</span>
      </div>
    </div>
    <p className="cv-contact-footer">↳ say hi · available for staff / lead IC roles in AI platforms · remote or Athens-based</p>
  </>
);

export default Contact;

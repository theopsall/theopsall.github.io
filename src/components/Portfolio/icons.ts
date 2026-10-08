import type React from 'react';
import { FaBriefcase, FaEnvelope, FaGithub, FaGoogleScholar, FaLinkedin } from 'react-icons/fa6';
import type { ContactIcon } from './annotations';

export const ICONS: Record<ContactIcon, React.ElementType> = {
  email: FaEnvelope,
  github: FaGithub,
  linkedin: FaLinkedin,
  scholar: FaGoogleScholar,
  work: FaBriefcase,
};

import React from 'react';
import { cn } from '@/lib/utils';

interface ExternalLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  target?: '_blank' | '_self';
  'aria-label'?: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  className,
  children,
  style,
  target = '_blank',
  'aria-label': ariaLabel,
}) => (
  <a
    href={href}
    target={target}
    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    className={cn(className)}
    style={style}
    aria-label={ariaLabel}
  >
    {children}
  </a>
);

export default ExternalLink;

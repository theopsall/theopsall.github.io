import React from 'react';
import { ChevronDown } from 'lucide-react';
import ExternalLink from '@/components/ExternalLink';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Annotation } from '@/components/Portfolio/annotations';
import { splitSpans } from './splitSpans';

interface RoleBlockProps {
  index: number;
  title: string;
  org: string;
  url?: string;
  place: string;
  date: string;
  highlights: string[];
  tech: string[];
  notes: Annotation[];
  isCurrent: boolean;
  isOpen: boolean;
  onToggle: (index: number) => void;
}

const RoleBlock: React.FC<RoleBlockProps> = ({
  index, title, org, url, place, date, highlights, tech, notes, isCurrent, isOpen, onToggle,
}) => {
  const spans = notes.map((n) => n.span);
  return (
    <article className={cn('dx', isCurrent && 'dx-current')} aria-keyshortcuts={String(index + 1)}>
      <Button
        id={`role-${index}`}
        variant="ghost"
        className="dx-head"
        aria-expanded={isOpen}
        aria-controls={`role-body-${index}`}
        onClick={() => onToggle(index)}
      >
        {isCurrent && <span className="dx-level">current</span>}
        <span className="dx-title">{title}</span>
        <span className="dx-key" aria-hidden="true">{index + 1}</span>
        <ChevronDown className="dx-chevron" aria-hidden="true" />
      </Button>
      <p className="dx-where">
        <span className="dx-arrow" aria-hidden="true">--&gt;</span>
        {url ? <ExternalLink href={url} className="dx-org">{org}</ExternalLink> : <span className="dx-org">{org}</span>}
        <span className="dx-meta">{place} · {date}</span>
      </p>
      {isOpen && (
        <div id={`role-body-${index}`} className="dx-body">
          <ol className="dx-lines">
            {highlights.map((line, i) => (
              <li key={line} className="dx-line" style={{ '--i': i } as React.CSSProperties}>
                <span className="dx-gutter" aria-hidden="true">{i + 1}</span>
                <span className="dx-code">
                  {splitSpans(line, spans).map((part, p) =>
                    part.marked ? <mark key={p} className="dx-mark">{part.text}</mark> : <span key={p}>{part.text}</span>)}
                </span>
              </li>
            ))}
          </ol>
          <ul className="dx-notes">
            {notes.map((n, i) => (
              <li key={n.span} style={{ '--i': highlights.length + i } as React.CSSProperties}>
                <span className="dx-eq" aria-hidden="true">=</span> <span className="dx-note-key">note:</span> {n.span} — {n.note}
              </li>
            ))}
            <li style={{ '--i': highlights.length + notes.length } as React.CSSProperties}>
              <span className="dx-eq" aria-hidden="true">=</span> <span className="dx-note-key">stack:</span> {tech.join(', ')}
            </li>
          </ul>
        </div>
      )}
    </article>
  );
};

export default RoleBlock;

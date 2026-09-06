import React from 'react';
import { CVPrompt, CVSeparator } from '../helpers';
import ExternalLink from '@/components/ExternalLink';
import { EXPERIENCE_DATA } from '@/components/Terminal/constants';

interface ExpCardProps {
  markerColor: string;
  role: string;
  company: string;
  companyUrl: string;
  companyColor: string;
  dates: string;
  location: string;
  highlights: string[];
  borderStyle: 'active' | 'dim';
}

const ExpCard: React.FC<ExpCardProps> = ({ markerColor, role, company, companyUrl, companyColor, dates, location, highlights, borderStyle }) => (
  <div className={`cv-exp-card cv-exp-card-${borderStyle}`}>
    <div className="cv-exp-head">
      <div className="cv-exp-head-left">
        <span className="cv-exp-marker" style={{ color: markerColor }}>▶</span>
        <span className="cv-exp-role">{role}</span>
        <span className="cv-exp-at">@</span>
        <ExternalLink href={companyUrl} className="cv-exp-company" style={{ color: companyColor }}>
          {company}
        </ExternalLink>
      </div>
      <span className="cv-exp-dates">{dates} · {location}{dates.includes('present') && <span className="cv-exp-current"> current</span>}</span>
    </div>
    <ul className="cv-exp-highlights">{highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
  </div>
);

const Experience: React.FC = () => (
  <>
    <CVSeparator />
    <CVPrompt cmd="cat experience.log" hint="# complete work history" />
    <p className="cv-meta-text">→ reading from /var/log/career/experience.log · ordered by recency · format: json</p>
    {EXPERIENCE_DATA.map((exp, index) => <ExpCard
      key={`${exp.org}-${exp.project ?? exp.date}`}
      markerColor={index === 0 ? '#ffffff' : index < 3 ? '#a3a3a3' : '#737373'}
      role={exp.title} company={exp.org} companyUrl={exp.url ?? ''} companyColor={index < 3 ? '#a3a3a3' : '#d4d4d4'}
      dates={exp.date.replace(' - ', ' — ').replace('Present', 'present')} location={exp.location}
      highlights={exp.highlights} borderStyle={index < 3 ? 'active' : 'dim'}
    />)}
  </>
);

export default Experience;

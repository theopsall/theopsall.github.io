import React from 'react';
import { CVPrompt, CVSeparator } from '../helpers';
import ExternalLink from '@/components/ExternalLink';

interface ExpCardProps {
  markerColor: string;
  role: string;
  company: string;
  companyUrl: string;
  companyColor: string;
  dates: string;
  borderStyle: 'active' | 'dim';
}

const ExpCard: React.FC<ExpCardProps> = ({ markerColor, role, company, companyUrl, companyColor, dates, borderStyle }) => (
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
      <span className="cv-exp-dates">{dates}</span>
    </div>
  </div>
);

const Experience: React.FC = () => (
  <>
    <CVSeparator />
    <CVPrompt cmd="cat experience.log --tail 3" hint="# 3 most recent" />
    <p className="cv-meta-text">→ reading from /var/log/career/experience.log · ordered by recency · format: json</p>
    <ExpCard
      markerColor="#ffffff" role="Senior Software Engineer" company="ProxyFoods" companyUrl="https://proxyfoods.ai" companyColor="#a3a3a3"
      dates="Feb 2026 — present · Greece"
      borderStyle="active"
    />
    <ExpCard
      markerColor="#a3a3a3" role="Full Stack Software Engineer" company="Behavioral Signals" companyUrl="https://behavioralsignals.com" companyColor="#a3a3a3"
      dates="Mar 2024 — Feb 2026 · Greece"
      borderStyle="active"
    />
    <ExpCard
      markerColor="#737373" role="Full Stack Software Engineer" company="Optechain" companyUrl="https://optechain.com" companyColor="#d4d4d4"
      dates="Oct 2020 — Feb 2024 · Greece"
      borderStyle="dim"
    />
  </>
);

export default Experience;

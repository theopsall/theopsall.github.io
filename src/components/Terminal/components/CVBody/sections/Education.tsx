import React from 'react';
import { GraduationCap, Building2, Sparkles } from 'lucide-react';
import { CVPrompt, CVSeparator } from '../helpers';

const Education: React.FC = () => (
  <>
    <CVSeparator />
    <CVPrompt cmd="cat education.txt" />
    <div className="cv-edu-line">
      <GraduationCap className="cv-edu-icon" />
      <span className="cv-edu-key">degree:</span>
      <span className="cv-edu-val">M.Eng. Electrical &amp; Computer Engineering</span>
    </div>
    <div className="cv-edu-line">
      <Building2 className="cv-edu-icon" />
      <span className="cv-edu-key">school:</span>
      <span className="cv-edu-val">National Technical University of Athens&nbsp; · &nbsp;2013 — 2018</span>
    </div>
    <div className="cv-edu-line">
      <Sparkles className="cv-edu-icon" />
      <span className="cv-edu-key">focus:</span>
      <span className="cv-edu-val">Signal processing · Distributed systems · Machine learning</span>
    </div>
  </>
);

export default Education;

import React from 'react';
import { EXPERIENCE_DATA } from '@/components/Portfolio/data';
import { ANNOTATIONS } from '@/components/Portfolio/annotations';
import { useRoles } from '@/components/Portfolio/hooks/useRoles';
import RoleBlock from './components/RoleBlock';

const Experience: React.FC = () => {
  const { open, toggle } = useRoles(EXPERIENCE_DATA.length);
  return (
    <section className="pf-section" aria-labelledby="experience-h">
      <h2 id="experience-h" className="pf-h2">Experience</h2>
      <p className="pf-hint">
        <span className="hint-keys">Keys 1 to {EXPERIENCE_DATA.length} jump to a role.</span>
        <span className="hint-touch">Tap a role to collapse it.</span>
      </p>
      <div className="dx-list">
        {EXPERIENCE_DATA.map((exp, i) => (
          <RoleBlock
            key={`${exp.org}-${exp.date}`}
            index={i}
            title={exp.title}
            org={exp.org}
            url={exp.url}
            place={exp.location}
            date={exp.date.replace(' - ', ' – ').replace('Present', 'present')}
            highlights={exp.highlights}
            tech={exp.tech}
            notes={ANNOTATIONS[`${exp.org}|${exp.date}`] ?? []}
            isCurrent={exp.date.includes('Present')}
            isOpen={open.includes(i)}
            onToggle={toggle}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;

import React from 'react';
import ExternalLink from '@/components/ExternalLink';
import BannerTitle from '@/components/Terminal/components/BannerTitle';
import { EXPERIENCE_DATA, EDUCATION_DATA, SKILLS_DATA } from '@/components/Terminal/constants';

export const TreeFields: React.FC<{ fields: { key: string; val: string }[]; childPipe: string }> = ({ fields, childPipe }) => (
  <>
    {fields.map((f, i) => {
      const isLast = i === fields.length - 1;
      const branch = isLast ? '└── ' : '├── ';
      return (
        <div key={f.key} className="cmd-tree-row cmd-tree-child">
          <span className="cmd-tree-branch">{childPipe}{branch}</span>
          <span className="cmd-tree-key">{f.key}: </span>
          <span className="cmd-tree-val">{f.val}</span>
        </div>
      );
    })}
  </>
);

export const buildInfoCommands = (): Record<string, () => React.ReactNode> => ({
  about: () => (
    <div className="command-output">
      <BannerTitle />
      <p className="text-normal">Senior Software Engineer, ProxyFoods</p>
      <p className="text-muted-term">Audiovisual data analysis and machine learning, specializing in multimodal video summarization.</p>
      <br />
      <p className="text-normal">Location   — Athens, Greece</p>
      <p className="text-normal">Research   — PhD Candidate, Video Summarization @ University of Thessaly</p>
      <p className="text-normal">Focus      — Full Stack Development, Machine Learning, Audio Processing</p>
      <p className="text-normal">Award      — Winner, Code the IoT Hackathon (MaTHiSiS Project)</p>
      <p className="text-normal">Hobby      — Craft beer enthusiast</p>
      <p className="text-normal">Partner    — Pair programming with Barney (my dog)</p>
    </div>
  ),
  whoami: () => (
    <div className="command-output"><p className="text-command">theopsall@portfolio</p></div>
  ),
  experience: () => (
    <div className="command-output">
      <div className="cmd-tree">
        <div className="cmd-tree-header"><span className="cmd-tree-label">Work Experience</span></div>
        {EXPERIENCE_DATA.map((exp, idx) => {
          const isLast = idx === EXPERIENCE_DATA.length - 1;
          const pipe = isLast ? '    ' : '│   ';
          return (
            <div key={exp.title + exp.org} className="cmd-tree-group">
              <div className="cmd-tree-row">
                <span className="cmd-tree-branch">{isLast ? '└── ' : '├── '}</span>
                <span className="cmd-tree-title">{exp.title}</span>
                <span className="cmd-tree-key" style={{ marginLeft: '0.4rem' }}>@</span>
                 {exp.url ? <ExternalLink href={exp.url} className="cmd-tree-company" style={{ marginLeft: '0.25rem' }}>{exp.org}</ExternalLink> : <span className="cmd-tree-company" style={{ marginLeft: '0.25rem' }}>{exp.org}</span>}
                 {exp.date.includes('Present') && <span className="cmd-tree-current">current</span>}
              </div>
               <TreeFields fields={[{ key: 'Location', val: exp.location }, ...(exp.companyLocation ? [{ key: 'Company HQ', val: exp.companyLocation }] : []), { key: 'Period', val: exp.date }, ...(exp.project ? [{ key: 'Project', val: exp.project }] : []), { key: 'Tech', val: exp.tech.join(', ') }]} childPipe={pipe} />
               <div className="cmd-tree-highlights">
                 {exp.highlights.map((highlight) => <div key={highlight}><span className="cmd-tree-pipe">{pipe}</span><span className="cmd-tree-bullet">•</span>{highlight}</div>)}
               </div>
            </div>
          );
        })}
      </div>
    </div>
  ),
  education: () => (
    <div className="command-output">
      <div className="cmd-tree">
        <div className="cmd-tree-header"><span className="cmd-tree-label">Education</span></div>
        {EDUCATION_DATA.map((edu, idx) => {
          const isLast = idx === EDUCATION_DATA.length - 1;
          const pipe = isLast ? '    ' : '│   ';
          const fields: { key: string; val: string }[] = [{ key: 'School', val: edu.school }, { key: 'Location', val: edu.location }, { key: 'Period', val: edu.date }];
          if (edu.thesis) fields.push({ key: 'Thesis', val: `"${edu.thesis}"` });
          return (
            <div key={edu.degree} className="cmd-tree-group">
              <div className="cmd-tree-row">
                <span className="cmd-tree-branch">{isLast ? '└── ' : '├── '}</span>
                <span className="cmd-tree-title">{edu.degree}</span>
              </div>
              <TreeFields fields={fields} childPipe={pipe} />
            </div>
          );
        })}
      </div>
    </div>
  ),
  skills: () => (
    <div className="command-output">
      <p className="text-highlight">Technical Skills:</p>
      <div className="skills-grid">
        <div><p className="text-keyword">Languages:</p><p className="text-normal">{SKILLS_DATA.languages.join(', ')}</p></div>
        <div><p className="text-keyword">Frameworks:</p><p className="text-normal">{SKILLS_DATA.frameworks.join(', ')}</p></div>
        <div><p className="text-keyword">ML/AI:</p><p className="text-normal">{SKILLS_DATA.ml.join(', ')}</p></div>
        <div><p className="text-keyword">Databases:</p><p className="text-normal">{SKILLS_DATA.databases.join(', ')}</p></div>
        <div><p className="text-keyword">Tools:</p><p className="text-normal">{SKILLS_DATA.tools.join(', ')}</p></div>
      </div>
    </div>
  ),
  contact: () => (
    <div className="command-output">
      <p className="text-highlight">Contact Information:</p>
      <div className="contact-links">
        <p><span className="text-keyword">GitHub:</span>{' '}<ExternalLink href="https://github.com/theopsall" className="text-link">github.com/theopsall</ExternalLink></p>
        <p><span className="text-keyword">LinkedIn:</span>{' '}<ExternalLink href="https://www.linkedin.com/in/tpsallidas" className="text-link">linkedin.com/in/tpsallidas</ExternalLink></p>
        <p><span className="text-keyword">Email:</span>{' '}<ExternalLink href="mailto:theopsall@gmail.com" className="text-link">theopsall@gmail.com</ExternalLink></p>
        <p><span className="text-keyword">Twitter:</span>{' '}<ExternalLink href="https://twitter.com/TheoPsallidas" className="text-link">@TheoPsallidas</ExternalLink></p>
        <p><span className="text-keyword">Google Scholar:</span>{' '}<ExternalLink href="https://scholar.google.com/citations?user=theopsall" className="text-link">View Publications</ExternalLink></p>
      </div>
    </div>
  ),
  projects: () => (
    <div className="command-output">
      <div className="cmd-tree">
        <div className="cmd-tree-header"><span className="cmd-tree-label">Pinned Repositories</span></div>
        {[
          { name: 'Video-Summarization', desc: 'Multimodal video summarization from wearable cameras' },
          { name: 'whisper_wrapper', desc: 'Speech recognition wrapper for OpenAI Whisper' },
          { name: 'multiSmote', desc: 'Multi-label SMOTE implementation for imbalanced datasets' },
          { name: 'video_annotator', desc: 'Web-based video annotation tool' },
          { name: 'deep_video_extraction', desc: 'Deep feature extraction from video' },
        ].map((repo, idx, arr) => (
          <div key={repo.name} className="cmd-tree-row">
            <span className="cmd-tree-branch">{idx === arr.length - 1 ? '└── ' : '├── '}</span>
            <ExternalLink href={`https://github.com/theopsall/${repo.name}`} className="text-link" style={{ fontWeight: 600 }}>{repo.name}</ExternalLink>
            <span className="text-muted-term" style={{ marginLeft: '0.75rem' }}>{repo.desc}</span>
          </div>
        ))}
      </div>
      <p className="text-muted-term" style={{ marginTop: '0.75rem' }}>
        View all at <ExternalLink href="https://github.com/theopsall?tab=repositories" className="text-link">github.com/theopsall</ExternalLink>
      </p>
    </div>
  ),
  cv: () => (
    <div className="command-output">
      <p className="text-highlight" style={{ marginBottom: '0.5rem' }}>Theodoros Psallidas — CV</p>
      <p className="text-keyword" style={{ marginBottom: '0.25rem' }}>Experience</p>
      {EXPERIENCE_DATA.map((exp) => (
        <p key={exp.org} className="text-normal">
          {exp.title} <span className="text-muted-term">@</span>{' '}
           {exp.url ? <ExternalLink href={exp.url} className="text-link" style={{ fontWeight: 600 }}>{exp.org}</ExternalLink> : <span className="text-link" style={{ fontWeight: 600 }}>{exp.org}</span>}
          <span className="text-muted-term"> · {exp.date}</span>
        </p>
      ))}
      <br />
      <p className="text-keyword" style={{ marginBottom: '0.25rem' }}>Education</p>
      {EDUCATION_DATA.map((edu) => (
        <p key={edu.degree} className="text-normal">
          {edu.degree} <span className="text-muted-term">· {edu.school} · {edu.date}</span>
        </p>
      ))}
      <br />
      <p className="text-keyword" style={{ marginBottom: '0.25rem' }}>Skills</p>
      <p className="text-normal">{[...SKILLS_DATA.languages, ...SKILLS_DATA.frameworks, ...SKILLS_DATA.ml, ...SKILLS_DATA.databases, ...SKILLS_DATA.tools].join(' · ')}</p>
    </div>
  ),
  banner: () => (
    <div className="welcome-banner">
      <BannerTitle />
      <p className="text-normal">Senior Software Engineer, ProxyFoods</p>
    </div>
  ),
  home: () => (
    <div className="command-output">
      <BannerTitle />
      <p className="text-normal">Senior Software Engineer, ProxyFoods</p>
      <p className="text-muted-term" style={{ marginTop: '0.5rem' }}>
        Type <span className="text-command">help</span> or <span className="text-command">?</span> to see available commands.
      </p>
    </div>
  ),
});

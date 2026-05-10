import React, { useState, useEffect } from 'react';
import { GraduationCap, Building2, Sparkles, Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './CVBody.css';

type ChipVariant = 'bright' | 'mid' | 'dim';

const Chip: React.FC<{ label: string; variant: ChipVariant }> = ({ label, variant }) => (
  <span className={`cv-chip cv-chip-${variant}`}>{label}</span>
);

interface ExpCardProps {
  markerColor: string;
  role: string;
  company: string;
  companyColor: string;
  dates: string;
  description: string;
  bullets: string[];
  stack: string;
  borderStyle: 'active' | 'dim';
}

const ExpCard: React.FC<ExpCardProps> = ({
  markerColor, role, company, companyColor, dates, description, bullets, stack, borderStyle,
}) => (
  <div className={`cv-exp-card cv-exp-card-${borderStyle}`}>
    <div className="cv-exp-head">
      <div className="cv-exp-head-left">
        <span className="cv-exp-marker" style={{ color: markerColor }}>▶</span>
        <span className="cv-exp-role">{role}</span>
        <span className="cv-exp-at">@</span>
        <span className="cv-exp-company" style={{ color: companyColor }}>{company}</span>
      </div>
      <span className="cv-exp-dates">{dates}</span>
    </div>
    <p className="cv-exp-desc">{description}</p>
    {bullets.map((b, i) => <p key={i} className="cv-exp-bullet">{b}</p>)}
    <p className="cv-exp-stack">{stack}</p>
  </div>
);

const CVPrompt: React.FC<{ cmd: string; hint?: string }> = ({ cmd, hint }) => (
  <div className="cv-prompt-line">
    <span className="cv-prompt-text">theo@dev ~/cv $</span>
    <span className="cv-cmd-text">{cmd}</span>
    {hint && <span className="cv-hint-text">{hint}</span>}
  </div>
);

const CVSeparator: React.FC = () => <div className="cv-separator" />;

const CVBody: React.FC = () => {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cv-body">
      {/* Login intro */}
      <p className="cv-intro">
        Last login: Thu Apr 23 14:31:42 on ttys002 · Welcome to tpsallidas.dev //&nbsp; cv-runtime v2.7.1
      </p>

      {/* whoami */}
      <CVPrompt cmd="whoami --bio" />
      <p className="cv-output-bright">
        ▸ Theodoros Psallidas — AI &amp; Software Engineer · Athens, Greece · building reliable LLM-powered systems
      </p>

      {/* about */}
      <CVPrompt cmd="cat about.md" hint="# ~80 words" />
      <p className="cv-output-normal">
        I'm an AI / software engineer based in Athens, Greece 🇬🇷 with a decade of shipping production systems — from
        real-time backends to LLM pipelines. These days I spend most of my time designing retrieval-augmented agents,
        evaluating them like a scientist, and wiring them into products people actually use. I care about legible
        systems, tight feedback loops, and code that still makes sense at 3am.
      </p>

      <CVSeparator />

      {/* skills */}
      <CVPrompt cmd="ls skills/ --grid --colorize" hint="# 14 entries found" />
      <div className="cv-chips-row">
        <Chip label="python" variant="bright" />
        <Chip label="typescript" variant="mid" />
        <Chip label="react" variant="mid" />
        <Chip label="node.js" variant="dim" />
        <Chip label="fastapi" variant="bright" />
        <Chip label="docker" variant="dim" />
        <Chip label="kubernetes" variant="mid" />
        <Chip label="aws" variant="dim" />
      </div>
      <div className="cv-chips-row">
        <Chip label="postgresql" variant="dim" />
        <Chip label="LLMs" variant="bright" />
        <Chip label="RAG" variant="bright" />
        <Chip label="langchain" variant="mid" />
        <Chip label="pytorch" variant="mid" />
        <Chip label="tensorflow" variant="dim" />
      </div>

      <CVSeparator />

      {/* experience */}
      <CVPrompt cmd="cat experience.log --tail 3" hint="# 3 most recent" />
      <p className="cv-meta-text">
        → reading from /var/log/career/experience.log · ordered by recency · format: json
      </p>

      <ExpCard
        markerColor="#ffffff"
        role="Senior AI Engineer"
        company="Proxyfoods AI"
        companyColor="#a3a3a3"
        dates="2024 — present · Athens"
        description="Leading the LLM agent platform: retrieval-augmented assistants with evaluation harnesses, guardrails, and observability baked in."
        bullets={[
          '  ▸ shipped hybrid-retrieval RAG pipeline serving 120k queries/day at p95 < 1.8s',
          '  ▸ built offline eval harness — regressions caught in CI before deploy, not prod',
          '  ▸ mentored 3 engineers, ran weekly deep-dives on retrieval & prompt design',
        ]}
        stack="  stack: python · fastapi · postgres+pgvector · langchain · openai · gcp"
        borderStyle="active"
      />

      <ExpCard
        markerColor="#a3a3a3"
        role="Full-Stack Engineer"
        company="Workable"
        companyColor="#a3a3a3"
        dates="2021 — 2024 · Athens"
        description="Scaled the applicant tracking platform: sourcing workflows, candidate search, and the first wave of AI-powered screening features."
        bullets={[
          '  ▸ owned candidate-search relevance revamp — +18% qualified-match rate',
          '  ▸ migrated legacy Rails module to a typed TS/React stack with zero downtime',
          '  ▸ co-designed the AI screening prototype that became a paid add-on tier',
        ]}
        stack="  stack: typescript · react · node · postgres · elasticsearch · aws"
        borderStyle="active"
      />

      <ExpCard
        markerColor="#737373"
        role="Software Engineer"
        company="Beat / Taxibeat"
        companyColor="#d4d4d4"
        dates="2019 — 2021 · Athens"
        description="Built driver-facing features for Europe's largest ride-hailing app — pricing flows, dispatch tooling, and a whole lot of real-time geo."
        bullets={[
          '  ▸ rewrote surge-pricing service, cutting p99 latency from 420ms → 95ms',
          '  ▸ shipped driver-earnings dashboard used by 40k+ drivers across 3 countries',
        ]}
        stack="  stack: python · django · postgres · redis · kafka · kubernetes"
        borderStyle="dim"
      />

      <CVSeparator />

      {/* education */}
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

      <CVSeparator />

      {/* contact */}
      <CVPrompt cmd="./contact --connect" hint="# establishing secure handshake…" />
      <p className="cv-meta-text">
        [ OK ] handshake verified · 4 channels online · pgp fingerprint 7F3A · preferred: email
      </p>
      <div className="cv-contact-cards">
        <a className="cv-contact-card cv-contact-card-bright" href="mailto:theo@tpsallidas.dev">
          <Mail size={14} />
          <span>theo@tpsallidas.dev</span>
        </a>
        <a
          className="cv-contact-card cv-contact-card-mid"
          href="https://github.com/tpsallidas"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={14} />
          <span>github.com/tpsallidas</span>
        </a>
        <a
          className="cv-contact-card cv-contact-card-mid"
          href="https://linkedin.com/in/tpsallidas"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={14} />
          <span>linkedin.com/in/tpsallidas</span>
        </a>
        <div className="cv-contact-card cv-contact-card-dim">
          <MapPin size={14} style={{ color: '#ffffff' }} />
          <span>Athens · GR</span>
        </div>
      </div>
      <p className="cv-contact-footer">
        ↳ say hi · available for staff / lead IC roles in AI platforms · remote or Athens-based
      </p>

      {/* Final prompt with blinking cursor */}
      <div className="cv-final-prompt">
        <span className="cv-prompt-text">theo@dev ~/cv $</span>
        <span className={`cv-cursor-block${cursorVisible ? '' : ' cv-cursor-blink-off'}`} />
      </div>
    </div>
  );
};

export default CVBody;

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CVPrompt, CVSeparator } from '../helpers';

type ChipVariant = 'bright' | 'mid' | 'dim';

const Chip: React.FC<{ label: string; variant: ChipVariant }> = ({ label, variant }) => (
  <Badge variant="secondary" className={`cv-chip cv-chip-${variant}`}>{label}</Badge>
);

const Skills: React.FC = () => (
  <>
    <CVSeparator />
    <CVPrompt cmd="ls skills/ --grid --colorize" hint="# 14 entries found" />
    <div className="cv-chips-row">
      {(['python', 'typescript', 'react', 'node.js', 'fastapi', 'docker', 'kubernetes', 'aws'] as const).map((s) => (
        <Chip key={s} label={s} variant={(['python', 'fastapi', 'LLMs', 'RAG'].includes(s) ? 'bright' : ['typescript', 'react', 'kubernetes', 'langchain', 'pytorch'].includes(s) ? 'mid' : 'dim') as ChipVariant} />
      ))}
    </div>
    <div className="cv-chips-row">
      {(['postgresql', 'LLMs', 'RAG', 'langchain', 'pytorch', 'tensorflow'] as const).map((s) => (
        <Chip key={s} label={s} variant={(['LLMs', 'RAG'].includes(s) ? 'bright' : ['langchain', 'pytorch'].includes(s) ? 'mid' : 'dim') as ChipVariant} />
      ))}
    </div>
  </>
);

export default Skills;

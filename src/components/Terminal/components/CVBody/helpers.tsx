import React from 'react';

export const CVPrompt: React.FC<{ cmd: string; hint?: string }> = ({ cmd, hint }) => (
  <div className="cv-prompt-line">
    <span className="cv-prompt-text">theo@dev ~/cv $</span>
    <span className="cv-cmd-text">{cmd}</span>
    {hint && <span className="cv-hint-text">{hint}</span>}
  </div>
);

export const CVSeparator: React.FC = () => <div className="cv-separator" />;

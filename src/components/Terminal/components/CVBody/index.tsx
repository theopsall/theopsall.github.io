import React from 'react';
import './CVBody.css';
import { useCVCursor } from './hooks/useCVCursor';
import Intro from './sections/Intro';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Contact from './sections/Contact';

const CVBody: React.FC = () => {
  const cursorVisible = useCVCursor();

  return (
    <div className="cv-body">
      <Intro />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <div className="cv-final-prompt">
        <span className="cv-prompt-text">theo@dev ~/cv $</span>
        <span className={`cv-cursor-block${cursorVisible ? '' : ' cv-cursor-blink-off'}`} />
      </div>
    </div>
  );
};

export default CVBody;

import React from 'react';
import './index.css';
import Masthead from './components/Masthead';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import ShellDock from './components/ShellDock';
import { useShellDock } from './hooks/useShellDock';

const Portfolio: React.FC = () => {
  const { open, dockRef, openShell, closeShell } = useShellDock();
  return (
    <main className="pf">
      <Masthead onOpenShell={openShell} />
      <Experience />
      <div className="pf-pair">
        <Education />
        <Contact />
      </div>
      <ShellDock open={open} dockRef={dockRef} onOpen={openShell} onClose={closeShell} />
    </main>
  );
};

export default Portfolio;

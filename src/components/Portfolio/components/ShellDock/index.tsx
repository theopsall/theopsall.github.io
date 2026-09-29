import React from 'react';
import { Button } from '@/components/ui/button';
import Terminal from '@/components/Terminal';

interface ShellDockProps {
  open: boolean;
  dockRef: React.MutableRefObject<HTMLElement | null>;
  onOpen: () => void;
  onClose: () => void;
}

const ShellDock: React.FC<ShellDockProps> = ({ open, dockRef, onOpen, onClose }) => (
  <section className="pf-section dock" ref={dockRef} aria-labelledby="shell-h">
    <h2 id="shell-h" className="pf-h2">Shell</h2>
    {open ? (
      <>
        <div className="dock-window"><Terminal /></div>
        <p className="pf-hint">
          Esc leaves the input. <Button variant="link" className="pf-inline-btn" onClick={onClose}>Close shell</Button>
        </p>
      </>
    ) : (
      <Button variant="ghost" className="dock-prompt" onClick={onOpen}>
        <span className="dock-arrow" aria-hidden="true">❯</span>
        <span>try <code>ps</code>, <code>help</code> or <code>cat about.md</code></span>
      </Button>
    )}
  </section>
);

export default ShellDock;

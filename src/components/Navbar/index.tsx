import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import ExternalLink from '@/components/ExternalLink';
import { useNavbar } from '@/components/Navbar/hooks/useNavbar';
import './index.css';

const NAV_LINKS = [
  { id: 'home',       label: '~/home',       command: 'home' },
  { id: 'about',      label: '~/about',      command: 'about' },
  { id: 'experience', label: '~/experience', command: 'experience' },
  { id: 'projects',   label: '~/projects',   command: 'projects' },
  { id: 'skills',     label: '~/skills',     command: 'skills' },
  { id: 'contact',    label: '~/contact',    command: 'contact' },
];

interface NavbarProps {
  activeCommand: string;
  onRunCommand: (cmd: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeCommand, onRunCommand }) => {
  const { cursorVisible, sessionId } = useNavbar();

  return (
    <nav className="navbar" aria-label="Site navigation">
      <div className="navbar-top-line" />
      <div className="navbar-main-row">
        <div className="navbar-left">
          <div className="navbar-led" aria-hidden="true" />
          <span className="navbar-prompt" aria-label="tpsallidas@dev:~$">
            <span className="navbar-prompt-user">tpsallidas</span>
            <span className="navbar-prompt-at">@</span>
            <span className="navbar-prompt-host">dev</span>
            <span className="navbar-prompt-colon">:</span>
            <span className="navbar-prompt-tilde">~</span>
            <span className="navbar-prompt-dollar">$ </span>
          </span>
          <div className={`navbar-cursor${cursorVisible ? '' : ' blink-off'}`} aria-hidden="true" />
        </div>

        <div className="navbar-center" role="list">
          {NAV_LINKS.map((link) => {
            const isActive = link.command === activeCommand;
            return (
              <Button
                key={link.id}
                variant="ghost"
                className={isActive ? 'navbar-link-active' : 'navbar-link'}
                onClick={() => onRunCommand(link.command)}
                aria-current={isActive ? 'page' : undefined}
                role="listitem"
              >
                {isActive ? (
                  <>
                    <span className="navbar-link-bracket">[</span>
                    <span className="navbar-link-label-active">{link.label}</span>
                    <span className="navbar-link-bracket">]</span>
                  </>
                ) : (
                  link.label
                )}
              </Button>
            );
          })}
        </div>

        <div className="navbar-right">
          <span className="navbar-session-chip" aria-label="Session ID">
            {sessionId}
          </span>
          <ExternalLink
            href="https://github.com/theopsall"
            className="navbar-icon-btn"
            aria-label="GitHub profile"
          >
            <FaGithub size={14} />
          </ExternalLink>
          <ExternalLink
            href="https://linkedin.com/in/tpsallidas"
            className="navbar-icon-btn"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin size={14} />
          </ExternalLink>
        </div>
      </div>
      <div className="navbar-bottom-line" />
    </nav>
  );
};

export default Navbar;

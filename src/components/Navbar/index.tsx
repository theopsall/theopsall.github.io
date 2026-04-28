import React, { useState, useEffect, useRef } from 'react';
import { Moon } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './index.css';

const NAV_LINKS = [
  { id: 'home',     label: '~/home',     command: 'home' },
  { id: 'about',    label: '~/about',    command: 'about' },
  { id: 'projects', label: '~/projects', command: 'projects' },
  { id: 'skills',   label: '~/skills',   command: 'skills' },
  { id: 'contact',  label: '~/contact',  command: 'contact' },
];

interface NavbarProps {
  activeCommand: string;
  onRunCommand: (cmd: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeCommand, onRunCommand }) => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const sessionId = useRef(
    'sess:0x' + Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0')
  );

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="navbar" aria-label="Site navigation">
      <div className="navbar-top-line" />
      <div className="navbar-main-row">
        {/* Left: prompt */}
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
          <div
            className={`navbar-cursor${cursorVisible ? '' : ' blink-off'}`}
            aria-hidden="true"
          />
        </div>

        {/* Center: nav links */}
        <div className="navbar-center" role="list">
          {NAV_LINKS.map((link) => {
            const isActive = link.command === activeCommand;
            return isActive ? (
              <button
                key={link.id}
                className="navbar-link-active"
                onClick={() => onRunCommand(link.command)}
                aria-current="page"
                role="listitem"
              >
                <span className="navbar-link-bracket">[</span>
                <span className="navbar-link-label-active">{link.label}</span>
                <span className="navbar-link-bracket">]</span>
              </button>
            ) : (
              <button
                key={link.id}
                className="navbar-link"
                onClick={() => onRunCommand(link.command)}
                role="listitem"
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right: session + actions */}
        <div className="navbar-right">
          <span className="navbar-session-chip" aria-label="Session ID">
            {sessionId.current}
          </span>
          <button className="navbar-icon-btn" aria-label="Toggle theme">
            <Moon size={14} />
          </button>
          <a
            className="navbar-icon-btn"
            href="https://github.com/theopsall"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <FaGithub size={14} />
          </a>
          <button className="navbar-kbd-chip" aria-label="Command palette">
            ⌘ K
          </button>
        </div>
      </div>
      <div className="navbar-bottom-line" />
    </nav>
  );
};

export default Navbar;

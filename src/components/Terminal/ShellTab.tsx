import React, { forwardRef, useImperativeHandle } from 'react';
import type { ArticleMeta } from './types';
import { useShell } from './useShell';

interface ShellTabProps {
  isActive: boolean;
  articles: ArticleMeta[];
  onOpenArticle: (slug: string, title: string) => void;
}

export interface ShellTabHandle {
  runCommand: (cmd: string) => void;
}

const WelcomeBanner: React.FC = () => (
  <div className="welcome-banner">
    <p className="text-highlight">Theodoros Psallidas</p>
    <p className="text-normal">Senior Software Engineer · AI Engineer</p>
    <p className="text-muted-term">Type <span className="text-command">help</span> or <span className="text-command">?</span> to see available commands.</p>
  </div>
);

const Prompt: React.FC = () => (
  <span className="prompt">
    <span className="prompt-user">theodoros</span>
    <span className="prompt-at">@</span>
    <span className="prompt-host">portfolio</span>
    <span className="prompt-separator"> ~ </span>
    <span className="prompt-symbol">%</span>
  </span>
);

const ShellTab = forwardRef<ShellTabHandle, ShellTabProps>(
  ({ isActive, articles, onOpenArticle }, ref) => {
    const {
      input, history, completions,
      inputRef, bodyRef,
      handleKeyDown, handleInputChange, focusInput,
      runCommand,
    } = useShell(articles, onOpenArticle, isActive);

    useImperativeHandle(ref, () => ({ runCommand }), [runCommand]);

    return (
      <div
        className="shell-tab"
        style={{ display: isActive ? 'flex' : 'none' }}
        role="application"
        aria-label="Terminal shell"
        onClick={focusInput}
        onKeyDown={focusInput}
      >
        <div className="shell-banner">
          <WelcomeBanner />
        </div>
        <div className="terminal-body" ref={bodyRef}>
          {history.map((item) => (
            <div key={item.id} className="terminal-line">
              {item.command && (
                <div className="command-line">
                  <Prompt />
                  <span className="command-text">{item.command}</span>
                </div>
              )}
              {item.output && <div className="output">{item.output}</div>}
            </div>
          ))}
          <div className="terminal-line input-line">
            <Prompt />
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
            />
          </div>
          {completions.isOpen && (
            <div className="zsh-tree">
              <div className="zsh-tree-header">
                <span className="zsh-tree-icon">📂</span>
                <span className="zsh-tree-label">{completions.label}</span>
              </div>
              {completions.items.map((item, idx) => {
                const isLast = idx === completions.items.length - 1;
                const branch = isLast ? '└── ' : '├── ';
                return (
                  <div
                    key={item.value}
                    className={`zsh-tree-row${idx === completions.index ? ' zsh-tree-row-active' : ''}`}
                  >
                    <span className="zsh-tree-branch">{branch}</span>
                    <span className="zsh-tree-value">{item.value}</span>
                    {item.desc && <span className="zsh-tree-desc">{item.desc}</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ShellTab.displayName = 'ShellTab';

export default ShellTab;

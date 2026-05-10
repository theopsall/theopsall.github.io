import React, { forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import type { ArticleMeta } from './types';
import { useShell } from './useShell';
import { P10kInfoLine, P10kArrow, P10kActiveArrow, P10kHint } from './P10kPrompt';

interface NavTabProps {
  command: string;
  isActive: boolean;
  articles: ArticleMeta[];
  onOpenArticle: (slug: string, title: string) => void;
  fetchArticle: (slug: string) => Promise<string>;
}

export interface NavTabHandle {
  runCommand: (cmd: string) => void;
}

const NavTab = forwardRef<NavTabHandle, NavTabProps>(
  ({ command, isActive, articles, onOpenArticle, fetchArticle }, ref) => {
    const {
      input, suggestion, cwd, history, promptTime, completions,
      inputRef, bodyRef,
      handleKeyDown, handleInputChange, focusInput,
      runCommand,
    } = useShell(articles, onOpenArticle, fetchArticle, isActive);

    useImperativeHandle(ref, () => ({ runCommand }), [runCommand]);

    const didAutoRun = useRef(false);
    useEffect(() => {
      if (!didAutoRun.current) {
        didAutoRun.current = true;
        runCommand(command, false);
      }
    }, [command, runCommand]);

    return (
      <div
        className="shell-tab"
        style={{ display: isActive ? 'flex' : 'none' }}
        role="application"
        aria-label={`${command} tab`}
        onClick={focusInput}
        onKeyDown={focusInput}
      >
        <div className="terminal-body" ref={bodyRef}>
          {history.map((item) => (
            <div key={item.id} className="terminal-line">
              {item.command && (
                <div className="p10k-input-block">
                  <P10kInfoLine time={item.timestamp} cwd={cwd} />
                  <div className="command-line">
                    <P10kArrow />
                    <span className="command-text">{item.command}</span>
                  </div>
                </div>
              )}
              {item.output && <div className="output">{item.output}</div>}
            </div>
          ))}

          <div className="terminal-line input-line p10k-input-block">
            <P10kInfoLine time={promptTime} cwd={cwd} />
            <div className="p10k-input-row">
              <P10kActiveArrow />
              <div className="input-ghost-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  className="terminal-input"
                  value={input}
                  size={Math.max(1, input.length) + 1}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                />
                {suggestion && (
                  <span className="ghost-suggestion">{suggestion.slice(input.length)}</span>
                )}
              </div>
            </div>
            <P10kHint />
          </div>

          {completions.isOpen && (
            <div className="zsh-tree">
              <div className="zsh-tree-header">
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

NavTab.displayName = 'NavTab';

export default NavTab;

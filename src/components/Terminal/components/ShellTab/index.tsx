import React, { forwardRef, useImperativeHandle } from 'react';
import { Input } from '@/components/ui/input';
import { useShell } from './hooks/useShell';
import { P10kInfoLine, P10kArrow, P10kActiveArrow } from '@/components/Terminal/components/P10kPrompt';
import BannerTitle from '@/components/Terminal/components/BannerTitle';
import type { ArticleMeta } from '@/components/Terminal/types';

interface ShellTabProps {
  isActive: boolean;
  articles: ArticleMeta[];
  onOpenArticle: (slug: string, title: string) => void;
  fetchArticle: (slug: string) => Promise<string>;
}

export interface ShellTabHandle {
  runCommand: (cmd: string) => void;
}

const WelcomeBanner: React.FC = () => (
  <div className="welcome-banner">
    <BannerTitle />
    <p className="text-normal">Senior Software Engineer, ProxyFoods</p>
    <p className="text-muted-term">
      Type <span className="text-command">help</span> or <span className="text-command">?</span> to see available commands.
    </p>
  </div>
);

const ShellTab = forwardRef<ShellTabHandle, ShellTabProps>(
  ({ isActive, articles, onOpenArticle, fetchArticle }, ref) => {
    const { input, suggestion, cwd, history, promptTime, completions, inputRef, bodyRef, handleKeyDown, handleInputChange, focusInput, runCommand } = useShell(articles, onOpenArticle, fetchArticle, isActive);

    useImperativeHandle(ref, () => ({ runCommand }), [runCommand]);

    return (
      <div className="shell-tab" style={{ display: isActive ? 'flex' : 'none' }} role="group" aria-label="Terminal shell" onClick={focusInput}>
        <div className="terminal-body" ref={bodyRef} role="log" aria-live="polite">
          {history.length === 0 && <div className="shell-banner"><WelcomeBanner /></div>}

          {history.map((item) => (
            <div key={item.id} className="terminal-line">
              {item.command && (
                <div className="p10k-input-block">
                  <P10kInfoLine time={item.timestamp} cwd={cwd} />
                  <div className="command-line"><P10kArrow /><span className="command-text">{item.command}</span></div>
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
                <Input
                  ref={inputRef}
                  type="text"
                  className="terminal-input"
                  value={input}
                  size={Math.max(1, input.length) + 1}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  aria-label="Shell command"
                />
                {suggestion && <span className="ghost-suggestion">{suggestion.slice(input.length)}</span>}
              </div>
            </div>
          </div>

          {completions.isOpen && (
            <div className="zsh-tree">
              <div className="zsh-tree-header"><span className="zsh-tree-label">{completions.label}</span></div>
              {completions.items.map((item, idx) => (
                <div key={item.value} className={`zsh-tree-row${idx === completions.index ? ' zsh-tree-row-active' : ''}`}>
                  <span className="zsh-tree-branch">{idx === completions.items.length - 1 ? '└── ' : '├── '}</span>
                  <span className="zsh-tree-value">{item.value}</span>
                  {item.desc && <span className="zsh-tree-desc">{item.desc}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ShellTab.displayName = 'ShellTab';
export default ShellTab;

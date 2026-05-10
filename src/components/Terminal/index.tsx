import React, { useRef } from 'react';
import './index.css';
import MatrixRain from '@/components/MatrixRain';
import Navbar from '@/components/Navbar';
import StatusBar from '@/components/Terminal/components/StatusBar';
import TabBar from '@/components/Terminal/components/TabBar';
import ShellTab from '@/components/Terminal/components/ShellTab';
import type { ShellTabHandle } from '@/components/Terminal/components/ShellTab';
import ArticleTab from '@/components/Terminal/components/ArticleTab';
import NavTab from '@/components/Terminal/components/NavTab';
import { useTabs } from '@/components/Terminal/hooks/useTabs';
import { useArticles } from '@/components/Terminal/hooks/useArticles';
import { useTitleBlink } from '@/components/Terminal/hooks/useTitleBlink';

const NAV_LABELS: Record<string, string> = {
  about: '~/about',
  experience: '~/experience',
  projects: '~/projects',
  skills: '~/skills',
  contact: '~/contact',
};

const Terminal: React.FC = () => {
  const { tabs, activeTabId, titleSuffix, openArticle, openNavTab, switchTab, closeTab } = useTabs();
  const { articles, fetchArticle, getArticleBySlug } = useArticles();
  const shellRef = useRef<ShellTabHandle | null>(null);

  useTitleBlink(titleSuffix);

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const activeCommand = activeTab?.type === 'shell' ? 'home' : (activeTab?.command ?? '');

  const handleNavCommand = (cmd: string) => {
    if (cmd === 'home') { switchTab('shell'); return; }
    openNavTab(cmd, NAV_LABELS[cmd] ?? `~/${cmd}`);
  };

  return (
    <div className="terminal-container">
      <MatrixRain className="matrix-rain-background" />
      <Navbar activeCommand={activeCommand} onRunCommand={handleNavCommand} />

      <div className="terminal-overlay">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="traffic-lights">
              <span className="light light-close">
                <svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="1.5" y1="1.5" x2="6.5" y2="6.5" stroke="#4d0000" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="6.5" y1="1.5" x2="1.5" y2="6.5" stroke="#4d0000" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="light light-minimize">
                <svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="1.5" y1="4" x2="6.5" y2="4" stroke="#4d3000" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="light light-maximize">
                <svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="4" y1="1.5" x2="4" y2="6.5" stroke="#003d00" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="1.5" y1="4" x2="6.5" y2="4" stroke="#003d00" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
            </div>
            <div className="terminal-title">theo@tpsallidas.dev: ~/cv</div>
            <StatusBar />
          </div>

          <TabBar tabs={tabs} activeTabId={activeTabId} onSwitchTab={switchTab} onCloseTab={closeTab} />

          <div className="terminal-content-area">
            <ShellTab
              ref={shellRef}
              isActive={activeTabId === 'shell'}
              articles={articles}
              onOpenArticle={(slug, title) => openArticle(slug, title)}
              fetchArticle={fetchArticle}
            />

            {tabs.filter((t) => t.type === 'nav').map((tab) => (
              <NavTab
                key={tab.id}
                command={tab.command!}
                isActive={activeTabId === tab.id}
                articles={articles}
                onOpenArticle={(slug, title) => openArticle(slug, title)}
                fetchArticle={fetchArticle}
              />
            ))}

            {tabs.filter((t) => t.type === 'article').map((tab) => (
              <ArticleTab
                key={tab.id}
                slug={tab.slug!}
                meta={getArticleBySlug(tab.slug!)}
                fetchArticle={fetchArticle}
                isActive={activeTabId === tab.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;

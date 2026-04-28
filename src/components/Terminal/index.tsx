import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import MatrixRain from '../MatrixRain';
import Navbar from '../Navbar';
import TabBar from './TabBar';
import ShellTab from './ShellTab';
import type { ShellTabHandle } from './ShellTab';
import ArticleTab from './ArticleTab';
import { useArticles } from './useArticles';
import { useTabs } from './useTabs';

const TITLE_BASE = 'theodoros@portfolio ~ %';

const Terminal: React.FC = () => {
  const { tabs, activeTabId, titleSuffix, openArticle, switchTab, closeTab } = useTabs();
  const suffixRef = useRef(titleSuffix);
  suffixRef.current = titleSuffix;

  const shellRef = useRef<ShellTabHandle | null>(null);
  const [activeCommand, setActiveCommand] = useState('home');

  const handleNavCommand = (cmd: string) => {
    if (activeTabId !== 'shell') switchTab('shell');
    shellRef.current?.runCommand('clear');
    shellRef.current?.runCommand(cmd);
    setActiveCommand(cmd);
  };

  useEffect(() => {
    let visible = true;
    const update = () => {
      const suffix = suffixRef.current ? ` ${suffixRef.current}` : '';
      document.title = `${TITLE_BASE}${suffix}${visible ? ' █' : ''}`;
    };
    update();
    const id = setInterval(() => {
      visible = !visible;
      update();
    }, 530);
    return () => clearInterval(id);
  }, []);

  const { articles, fetchArticle, getArticleBySlug } = useArticles();

  return (
    <div className="terminal-container">
      <MatrixRain className="matrix-rain-background" />
      <Navbar activeCommand={activeCommand} onRunCommand={handleNavCommand} />
      <div className="terminal-overlay">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="traffic-lights">
              <span className="light light-close"></span>
              <span className="light light-minimize"></span>
              <span className="light light-maximize"></span>
            </div>
            <div className="terminal-title">
              <span className="title-icon">&gt;_</span>
              <span>theodoros@portfolio ~ {titleSuffix}</span>
            </div>
            <div className="terminal-actions"></div>
          </div>
          <TabBar
            tabs={tabs}
            activeTabId={activeTabId}
            onSwitchTab={switchTab}
            onCloseTab={closeTab}
          />
          <div className="terminal-content-area">
            <ShellTab
              ref={shellRef}
              isActive={activeTabId === 'shell'}
              articles={articles}
              onOpenArticle={openArticle}
            />
            {tabs
              .filter((t) => t.type === 'article')
              .map((tab) => (
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

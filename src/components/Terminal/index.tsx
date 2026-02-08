import React from 'react';
import './index.css';
import DarkVeil from '../DarkVeil';
import TabBar from './TabBar';
import ShellTab from './ShellTab';
import ArticleTab from './ArticleTab';
import { useArticles } from './useArticles';
import { useTabs } from './useTabs';

const Terminal: React.FC = () => {
  const { tabs, activeTabId, titleSuffix, openArticle, switchTab, closeTab } = useTabs();
  const { articles, fetchArticle, getArticleBySlug } = useArticles();

  return (
    <div className="terminal-container">
      <DarkVeil className="dark-veil-background" />
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

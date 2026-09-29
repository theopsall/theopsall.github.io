import React from 'react';
import './index.css';
import TabBar from '@/components/Terminal/components/TabBar';
import ShellTab from '@/components/Terminal/components/ShellTab';
import ArticleTab from '@/components/Terminal/components/ArticleTab';
import { useTabs } from '@/components/Terminal/hooks/useTabs';
import { useArticles } from '@/components/Terminal/hooks/useArticles';

const Terminal: React.FC = () => {
  const { tabs, activeTabId, openArticle, switchTab, closeTab } = useTabs();
  const { articles, fetchArticle, getArticleBySlug } = useArticles();

  return (
    <div className="terminal-window">
      <TabBar tabs={tabs} activeTabId={activeTabId} onSwitchTab={switchTab} onCloseTab={closeTab} />
      <div className="terminal-content-area">
        <ShellTab
          isActive={activeTabId === 'shell'}
          articles={articles}
          onOpenArticle={(slug, title) => openArticle(slug, title)}
          fetchArticle={fetchArticle}
        />
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
  );
};

export default Terminal;

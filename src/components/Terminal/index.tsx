import React, { useReducer, useCallback } from 'react';
import './index.css';
import DarkVeil from '../DarkVeil';
import TabBar from './TabBar';
import ShellTab from './ShellTab';
import ArticleTab from './ArticleTab';
import { useArticles } from './useArticles';
import type { TabState, TabAction } from './types';

const initialState: TabState = {
  tabs: [{ id: 'shell', type: 'shell', label: 'Shell' }],
  activeTabId: 'shell',
};

function tabReducer(state: TabState, action: TabAction): TabState {
  switch (action.type) {
    case 'OPEN_ARTICLE': {
      const tabId = `article-${action.slug}`;
      const existing = state.tabs.find((t) => t.id === tabId);
      if (existing) {
        return { ...state, activeTabId: tabId };
      }
      return {
        tabs: [
          ...state.tabs,
          { id: tabId, type: 'article', label: action.title, slug: action.slug },
        ],
        activeTabId: tabId,
      };
    }
    case 'CLOSE_TAB': {
      if (action.id === 'shell') return state;
      const idx = state.tabs.findIndex((t) => t.id === action.id);
      const newTabs = state.tabs.filter((t) => t.id !== action.id);
      let newActiveId = state.activeTabId;
      if (state.activeTabId === action.id) {
        const prevIdx = Math.max(0, idx - 1);
        newActiveId = newTabs[prevIdx]?.id ?? 'shell';
      }
      return { tabs: newTabs, activeTabId: newActiveId };
    }
    case 'SWITCH_TAB': {
      return { ...state, activeTabId: action.id };
    }
    default:
      return state;
  }
}

const Terminal: React.FC = () => {
  const [state, dispatch] = useReducer(tabReducer, initialState);
  const { articles, fetchArticle, getArticleBySlug } = useArticles();

  const handleOpenArticle = useCallback(
    (slug: string, title: string) => {
      dispatch({ type: 'OPEN_ARTICLE', slug, title });
    },
    []
  );

  const handleSwitchTab = useCallback((id: string) => {
    dispatch({ type: 'SWITCH_TAB', id });
  }, []);

  const handleCloseTab = useCallback((id: string) => {
    dispatch({ type: 'CLOSE_TAB', id });
  }, []);

  const activeTab = state.tabs.find((t) => t.id === state.activeTabId);
  const titleSuffix = activeTab?.type === 'article' && activeTab.slug
    ? `blog/${activeTab.slug}`
    : 'shell';

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
            tabs={state.tabs}
            activeTabId={state.activeTabId}
            onSwitchTab={handleSwitchTab}
            onCloseTab={handleCloseTab}
          />
          <div className="terminal-content-area">
            <ShellTab
              isActive={state.activeTabId === 'shell'}
              articles={articles}
              onOpenArticle={handleOpenArticle}
            />
            {state.tabs
              .filter((t) => t.type === 'article')
              .map((tab) => (
                <ArticleTab
                  key={tab.id}
                  slug={tab.slug!}
                  meta={getArticleBySlug(tab.slug!)}
                  fetchArticle={fetchArticle}
                  isActive={state.activeTabId === tab.id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;

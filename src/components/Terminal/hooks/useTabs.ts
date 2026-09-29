import { useReducer, useCallback } from 'react';
import type { TabState, TabAction } from '@/components/Terminal/types';

const initialState: TabState = {
  tabs: [{ id: 'shell', type: 'shell', label: '~' }],
  activeTabId: 'shell',
};

const tabReducer = (state: TabState, action: TabAction): TabState => {
  switch (action.type) {
    case 'OPEN_ARTICLE': {
      const tabId = `article-${action.slug}`;
      const existing = state.tabs.find((t) => t.id === tabId);
      if (existing) return { ...state, activeTabId: tabId };
      return {
        tabs: [...state.tabs, { id: tabId, type: 'article', label: action.title, slug: action.slug }],
        activeTabId: tabId,
      };
    }
    case 'CLOSE_TAB': {
      if (action.id === 'shell') return state;
      const idx = state.tabs.findIndex((t) => t.id === action.id);
      const newTabs = state.tabs.filter((t) => t.id !== action.id);
      const newActiveId = state.activeTabId === action.id
        ? (newTabs[Math.max(0, idx - 1)]?.id ?? 'shell')
        : state.activeTabId;
      return { tabs: newTabs, activeTabId: newActiveId };
    }
    case 'SWITCH_TAB':
      return { ...state, activeTabId: action.id };
    default:
      return state;
  }
};

export const useTabs = () => {
  const [state, dispatch] = useReducer(tabReducer, initialState);

  const openArticle = useCallback((slug: string, title: string) => dispatch({ type: 'OPEN_ARTICLE', slug, title }), []);
  const switchTab = useCallback((id: string) => dispatch({ type: 'SWITCH_TAB', id }), []);
  const closeTab = useCallback((id: string) => dispatch({ type: 'CLOSE_TAB', id }), []);

  return { tabs: state.tabs, activeTabId: state.activeTabId, openArticle, switchTab, closeTab };
};

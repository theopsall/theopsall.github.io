import React from 'react';

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
}

export interface ArticleManifest {
  articles: ArticleMeta[];
}

export interface Tab {
  id: string;
  type: 'shell' | 'article';
  label: string;
  slug?: string;
}

export interface TabState {
  tabs: Tab[];
  activeTabId: string;
}

export type TabAction =
  | { type: 'OPEN_ARTICLE'; slug: string; title: string }
  | { type: 'CLOSE_TAB'; id: string }
  | { type: 'SWITCH_TAB'; id: string };

export interface CommandHistory {
  id: number;
  command: string;
  output: React.ReactNode;
}

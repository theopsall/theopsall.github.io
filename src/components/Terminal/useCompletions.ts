import { useState, useCallback } from 'react';
import type { ArticleMeta } from './types';
import { COMMAND_DESCRIPTIONS } from './useCommands';

export interface CompletionItem {
  value: string;
  desc: string;
}

interface CompletionState {
  items: CompletionItem[];
  index: number;
  prefix: string;
  label: string;
}

const EMPTY: CompletionState = { items: [], index: -1, prefix: '', label: '' };

export const useCompletions = (
  commandNames: string[],
  articles: ArticleMeta[],
) => {
  const [state, setState] = useState<CompletionState>(EMPTY);

  const isOpen = state.items.length > 0;

  const dismiss = useCallback(() => setState(EMPTY), []);

  const open = useCallback((input: string) => {
    const trimmed = input.toLowerCase();

    let matches: CompletionItem[];
    let prefix: string;
    let label: string;

    if (trimmed.startsWith('blog ')) {
      const partial = trimmed.slice(5);
      matches = articles
        .filter((a) => a.slug.startsWith(partial))
        .map((a) => ({ value: a.slug, desc: `${a.title} · ${a.readingTime}` }));
      prefix = 'blog ';
      label = 'articles/';
    } else {
      matches = commandNames
        .filter((cmd) => cmd.startsWith(trimmed))
        .map((cmd) => ({ value: cmd, desc: COMMAND_DESCRIPTIONS[cmd] || '' }));
      prefix = '';
      label = 'commands/';
    }

    if (matches.length === 0) return null;
    if (matches.length === 1) return { single: prefix + matches[0].value };

    setState({ items: matches, index: 0, prefix, label });
    return { selected: prefix + matches[0].value };
  }, [commandNames, articles]);

  const navigate = useCallback((direction: 1 | -1) => {
    setState((prev) => {
      if (prev.items.length === 0) return prev;
      const next = (prev.index + direction + prev.items.length) % prev.items.length;
      return { ...prev, index: next };
    });
  }, []);

  const getSelectedValue = useCallback(() => {
    if (state.index < 0 || state.index >= state.items.length) return null;
    return state.prefix + state.items[state.index].value;
  }, [state]);

  return {
    items: state.items,
    index: state.index,
    label: state.label,
    prefix: state.prefix,
    isOpen,
    open,
    dismiss,
    navigate,
    getSelectedValue,
  };
};

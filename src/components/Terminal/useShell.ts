import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import type { CommandHistory, ArticleMeta } from './types';
import { useCommands } from './useCommands';
import { useCompletions } from './useCompletions';
import { HOME_FILES, HOME_DIRS } from './constants';

let nextHistoryId = 0;

export const useShell = (
  articles: ArticleMeta[],
  onOpenArticle: (slug: string, title: string) => void,
  fetchArticle: (slug: string) => Promise<string>,
  isActive: boolean,
) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [promptTime, setPromptTime] = useState(() => new Date());
  const [cwd, setCwd] = useState('~');

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const { executeCommand, commandNames } = useCommands(articles, onOpenArticle, cwd, fetchArticle);
  const completions = useCompletions(commandNames, articles);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, completions.items]);

  useEffect(() => {
    if (isActive) inputRef.current?.focus();
  }, [isActive]);

  // Inline ghost suggestion (fish-shell style)
  const suggestion = useMemo(() => {
    if (!input.trim() || completions.isOpen) return '';
    const lower = input.toLowerCase();

    // "cat <partial>" — files depend on cwd
    if (lower.startsWith('cat ')) {
      const partial = lower.slice(4);
      if (cwd === '~/blog') {
        const match = articles.find((a) => (a.slug + '.md').startsWith(partial) && (a.slug + '.md') !== partial);
        return match ? 'cat ' + match.slug + '.md' : '';
      }
      const match = [...HOME_FILES].find((f) => f.startsWith(partial) && f !== partial);
      return match ? 'cat ' + match : '';
    }

    // "blog <partial>" → match article slugs
    if (lower.startsWith('blog ')) {
      const partial = lower.slice(5);
      const match = articles.find((a) => a.slug.startsWith(partial) && a.slug !== partial);
      return match ? 'blog ' + match.slug : '';
    }

    // "cd <partial>" → suggest directories
    if (lower.startsWith('cd ')) {
      const partial = lower.slice(3);
      if (cwd === '~') {
        const match = [...HOME_DIRS].find((d) => d.startsWith(partial) && d !== partial);
        return match ? 'cd ' + match : '';
      }
      if (cwd === '~/blog' && '..'.startsWith(partial)) return 'cd ..';
      return '';
    }

    // History first (most recent match)
    for (let i = cmdHistory.length - 1; i >= 0; i--) {
      const h = cmdHistory[i];
      if (h.toLowerCase().startsWith(lower) && h !== input) return h;
    }
    // Command names fallback
    const cmd = commandNames.find((c) => c.startsWith(lower) && c !== input);
    return cmd ?? '';
  }, [input, cwd, cmdHistory, commandNames, completions.isOpen, articles]);

  const acceptSuggestion = useCallback(() => {
    if (suggestion) setInput(suggestion);
  }, [suggestion]);

  const runCommand = useCallback((cmd: string, addToHistory = true) => {
    const result = executeCommand(cmd);

    if (addToHistory && cmd.trim()) {
      setCmdHistory((prev) => {
        if (prev[prev.length - 1] === cmd) return prev;
        return [...prev, cmd];
      });
      setHistoryIndex(-1);
    }

    if (result === 'clear') {
      setHistory([]);
      setPromptTime(new Date());
      return;
    }

    // cd result — update cwd, no visible output
    if ('cwd' in result) {
      setCwd(result.cwd);
      if (result.output !== null) {
        setHistory((prev) => [...prev, { id: nextHistoryId++, command: cmd, output: result.output, timestamp: new Date() }]);
      } else {
        setHistory((prev) => [...prev, { id: nextHistoryId++, command: cmd, output: null, timestamp: new Date() }]);
      }
      setPromptTime(new Date());
      return;
    }

    setHistory((prev) => [...prev, { id: nextHistoryId++, command: cmd, output: result.output, timestamp: new Date() }]);
    setPromptTime(new Date());
  }, [executeCommand]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (completions.isOpen) {
      if (e.key === 'Tab') {
        e.preventDefault();
        const dir = e.shiftKey ? -1 : 1;
        completions.navigate(dir as 1 | -1);
        const items = completions.items;
        const nextIdx = (completions.index + dir + items.length) % items.length;
        setInput(completions.prefix + items[nextIdx].value);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        completions.navigate(1);
        const items = completions.items;
        const nextIdx = (completions.index + 1) % items.length;
        setInput(completions.prefix + items[nextIdx].value);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        completions.navigate(-1);
        const items = completions.items;
        const nextIdx = (completions.index - 1 + items.length) % items.length;
        setInput(completions.prefix + items[nextIdx].value);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const selected = completions.getSelectedValue() || input;
        completions.dismiss();
        runCommand(selected);
        setInput('');
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        completions.dismiss();
        return;
      }
      completions.dismiss();
    }

    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowRight') {
      const el = e.target as HTMLInputElement;
      if (suggestion && el.selectionStart === input.length) {
        e.preventDefault();
        acceptSuggestion();
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) {
        acceptSuggestion();
        return;
      }
      const result = completions.open(input);
      if (!result) return;
      if ('single' in result) {
        setInput(result.single);
      } else {
        setInput(result.selected);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const idx = historyIndex === -1
          ? cmdHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(idx);
        setInput(cmdHistory[idx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const idx = historyIndex + 1;
        if (idx >= cmdHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(idx);
          setInput(cmdHistory[idx]);
        }
      }
    }
  }, [completions, input, suggestion, acceptSuggestion, cmdHistory, historyIndex, runCommand]);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    if (completions.isOpen) completions.dismiss();
  }, [completions]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return {
    input,
    suggestion,
    cwd,
    history,
    promptTime,
    completions: {
      items: completions.items,
      index: completions.index,
      label: completions.label,
      isOpen: completions.isOpen,
    },
    inputRef,
    bodyRef,
    handleKeyDown,
    handleInputChange,
    focusInput,
    runCommand,
  };
};

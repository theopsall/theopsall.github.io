import { useState, useCallback, useEffect, useRef } from 'react';
import type { CommandHistory, ArticleMeta } from './types';
import { useCommands } from './useCommands';
import { useCompletions } from './useCompletions';

let nextHistoryId = 0;

export const useShell = (
  articles: ArticleMeta[],
  onOpenArticle: (slug: string, title: string) => void,
  isActive: boolean,
) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const { executeCommand, commandNames } = useCommands(articles, onOpenArticle);
  const completions = useCompletions(commandNames, articles);

  // Auto-scroll on new output or completions
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, completions.items]);

  // Focus input when tab becomes active
  useEffect(() => {
    if (isActive) inputRef.current?.focus();
  }, [isActive]);

  const runCommand = useCallback((cmd: string) => {
    const result = executeCommand(cmd);

    if (result === 'clear') {
      setHistory([]);
      return;
    }

    setHistory((prev) => [...prev, { id: nextHistoryId++, command: cmd, output: result.output }]);
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
  }, [executeCommand]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // --- Completion menu open ---
    if (completions.isOpen) {
      if (e.key === 'Tab') {
        e.preventDefault();
        const dir = e.shiftKey ? -1 : 1;
        completions.navigate(dir as 1 | -1);
        const val = completions.getSelectedValue();
        // navigate is async via setState, read after next tick
        // instead, compute inline
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

    // --- Normal mode ---
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const result = completions.open(input);
      if (!result) return;
      if ('single' in result) {
        setInput(result.single);
      } else {
        setInput(result.selected);
      }
    }
  }, [completions, input, cmdHistory, historyIndex, runCommand]);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    if (completions.isOpen) completions.dismiss();
  }, [completions]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return {
    input,
    history,
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
  };
};

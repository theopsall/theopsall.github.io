import { useCallback, useEffect, useState } from 'react';

const isTyping = (el: EventTarget | null) => {
  const node = el as HTMLElement | null;
  return !!node && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA' || node.isContentEditable);
};

// Which roles are expanded, plus 1..9 keys that open a role and move focus to it.
export const useRoles = (count: number) => {
  const [open, setOpen] = useState<number[]>(() => Array.from({ length: count }, (_, i) => i));

  const toggle = useCallback((index: number) => {
    setOpen((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      const index = Number(e.key) - 1;
      if (!Number.isInteger(index) || index < 0 || index >= count) return;
      setOpen((prev) => (prev.includes(index) ? prev : [...prev, index]));
      const head = document.getElementById(`role-${index}`);
      head?.scrollIntoView({ block: 'center' });
      head?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count]);

  return { open, toggle };
};

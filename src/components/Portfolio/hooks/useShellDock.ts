import { useCallback, useRef, useState } from 'react';

// The shell stays unmounted until the visitor asks for it.
export const useShellDock = () => {
  const [open, setOpen] = useState(false);
  const dockRef = useRef<HTMLElement | null>(null);

  const openShell = useCallback(() => {
    setOpen(true);
    requestAnimationFrame(() => dockRef.current?.scrollIntoView({ block: 'start' }));
  }, []);

  const closeShell = useCallback(() => setOpen(false), []);

  return { open, dockRef, openShell, closeShell };
};

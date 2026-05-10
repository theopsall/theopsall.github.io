import { useEffect, useRef } from 'react';

export const useNavTabAutoRun = (command: string, runCommand: (cmd: string, addToHistory?: boolean) => void) => {
  const didAutoRun = useRef(false);

  useEffect(() => {
    if (!didAutoRun.current) {
      didAutoRun.current = true;
      runCommand(command, false);
    }
  }, [command, runCommand]);
};

import { useState, useEffect } from 'react';

export const useCVCursor = () => {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return cursorVisible;
};

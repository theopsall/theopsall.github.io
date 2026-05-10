import { useState, useEffect, useRef } from 'react';

export const useNavbar = () => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const sessionId = useRef(
    'sess:0x' + Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0')
  );

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return { cursorVisible, sessionId: sessionId.current };
};

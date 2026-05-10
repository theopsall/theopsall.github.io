import { useEffect, useRef } from 'react';

const TITLE_BASE = 'theodoros@portfolio ~ %';

export const useTitleBlink = (titleSuffix: string) => {
  const suffixRef = useRef(titleSuffix);
  suffixRef.current = titleSuffix;

  useEffect(() => {
    let visible = true;
    const update = () => {
      const suffix = suffixRef.current ? ` ${suffixRef.current}` : '';
      document.title = `${TITLE_BASE}${suffix}${visible ? ' █' : ''}`;
    };
    update();
    const id = setInterval(() => { visible = !visible; update(); }, 530);
    return () => clearInterval(id);
  }, []);
};

import React, { useState, useEffect, useRef, useMemo } from 'react';

const PORTRAIT_LINES = [
  ':          ...   ..,,.   .....,,:::,,.',
  '....::;:,,,,,:,,.              ....,,.',
  ';==+++*********=.                  ...',
  '==++****#####%+  ,=+**+***+=:.',
  ';:,::;=+******  ;*#########**+:     ..',
  ';     ,+***+*= =#**##%######*++:',
  '=, ..:*%%%%%%+ ,;:::::;=+=::::;;',
  '=,   :#%%%###* .:,.. . ,.    ...',
  ';     :*####*:::;=;;;::#=.::,,;,.',
  ';    ,+#%####;=+====;;##*::;==;;,',
  ';    +##%#****;=**+*+:,:,:++===;.             ..',
  ':    .;**++===..=;::,     :;=+;.',
  ',     ,=+++;;=.      .,,.    .',
  ',    .;+++=::=:    .,,,,..     .,.',
  ',     :;=;:;=*+               .::,',
  '      ,;=+*@%*+:.            .,::.',
  '. .:;=++@@@@@*=;;:.        ....,.',
  '***+=;:.:%@%@@*=;;;:::,,,:;+;:,,,...',
  '=:,,.... .*@%%%%*=;::;;;;;;#++****+++==;;:,,..',
  '...........=%@%%%%#*==;;;;+@;;+*#%@@@%%%###**+==',
  '       .... .=#%%%%%%%*,*%@@:,;;;=+*@@@@@@@@@%%#',
  '               :+#%%%@*:@@%:     ...,+@@@@@@@%%#',
  '                  ,;+##*%=.           =@@@@%%%##',
  '                      ,:               #@%%%##**',
];

const SCRAMBLE_CHARS = '@#%*+=;:,.';

const AsciiPortrait: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const charOrder = useMemo(() => {
    const indices: number[] = [];
    let offset = 0;
    for (const line of PORTRAIT_LINES) {
      for (let i = 0; i < line.length; i++) {
        if (line[i] !== ' ') indices.push(offset + i);
      }
      offset += line.length;
    }
    // Shuffle with seeded-ish random for consistent feel
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, []);

  useEffect(() => {
    const DURATION = 2000;
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min(1, elapsed / DURATION);
      // Ease-out curve
      setProgress(1 - (1 - p) * (1 - p));
      if (p < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const resolved = Math.floor(progress * charOrder.length);
  const resolvedSet = useMemo(() => {
    const set = new Set<number>();
    for (let i = 0; i < resolved; i++) set.add(charOrder[i]);
    return set;
  }, [resolved, charOrder]);

  const lines = useMemo(() => {
    const result: string[] = [];
    let offset = 0;
    for (const line of PORTRAIT_LINES) {
      let row = '';
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === ' ') {
          row += ' ';
        } else if (resolvedSet.has(offset + i)) {
          row += ch;
        } else if (progress > 0) {
          row += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        } else {
          row += ' ';
        }
      }
      result.push(row);
      offset += line.length;
    }
    return result;
  }, [resolvedSet, progress]);

  return (
    <pre className="ascii-portrait">{lines.join('\n')}</pre>
  );
};

export default AsciiPortrait;

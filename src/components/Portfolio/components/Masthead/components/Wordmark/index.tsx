import React from 'react';
import { WORDMARK_LINES, buildCells, wordmarkSize } from './glyphs';

const { width, height } = wordmarkSize(WORDMARK_LINES);

// Each cell resolves outward from the centre column; the jitter is a fixed hash so renders match.
const CELLS = buildCells(WORDMARK_LINES).map(({ x, y }) => ({
  x,
  y,
  delay: Math.round((Math.abs(x - width / 2) / (width / 2)) * 420 + (((x * 73856093) ^ (y * 19349663)) >>> 0) % 90),
}));

const Wordmark: React.FC = () => (
  <svg className="wordmark" viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false">
    {CELLS.map(({ x, y, delay }) => (
      <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" style={{ '--d': `${delay}ms` } as React.CSSProperties} />
    ))}
  </svg>
);

export default Wordmark;

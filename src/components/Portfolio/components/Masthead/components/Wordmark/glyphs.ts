// 5x7 pixel font for the masthead wordmark. '#' is a filled cell.
const GLYPHS: Record<string, string[]> = {
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
  R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
  P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  I: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '#####'],
};

const GLYPH_W = 5;
const GLYPH_H = 7;
const LETTER_GAP = 1;
const LINE_GAP = 2;

export const WORDMARK_LINES = ['THEODOROS', 'PSALLIDAS'] as const;

export interface Cell {
  x: number;
  y: number;
}

export const buildCells = (lines: readonly string[]): Cell[] =>
  lines.flatMap((line, row) =>
    [...line].flatMap((letter, col) =>
      GLYPHS[letter].flatMap((bits, y) =>
        [...bits].flatMap((bit, x) =>
          bit === '#'
            ? [{ x: col * (GLYPH_W + LETTER_GAP) + x, y: row * (GLYPH_H + LINE_GAP) + y }]
            : [],
        ),
      ),
    ),
  );

export const wordmarkSize = (lines: readonly string[]) => {
  const longest = Math.max(...lines.map((l) => l.length));
  return {
    width: longest * GLYPH_W + (longest - 1) * LETTER_GAP,
    height: lines.length * GLYPH_H + (lines.length - 1) * LINE_GAP,
  };
};

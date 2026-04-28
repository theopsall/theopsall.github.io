/** @schema 2.10 */

const KATAKANA = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ".split("");
const DIGITS = "0123456789".split("");
const LATIN = "ABCDEFHKLMNPRSTVXYZ".split("");
const CHARS = KATAKANA.concat(KATAKANA).concat(DIGITS).concat(LATIN);

const W = pencil.width;
const H = pencil.height;

const NUM_COLUMNS = 40;
const FONT_SIZE = 18;
const LINE_H = 20;
const COL_WIDTH = W / NUM_COLUMNS;

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const nodes = [];

for (let c = 0; c < NUM_COLUMNS; c++) {
  const jitter = (Math.random() - 0.5) * (COL_WIDTH * 0.4);
  const baseX = c * COL_WIDTH + jitter + 2;

  const r = Math.random();
  let length;
  if (r < 0.25) length = 8 + Math.floor(Math.random() * 8);
  else if (r < 0.75) length = 18 + Math.floor(Math.random() * 18);
  else length = 38 + Math.floor(Math.random() * 20);

  const startY = -Math.random() * 600 + Math.random() * (H + 200) - 100;

  for (let i = 0; i < length; i++) {
    const y = startY + i * LINE_H;
    if (y < -24 || y > H + 4) continue;

    const fromHead = length - 1 - i;

    let color;
    let opacity;
    if (fromHead === 0) {
      color = Math.random() < 0.55 ? "#FFFFFF" : "#CCFFCC";
      opacity = 1;
    } else if (fromHead === 1) {
      color = "#B6FFD4";
      opacity = 0.98;
    } else if (fromHead <= 3) {
      color = "#00FF88";
      opacity = 0.95;
    } else if (fromHead <= 7) {
      color = "#00AA55";
      opacity = 0.85;
    } else if (fromHead <= 13) {
      color = "#006633";
      opacity = 0.72;
    } else if (fromHead <= 22) {
      color = "#003B1F";
      opacity = 0.55;
    } else {
      color = "#001A0C";
      opacity = Math.max(0.18, 0.45 - (fromHead - 22) * 0.012);
    }

    nodes.push({
      type: "text",
      x: baseX,
      y: y,
      content: pick(CHARS),
      fontFamily: "JetBrains Mono",
      fontSize: FONT_SIZE,
      fill: color,
      opacity: opacity,
    });
  }
}

return nodes;

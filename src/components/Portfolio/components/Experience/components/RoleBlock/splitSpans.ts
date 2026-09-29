export interface Part {
  text: string;
  marked: boolean;
}

// Splits a line into plain and marked parts; marked parts are the annotated spans.
export const splitSpans = (line: string, spans: string[]): Part[] => {
  const hits = spans
    .map((span) => ({ span, at: line.indexOf(span) }))
    .filter((hit) => hit.at >= 0)
    .sort((a, b) => a.at - b.at);
  const parts: Part[] = [];
  let cursor = 0;
  for (const { span, at } of hits) {
    if (at < cursor) continue;
    if (at > cursor) parts.push({ text: line.slice(cursor, at), marked: false });
    parts.push({ text: span, marked: true });
    cursor = at + span.length;
  }
  if (cursor < line.length) parts.push({ text: line.slice(cursor), marked: false });
  return parts;
};

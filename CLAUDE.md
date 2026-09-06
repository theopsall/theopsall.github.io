## React Code Guidelines

All React code in this repo follows strict conventions — see nested CLAUDE.md files for full detail:

- `src/CLAUDE.md` — path aliases, import rules, component placement
- `src/components/CLAUDE.md` — component authoring rules (the core ruleset)
- `src/components/ui/CLAUDE.md` — shadcn/ui vendored primitives (do not hand-edit)
- `src/components/Terminal/CLAUDE.md` — Terminal feature structure map

**Hard rules (enforce in every PR/change):**
1. Components render only — zero `useState`/`useEffect`/`useMemo`/data-fetch logic inside `index.tsx`.
2. All logic lives in `<Component>/hooks/useXxx.ts` (one concern per hook).
3. Hard ceiling of **200 lines** per `.tsx` / `.ts` file. Split before exceeding.
4. Generic/shared components at `src/components/`. Feature-specific children nested inside the parent dir.
5. **No raw HTML interactive elements** (`button`, `input`, `select`, `textarea`, `dialog`, `a`) — use shadcn/ui equivalents from `@/components/ui/*`.
6. **Before adding a new shadcn primitive**: query context7 MCP (`resolve-library-id` → `query-docs` with "shadcn/ui") for the current CLI install command. Never guess component APIs from memory.
7. **Before non-trivial React work**: invoke skills `pf-frontend-react:react-best-practices` and `vercel-react-best-practices`.

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)


<!-- headroom:serena-instructions -->
# Serena — Symbol-First Code Navigation

Serena's MCP tools expose this project's code as a symbol graph backed by a
language server. **Prefer these tools over reading whole files** — they return
only the code you need, cutting context usage sharply. Read a file end-to-end
only when a symbol view is insufficient (non-code files, or when you need the
surrounding glue).

## Preferred workflow
- `get_symbols_overview(<file>)` — list a file's top-level symbols before opening it.
- `find_symbol(<name>)` — fetch a symbol's definition/body instead of reading the file.
- `find_referencing_symbols(<name>)` — find call sites / usages instead of grepping.
- `find_declaration(<name>)` — jump to where a symbol is defined.

## Rule
Reach for a symbol tool first; fall back to reading a whole file only when the
symbol view does not answer the question.
<!-- /headroom:serena-instructions -->

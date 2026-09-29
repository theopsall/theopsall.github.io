---
version: 1
slug: "src-components-portfolio"
primary_target: "src/components/Portfolio"
related_targets: []
---

# Surface brief: Portfolio landing (src/components/Portfolio)

Scope and mode: whole landing page, Experience mode (the work leads, the interface recedes).
Audience and job: recruiters and engineers, 10-30s on desktop, want name, current role, agentic-platform work, education, CV, contact.
Action: see experience immediately; secondary: download CV, email, open the shell.
Proof: EXPERIENCE_DATA and EDUCATION_DATA in Terminal/constants.ts; no invented metrics.
Constraints: shadcn primitives for interactive elements, logic in hooks, files under 200 lines, WCAG AAA where achievable, reduced motion respected.
Unresolved: DESIGN.md sidecar, projects command still hardcoded, orphaned Redux/GithubService.

## Direction contract

THESIS: Your career reads as compiler diagnostics on real source: line-number gutter, wavy underlines under the phrases that matter, `= note:` lines. It refuses the hero-plus-cards portfolio and the fake macOS terminal window.
OWN-WORLD: Cool near-black ground (#0b0c0e family), Geist Mono for the name, roles and code-like blocks, Geist for the shell chrome text. One amber accent (#f0b04a) used for the current-role tag, note keys, wavy underlines, primary button, focus ring and selection. Hairline borders, no shadows, no glass, no gradients.
STORY: The visitor understands in seconds that Theo builds agentic platforms with LangGraph at ProxyFoods, sees the evidence underlined in the role text, can open any role with keys 1-9, and can download the CV or email. The shell is the reward for the curious.
FIRST VIEWPORT: Name in Geist Mono at up to 5rem, left aligned on a 68rem column; one-line positioning at 1.75rem under it; a two-line role and PhD line; then Download CV (amber), Email, Open shell. The ProxyFoods block begins at the fold with three annotated lines.
FORM: Compiler diagnostics (rustc style annotated source), candidate 7 of the ranked list, seed key 804f7ad1.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

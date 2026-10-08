---
name: Theodoros Psallidas Portfolio
description: A senior engineer's portfolio set as compiler diagnostics on pure black, in the Geist family, with a dot-matrix name and one blue voice.
colors:
  ink-black: "#000000"
  ink-elevated: "#111111"
  hairline: "#1f1f1f"
  hairline-strong: "#333333"
  text-primary: "#ededed"
  text-secondary: "#c8c8c8"
  text-muted: "#b0b0b0"
  text-dim: "#a1a1a1"
  text-faint: "#999999"
  signal-blue: "#52a8ff"
  signal-blue-hover: "#a8d3ff"
typography:
  name:
    fontFamily: "Geist Pixel Circle, Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 9vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.6vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
  code-current:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  code:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  xs: "2px"
  sm: "3px"
  md: "6px"
  card: "8px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2.25rem"
  section: "clamp(3.5rem, 8vw, 6rem)"
  tap: "2.75rem"
components:
  button-primary:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.ink-black}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 1.25rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink-black}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 1.25rem"
    height: "2.75rem"
  button-secondary-hover:
    backgroundColor: "{colors.ink-elevated}"
    textColor: "{colors.text-primary}"
  repo-card:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.card}"
    padding: "1.25rem"
  repo-card-hover:
    backgroundColor: "{colors.ink-elevated}"
  role-line:
    textColor: "{colors.text-secondary}"
    typography: "{typography.code}"
---

# Design System: Theodoros Psallidas Portfolio

## Overview

**Creative North Star: "The Compiler Diagnostics"**

The page reads the way a compiler reports on a codebase: each job is a diagnostic block, its highlights are numbered source lines, and the phrases that matter are underlined and explained by `= note:` lines beneath. The world's own materials are used natively: monospace, a line-number gutter with a hairline, a `-->` location arrow, wavy underlines, and `= note:` / `= stack:` keys. The current role opens first and is the only block that moves.

The surface is Vercel-register: pure black, the Geist family, a white primary button, and hairline-bounded surfaces. One expressive element sits on top of that restraint, the name, set as text in Geist Pixel Circle so it reads as a dot-matrix display. Everything else is grayscale text that clears 7:1 (WCAG AAA) on the page, with a single blue (signal blue) for interaction and annotation. Density is calm: a 68rem column, generous section gaps, no shadows. It rejects the generic template portfolio (hero, skill bars), hacker green-on-black, and flashy motion, per PRODUCT.md.

**Key Characteristics:**
- Pure black ground, one blue accent; rarity is the point.
- Geist carries reading and UI, Geist Mono carries anything code-like, Geist Pixel Circle carries the name only.
- Flat, hairline-bounded, tonal depth only. The one container pattern is the hairline repo card.
- The name is real h1 text (not an image), so agents and screen readers read it directly.
- Terminal motifs behave truthfully; nothing on the page pretends to be interactive.
- 44px minimum tap targets, visible blue focus ring, motion gated on reduced-motion preference.

## Colors

Pure black with a five-step gray text ladder and one blue. Tokens live in `src/index.css` (`--term-*`, `--accent`), with the same values wired to the shadcn dark tokens.

### Primary
- **Signal Blue** (#52a8ff): Focus ring, wavy annotation underlines, `note:` and `stack:` keys, the `current` level label, link-underline hover, repo-card and contact-link hover underlines, text selection tint (30% alpha). Measures 8.4:1 on black.
- **Lifted Blue** (#a8d3ff): Reserved hover lift for the accent.

### Neutral
- **Ink Black** (#000000): Page background; also the text color on the white primary button.
- **Elevated Ink** (#111111): Hover fill for ghost buttons and repo cards.
- **Hairline** (#1f1f1f): Footer top rule and the scrollbar track.
- **Strong Hairline** (#333333): Button and card borders, gutter rule, key-hint chip border, link underlines at rest, scrollbar thumb.
- **Bright Text** (#ededed): Headings, role titles, marked spans, the white primary button fill. 17.9:1.
- **Body Text** (#c8c8c8): Default reading color and source lines. 12.6:1.
- **Muted Text** (#b0b0b0): Masthead sub-line, repo descriptions, footer links. 9.7:1.
- **Dim Text** (#a1a1a1): Hints, locations, publication meta, contact labels. 8.1:1.
- **Faint Text** (#999999): Line numbers, `=` glyphs, key hints. 7.37:1, above the 7:1 AAA floor; "faint" is hierarchy, not low contrast.

### Named Rules
**The One Voice Rule.** Signal blue is the only chromatic color. It marks interaction, focus, and annotation. Never use it as decoration or as a fill. The primary action is white, not blue.

**The Legible Ladder Rule.** Every text token must hold at least 7:1 (WCAG AAA) on the page background; the faintest step measures 7.37:1. Hierarchy comes from steps in this ladder and from weight, never from dropping below it.

## Typography

**Display Font:** Geist Pixel Circle (with Geist fallback), used for the name only
**Body Font:** Geist (variable, with ui-sans-serif, system-ui fallbacks)
**Label/Mono Font:** Geist Mono (variable)

**Character:** A dot-matrix name over a neutral grotesque, with mono for the things a machine would print. All three faces are self-hosted woff2 files in `src/assets/fonts/` (`font-display: swap`); the pixel face is preloaded by the prerender step.

### Hierarchy
- **Name** (Pixel Circle 400, clamp(2.5rem, 9vw, 5.5rem), 1, letter-spacing 0, balanced): The h1 only. Needs size to keep the dot grid legible; never use it below about 2rem or for anything but the name.
- **Headline** (Sans 500, clamp(1.25rem, 2.6vw, 1.75rem), 1.3, max 30ch): Masthead statement.
- **Title** (Sans 600, 1.5rem, -0.02em): Section h2s.
- **Body** (Sans 400, 1rem, 1.6, max 58ch): Masthead sub-line; hints and repo descriptions use 0.875rem.
- **Code** (Mono 400, 0.875rem, 1.7): Role source lines, notes, education, contact labels, repo names and meta. The current role steps up to 1rem, its title to 1.15em at weight 600.
- **Button** (Sans 500, 0.9375rem): All buttons.

### Named Rules
**The Machine Voice Rule.** If a string is something a tool would print (a role, a location, a degree, a note, a repo name), set it in Geist Mono. If a person would read it as prose, set it in Geist.

**The One Pixel Rule.** The dot-matrix face appears once, on the name. A second use would turn identity into decoration.

## Layout

Single centered column, max-width 68rem, padding clamp(2.5rem, 7vw, 5.5rem) top and clamp(1.25rem, 5vw, 4rem) sides, 7rem at the bottom. Section order: masthead, Experience, Publications, Education, Open source, footer. Sections are separated by clamp(3.5rem, 8vw, 6rem). Role blocks stack in a grid with 2.25rem gaps. Publications are a two-column grid (year column, then title over authors and venue). Open source cards sit in a 2-column grid with 1rem gaps and collapse to one column below 640px. The footer holds the signature and actions on one row, then Contact and a "For agents" list in a 1.4fr / 1fr grid that stacks below 800px. Contact rows use a 5.5rem label column and collapse below 640px. Role heads wrap at 640px with the level label on its own line. Source lines use a `3ch 1fr` grid: a right-aligned line-number gutter closed by a 1px hairline, then 1.5ch of padding. Notes indent 3ch to align with the code.

## Elevation & Depth

Flat. No box-shadows on the portfolio surface. Depth is tonal (page, elevated hover) and drawn with 1px hairlines. State is shown by fill shifts and underlines, and focus by an outline. The one blur on the page is the one-shot name entrance.

### Named Rules
**The Flat-By-Default Rule.** Nothing casts a shadow. A new surface separates itself with a hairline or a tonal step.

## Shapes

Small, precise corners: 6px for buttons, 8px for repo cards, 3px for key-hint chips, 2px for the role-head focus target. Lines over containers: hairline rules and underlines carry structure everywhere except Open source, where a hairline card is the single container. Annotated spans use a wavy 1.5px underline at 5px offset; links use a straight underline at 4px offset.

## Components

### Buttons
- **Shape:** 6px radius, 44px minimum height (2.75rem), 0 1.25rem padding, Sans 500 at 0.9375rem.
- **Primary:** Bright-text (#ededed) fill and border, black text (Download CV). Hover goes to pure white.
- **Secondary / Ghost:** Transparent, 1px strong-hairline border, body text. Hover fills with elevated ink and brightens text (Email, Back to top). Profile links (GitHub, LinkedIn, Scholar) are borderless ghosts with a leading brand icon.
- **Focus:** 2px blue outline, 3px offset, no shadow, on all buttons and links.

### Role Diagnostic (signature)
- **Head:** Full-width ghost button, 44px tall, with an optional blue `current` level label, bold title, a hover-only numeric key hint chip (hidden on touch), and a chevron that rotates -90deg when collapsed (200ms).
- **Location line:** Dim `-->` arrow, organisation (underlined in strong hairline, blue on hover), then place and date.
- **Source lines:** Numbered gutter with hairline, then the highlight text. Annotated spans get a wavy blue underline and bright text.
- **Notes:** `= note: span - explanation` lines and a final `= stack:` line, keys in blue 600, dim text. All roles are expanded on load; Keys 1 to 6 jump to a role.
- **Motion:** On the current role only, each line and note fades and rises 6px over 480ms, staggered 80ms per line after 150ms, under `prefers-reduced-motion: no-preference`.

### Name
- Real h1 text in Geist Pixel Circle, bright text, no animation tokens beyond a one-shot entrance: 700ms fade from 10px blur, exponential ease-out, gated on `prefers-reduced-motion: no-preference`; visible by default.

### Publications
- Year in dim Mono tabular numerals, then a medium-weight title linking to its DOI (strong-hairline underline, blue on hover), with authors and venue beneath in dim 0.875rem. A "Full list on Google Scholar" hint closes the list.

### Repo card
- Whole card is one link: 1px strong-hairline border, 8px radius, 1.25rem padding. Mono 600 repo name, muted description, then language and star count in dim Mono pinned to the bottom. Hover fills with elevated ink and brightens the border; no shadow, no icon-heading-text trio.

### Footer
- 1px hairline top rule. Handwritten signature image (decorative contrast to the pixel name), Download CV and Back to top buttons, the Contact list, and a "For agents" list of Markdown, llms.txt and Sitemap links. Back to top scrolls smoothly under `prefers-reduced-motion: no-preference`. The closing line states there are no cookies, analytics or tracking, which is true.

### Links
- Bright text, strong-hairline underline at 4px offset; hover moves the underline to blue. Contact and footer links pad to a 44px hit area.

### Contact
- List of 44px rows, each a brand icon (1.125rem, dim), a Mono dim label, and a Sans link underlined in strong hairline. Hover turns icon and label blue and the link text bright.

## Do's and Don'ts

### Do:
- **Do** keep signal blue as the single accent and use it for interaction, focus, and annotation only; keep the primary action white.
- **Do** set machine-printed strings in Geist Mono and prose in Geist.
- **Do** keep every text token at or above 7:1 (WCAG AAA) on #000000.
- **Do** give every interactive target at least 44px (2.75rem) of height, padding the hit area when the visible text is smaller.
- **Do** separate surfaces with a 1px hairline or a tonal step, and keep the surface flat.
- **Do** keep the name as real h1 text so it stays readable without styles and by agents.
- **Do** gate any new motion on `prefers-reduced-motion: no-preference`, and keep the two authored entrances (the staggered current-role lines and the one-shot name blur-in) the only ones.
- **Do** use the 2px blue outline at 3px offset for focus on every new control.
- **Do** change content in `data.ts`, `publications.ts` or `projects.ts` and rebuild: the page, `index.md` and the JSON-LD are generated from them.

### Don't:
- **Don't** add shadows, skill bars, or a hero-and-cards layout. The repo card is the only container pattern.
- **Don't** introduce a second accent hue; the legacy blue and green terminal tokens that remain in src/index.css are not part of this system.
- **Don't** use the pixel face for anything but the name.
- **Don't** claim a feature the build lacks: annotations restate facts already in the role's highlights.
- **Don't** hard-code new colors in components; reference the palette tokens.
- **Don't** use text below the Legible Ladder to signal de-emphasis.

---
name: Theodoros Psallidas Portfolio
description: A senior engineer's portfolio set as compiler diagnostics on a cool near-black page, with one amber voice.
colors:
  amber: "#f0b04a"
  amber-hover: "#f6c26b"
  ink-base: "#0b0c0e"
  ink-surface: "#0f1115"
  ink-elevated: "#14161b"
  hairline: "#242832"
  hairline-strong: "#343945"
  text-primary: "#f4f4f5"
  text-secondary: "#d6d6db"
  text-muted: "#b0b0ba"
  text-dim: "#a0a0ab"
  text-faint: "#9d9da8"
typography:
  name:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "clamp(2.25rem, 7vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.04em"
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
  md: "4px"
  window: "6px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2.25rem"
  section: "clamp(3.5rem, 8vw, 6rem)"
  tap: "2.75rem"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink-base}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 1.25rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.amber-hover}"
    textColor: "{colors.ink-base}"
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
  dock-prompt:
    backgroundColor: "{colors.ink-surface}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
    height: "3rem"
  role-line:
    textColor: "{colors.text-secondary}"
    typography: "{typography.code}"
---

# Design System: Theodoros Psallidas Portfolio

## Overview

**Creative North Star: "The Compiler Diagnostics"**

The page reads the way a compiler reports on a codebase: each job is a diagnostic block, its highlights are numbered source lines, and the phrases that matter are underlined and explained by `= note:` lines beneath. The world's own materials are used natively: monospace, a line-number gutter with a hairline, a `-->` location arrow, wavy underlines, and `= note:` / `= stack:` keys. The current role opens first and is the only block that moves.

The surface is cool near-black with a single amber accent. Everything else is grayscale text that clears 7:1 (WCAG AAA) on the page background. Density is calm: a 68rem column, generous section gaps, no cards, no shadows. It rejects the generic template portfolio (hero, cards, skill bars), hacker green-on-black, and flashy motion, per PRODUCT.md.

**Key Characteristics:**
- One accent (amber) on cool near-black; rarity is the point.
- Geist Mono carries identity and anything code-like; Geist carries reading and UI.
- Flat, hairline-bounded, tonal depth only.
- Terminal motifs behave truthfully; the shell below is real and mounts only when opened.
- 44px minimum tap targets, visible amber focus ring, motion gated on reduced-motion preference.

## Colors

A single amber voice over cool near-black, with a five-step gray text ladder.

### Primary
- **Signal Amber** (#f0b04a): Primary button fill, wavy annotation underlines, `note:` and `stack:` keys, the `current` level label, focus ring, shell prompt arrow, inline "Close shell" action, link underlines, text selection tint (32% alpha).
- **Lifted Amber** (#f6c26b): Primary button hover only.

### Neutral
- **Cool Near-Black** (#0b0c0e): Page background; also the text color on amber.
- **Shell Body** (#0f1115): Dock prompt and shell window fill.
- **Elevated Ink** (#14161b): Hover fill for ghost buttons and dock prompt.
- **Hairline** (#242832): Shell window and dock prompt border.
- **Strong Hairline** (#343945): Secondary button border, gutter rule, key-hint chip border, scrollbar thumb.
- **Bright Text** (#f4f4f5): Name, headings, role titles, marked spans.
- **Body Text** (#d6d6db): Default reading color and source lines.
- **Muted Text** (#b0b0ba): Masthead sub-line.
- **Dim Text** (#a0a0ab): Hints, locations, level label on non-current roles, contact labels.
- **Faint Text** (#9d9da8): Line numbers, `=` glyphs, key hints. Measures 7.29:1, above the 7:1 AAA floor; "faint" is hierarchy, not low contrast.

### Named Rules
**The One Voice Rule.** Amber is the only chromatic color. It marks interaction, focus, and annotation. Never use it as decoration or as a fill on more than the single primary action.

**The Legible Ladder Rule.** Every text token must hold at least 7:1 (WCAG AAA) on the page background; the faintest step measures 7.29:1. Hierarchy comes from steps in this ladder and from weight, never from dropping below it.

## Typography

**Display Font:** Geist Mono (with ui-monospace, SF Mono, Menlo fallbacks)
**Body Font:** Geist (with ui-sans-serif, system-ui fallbacks)
**Label/Mono Font:** Geist Mono

**Character:** Mono for the things a machine would print (name, roles, education, source lines, shell); a neutral grotesque for prose and controls. Loaded from Google Fonts at weights 400, 500, 600.

### Hierarchy
- **Name** (Mono 500, clamp(2.25rem, 7vw, 5rem), 1.02, -0.04em): The h1 only.
- **Headline** (Sans 500, clamp(1.25rem, 2.6vw, 1.75rem), 1.3, max 30ch): Masthead statement.
- **Title** (Sans 600, 1.5rem, -0.02em): Section h2s.
- **Body** (Sans 400, 1rem, 1.6, max 58ch): Masthead sub-line; hints use 0.875rem.
- **Code** (Mono 400, 0.875rem, 1.7): Role source lines, notes, education, contact labels. The current role steps up to 1rem, its title to 1.15em at weight 600.
- **Button** (Sans 500, 0.9375rem): All buttons.

### Named Rules
**The Machine Voice Rule.** If a string is something a tool would print (a role, a location, a degree, a note), set it in Geist Mono. If a person would read it as prose, set it in Geist.

## Layout

Single centered column, max-width 68rem, padding clamp(2.5rem, 7vw, 5.5rem) top and clamp(1.25rem, 5vw, 4rem) sides, 7rem at the bottom. Sections are separated by clamp(3.5rem, 8vw, 6rem). Role blocks stack in a grid with 2.25rem gaps. Education and Contact sit side by side (1.4fr / 1fr, 4rem gap) and stack below 800px. Contact rows use a 6rem label column and collapse to one column below 640px. Role heads wrap at 640px with the level label on its own line. Source lines use a `3ch 1fr` grid: a right-aligned line-number gutter closed by a 1px hairline, then 1.5ch of padding. Notes indent 3ch to align with the code.

## Elevation & Depth

Flat. No box-shadows in the portfolio surface. Depth is tonal (page, shell body, elevated hover) and drawn with 1px hairlines. State is shown by fill shifts and underlines, and focus by an outline.

### Named Rules
**The Flat-By-Default Rule.** Nothing casts a shadow. A new surface separates itself with a hairline or a tonal step.

## Shapes

Small, precise corners: 4px for buttons and the dock prompt, 3px for key-hint chips, 2px for role-head focus target, 6px for the shell window. Lines over containers: hairline rules and underlines carry structure instead of cards. Annotated spans use a wavy 1.5px underline at 5px offset; links use a straight underline at 4px offset.

## Components

### Buttons
- **Shape:** 4px radius, 44px minimum height (2.75rem), 0 1.25rem padding, Sans 500 at 0.9375rem.
- **Primary:** Amber fill, amber border, near-black text (Download CV). Hover lifts to #f6c26b.
- **Secondary / Ghost:** Transparent, 1px strong-hairline border, body text. Hover fills with elevated ink and brightens text (Email, Open shell).
- **Focus:** 2px amber outline, 3px offset, no shadow, on all buttons and links in the page.
- **Inline action:** Borderless amber text button with 44px height (Close shell).

### Role Diagnostic (signature)
- **Head:** Full-width ghost button, 44px tall, with an optional amber `current` level label, bold title, a hover-only numeric key hint chip (hidden on touch), and a chevron that rotates -90deg when collapsed (200ms).
- **Location line:** Dim `-->` arrow, organisation (underlined in strong hairline, amber on hover), then place and date.
- **Source lines:** Numbered gutter with hairline, then the highlight text. Annotated spans get a wavy amber underline and bright text.
- **Notes:** `= note: span - explanation` lines and a final `= stack:` line, keys in amber 600, dim text. Only the current role is open on load.
- **Motion:** On the current role only, each line and note fades and rises 6px over 480ms, staggered 80ms per line after 150ms, under `prefers-reduced-motion: no-preference`. No other entrance motion exists.

### Links
- Bright text, amber underline at 4px offset; hover turns the text amber. Contact links pad to a 44px hit area.

### Education and Contact
- Education rows: Mono, bright bold degree at 1rem, school and thesis at 0.875rem.
- Contact: definition list, Mono dim labels, Sans links.

### Shell Dock
- Closed: a full-width ghost prompt (amber `❯`, Mono, "try ps, help or cat about.md") on the shell-body fill with a hairline border, 48px minimum height.
- Open: the shell window (6px radius, hairline, shell-body fill, height min(72vh, 40rem)) mounts in place; it is unmounted until opened and can be closed again.

## Do's and Don'ts

### Do:
- **Do** keep amber as the single accent and use it for interaction, focus, and annotation only.
- **Do** set machine-printed strings in Geist Mono and prose in Geist.
- **Do** keep every text token at or above 7:1 (WCAG AAA) on #0b0c0e.
- **Do** give every interactive target at least 44px (2.75rem) of height, padding the hit area when the visible text is smaller.
- **Do** separate surfaces with a 1px hairline or a tonal step, and keep the surface flat.
- **Do** gate any new motion on `prefers-reduced-motion: no-preference`, and keep the staggered current-role entrance the only entrance.
- **Do** use the 2px amber outline at 3px offset for focus on every new control.

### Don't:
- **Don't** add shadows, cards, skill bars, or a hero-and-cards layout.
- **Don't** introduce a second accent hue; the blue and green shell-prompt tokens are not part of this system.
- **Don't** claim a feature the build lacks: annotations restate facts already in the role's highlights, and the shell must behave for real.
- **Don't** hard-code new colors in components; reference the palette tokens.
- **Don't** use text below the Legible Ladder to signal de-emphasis.

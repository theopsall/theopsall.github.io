# src/components/Terminal/ — Structure Map

> Universal rules: see `src/components/CLAUDE.md`.
> This file covers Terminal-specific layout only.

## Directory tree

```
Terminal/
  index.tsx                    # docked shell window; mounted by Portfolio/ShellDock
  constants.ts                 # shared constants (commands list, paths, etc.)
  types.ts                     # shared TypeScript types
  hooks/                       # hooks shared across Terminal sub-components
    useTabs.ts
    useArticles.ts
  components/
    TabBar/
      index.tsx
    BannerTitle/
      index.tsx
    BlogCatOutput/
      index.tsx
    P10kPrompt/
      index.tsx
    ShellTab/
      index.tsx                # render only
      hooks/
        useShell.ts            # shell state machine
        useCommands.ts         # command orchestrator (calls registry)
        useCommandRegistry.ts  # command map / definitions
        useCompletions.ts      # ghost/autocomplete suggestions
    ArticleTab/
      index.tsx
      hooks/
        useArticleContent.ts
```

## Rules specific to Terminal

- **Cross-cutting hooks** (used by multiple sub-components) live in `Terminal/hooks/`.
- **Component-specific hooks** live inside that component's own `hooks/` subdir.
- `constants.ts` and `types.ts` are shared modules — not components, no 200-line rule applies, but keep them focused and split if they grow unwieldy.
- Sub-components in `Terminal/components/<Name>/` must NOT import from sibling sub-components — route shared data through the parent `Terminal/index.tsx` via props.

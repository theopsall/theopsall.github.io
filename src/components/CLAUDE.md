# src/components/ — Component Authoring Rules

> These rules apply to every component in this directory and all subdirectories.
> They do NOT apply to `src/components/ui/` (shadcn vendored primitives).

## Directory structure

Every component is a directory with an `index.tsx` as its public API:

```
ComponentName/
  index.tsx           # default export — render only
  hooks/
    useComponentName.ts   # logic, state, effects
    useOtherConcern.ts    # one concern per hook
  components/         # sub-components (same rules apply recursively)
    SubName/
      index.tsx
      hooks/
        useSubName.ts
```

## Naming

- Component directory: `PascalCase` (e.g. `ShellTab/`)
- Hook files: `camelCase`, always prefixed with `use` (e.g. `hooks/useShell.ts`)
- Sub-component dirs follow the same `PascalCase` convention

## index.tsx — render only

A component's `index.tsx` **must not** contain:
- `useState`, `useEffect`, `useReducer`, `useMemo`, `useCallback`
- Data fetching or side-effect logic
- Inline business logic handlers

Handlers in `index.tsx` must be thin wrappers that call into hook-returned functions:

```tsx
// correct
const { items, handleSelect } = useMyHook();
return <Button onClick={handleSelect}>Go</Button>;

// wrong — logic inside the component
const [items, setItems] = useState([]);
useEffect(() => { fetch('/api').then(r => setItems(r)); }, []);
```

`useRef` for DOM handles is the only exception allowed in `index.tsx`.

## Hooks

- One concern per hook — prefer many small hooks over one large one.
- Hook filenames must match the exported function name: `hooks/useShell.ts` exports `useShell`.
- Hooks accept props/config as arguments; they return state + handlers.

## Size limit

**200 lines maximum** per `.tsx` or `.ts` file (blank lines and imports included).
Split a file the moment it approaches this limit — do not wait until after.

## No raw HTML interactive elements

Never write:
```tsx
<button>, <input>, <select>, <textarea>, <dialog>, <a>
```

Use the shadcn/ui equivalent from `@/components/ui/*` instead:

| Raw HTML | shadcn replacement |
|----------|--------------------|
| `<button>` | `<Button>` from `@/components/ui/button` |
| `<input>` | `<Input>` from `@/components/ui/input` |
| `<select>` / `<option>` | `<Select>` from `@/components/ui/select` |
| `<textarea>` | `<Textarea>` from `@/components/ui/textarea` |
| `<dialog>` | `<Dialog>` from `@/components/ui/dialog` |
| `<a>` (navigational) | wrap with shadcn `Button variant="link"` or a custom `Link` wrapper |
| Tab strip | `<Tabs>` / `<TabsList>` / `<TabsTrigger>` |
| Divider line | `<Separator>` |
| Scroll container | `<ScrollArea>` |
| User avatar | `<Avatar>` / `<AvatarImage>` / `<AvatarFallback>` |

Pure layout `div` / `span` / `section` / `header` / `ul` / `li` / `p` are **allowed only** when:
- they are a direct flex/grid layout wrapper around shadcn primitives, OR
- they carry no interactive behaviour and no visual styling beyond Tailwind layout classes.

## Adding new shadcn primitives

Before installing a new shadcn component, query context7:
1. `mcp__plugin_context7_context7__resolve-library-id` with `"shadcn/ui"`
2. `mcp__plugin_context7_context7__query-docs` — ask for the specific component's install command

Run the install from the project root: `npx shadcn@latest add <name>`

## Before non-trivial changes

Invoke skills:
- `pf-frontend-react:react-best-practices`
- `vercel-react-best-practices`

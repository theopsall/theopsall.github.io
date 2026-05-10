# src/ — Import & Placement Rules

## Path alias

`@/` resolves to `src/`. Always use `@/` for cross-directory imports — never use `../../` relative paths.

```ts
// correct
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useShell } from '@/components/Terminal/components/ShellTab/hooks/useShell';

// wrong
import { cn } from '../../lib/utils';
```

## Component placement

| Type | Location |
|------|----------|
| Generic / reusable | `src/components/<Name>/` |
| Feature-specific child | `src/components/<Feature>/components/<Name>/` |
| shadcn primitives | `src/components/ui/` (vendored — do not hand-edit) |

## shadcn imports

Always import from `@/components/ui/<primitive>` (kebab-case filename):

```ts
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
```

## cn() utility

Use `cn()` from `@/lib/utils` for all conditional class merging — never concatenate Tailwind strings manually.

```ts
import { cn } from '@/lib/utils';
<div className={cn('base-class', isActive && 'active-class')} />
```

## Shared hooks

Hooks used across multiple components live in `src/hooks/`. Component-specific hooks live inside the component's own `hooks/` subdirectory.

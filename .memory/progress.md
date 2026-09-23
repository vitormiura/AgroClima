# AgroClima Memory

## Current State
- Phase 1 bootstrap is complete in the workspace root.
- `npm run lint` passes.
- `npm run build` passes.
- The temporary nested scaffold folder was removed.

## Important Files
- `PROJECT.md` is the source of truth for the implementation plan.
- `README.md` still documents the project and can be updated later when behavior changes.
- `package.json` declares `engines.node = 24.19.x` and the current scripts.
- `src/app/layout.tsx`, `src/app/page.tsx`, and `src/app/globals.css` contain the initial UI shell.
- `src/components/ui/button.tsx` is the first shadcn-style UI primitive.
- `components.json` configures the shadcn aliases.
- `.gitattributes` enforces LF line endings for the repository.

## Environment Notes
- On this Windows machine, Node must be enabled in PowerShell with:
  `$env:PATH = "C:\Users\BRMOU319899\tools\node;$env:PATH"`
- Then alias npm/npx to the `.cmd` shims:
  `Set-Alias npm npm.cmd`
  `Set-Alias npx npx.cmd`
- After that, `node -v`, `npm -v`, and `npx -v` work normally.

## Decisions
- The project uses the `src/` directory structure.
- shadcn/ui was included from the bootstrap phase.
- The initial Tailwind v4 scaffold was replaced with Tailwind v3 plus standard PostCSS because v4 caused build issues in this environment.
- The UI baseline is intentionally minimal and mobile-first.

## Validation History
- `npm run lint` passed after setup.
- `npm run build` passed after normalizing encoding and switching the styling stack.
- Git line-ending warnings were resolved with `.gitattributes`.

## Next Steps
1. Implement location search.
2. Add browser geolocation.
3. Store the last selected location in `localStorage`.
4. Start the weather provider normalization layer.

## Resume Rule
- To continue on another machine, read `PROJECT.md` first and then this `.memory` file.
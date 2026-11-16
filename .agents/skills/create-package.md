# Skill: Create New Monorepo Package

## Description
Use this skill to create a new shared internal package inside `/packages`. 

## Workflow
1. Ask the user for the exact package name.
2. Create `packages/<name>/` with a `src/` directory, `package.json`, `tsconfig.json`, and `index.ts`.
3. Set the package name to `@shipforge/<name>`.
4. Export the package's public API from `index.ts` (or `src/index.ts`).
5. Run the package manager install command from the monorepo root to link the workspace.
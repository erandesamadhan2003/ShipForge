# ShipForge Agent Instructions

## Role
You are an expert full-stack and DevOps engineer working on the ShipForge monorepo.
ShipForge is a self-hosted developer deployment platform utilizing a modular monolith backend, separate asynchronous workers, and a React/Vite frontend.

## Architecture & Packages
The project strictly follows a monorepo structure. Do not introduce microservices.

**Shared Packages (`packages/`):**
- `packages/database/`: Contains the pure PostgreSQL database connection pool (`pg`). All database access must route through here using raw SQL queries. Do not use Prisma or ORMs.
- `packages/types/`: Contains global domain types (e.g., `user.ts`, `project.ts`) shared across the frontend and backend.
- `packages/config/`: Contains strict environment variable validation (`env.ts`) and global constants (`constants.ts`).
- `packages/shared/`: Contains shared cross-platform utilities and helpers.

## Universal Coding Rules
1. **Strict TypeScript:** Never use `any`.
2. **File-Level Interfaces:** Interfaces specific to a single class or function must be written directly inside that file (e.g., `interface CreateUserDTO` inside `.service.ts`, or database payload interfaces inside `.repository.ts`).
3. **Module-Level Types:** Types/Enums shared across a specific backend module must be placed in that module's `.types.ts` file.
4. **Global Types:** Types shared across the entire monorepo (frontend and backend) must be placed in `packages/types/src/`.
5. **Validation:** All Zod schemas for a module must be placed in a dedicated `.validation.ts` file within that module.
6. **Database Access:** Must go through `@shipforge/database` executing pure, parameterized SQL queries. 
7. **Environment Variables:** Use `packages/config/src/env.ts` for validating all environment variables. Never hardcode secrets.
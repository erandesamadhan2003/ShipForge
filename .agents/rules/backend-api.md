---
trigger: "When editing files in services/api/ or building Express routes and controllers"
---

# ShipForge Backend API Rules

## Architecture
Organize backend functionality by domain directly inside the modules directory (no `src/` wrapper):
`services/api/modules/<domain>/`

## Strict Module Structure
Every module must strictly follow this exact file structure:
1. `<module>.controller.ts`: Handles HTTP input, calls validation, calls the service, and formats the HTTP response using standard success functions (`sendOK`, `sendCreated`).
2. `<module>.service.ts`: Contains core business logic. **Must include its own specific input/output interfaces at the top of the file.**
3. `<module>.repository.ts`: Handles database calls using native PostgreSQL queries via `@shipforge/database`. **Must include its own specific interfaces at the top of the file.**
4. `<module>.routes.ts`: Defines Express routes and attaches Zod validation middlewares and the `asyncHandler`.
5. `<module>.validation.ts`: Contains all Zod schemas for validating incoming requests (`req.body`, `req.query`, etc.).
6. `<module>.types.ts`: Contains specific types and enums shared across the module's controller, service, and repository.

## Rule Enforcement
- Do not duplicate Zod schemas inside controllers.
- Do not put global domain types in `.types.ts`. Global types belong in `packages/types/`.
- Use centralized `asyncHandler` rather than repetitive `try/catch` blocks in every controller.
- Background jobs (Docker builds, deployments) must be queued to BullMQ, never executed in the HTTP request cycle.
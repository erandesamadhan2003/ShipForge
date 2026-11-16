# Skill: Create API Module

## Description
Use this skill to scaffold a new domain module inside `services/api/modules/` adhering to the strict ShipForge architecture.

## Workflow
1. Ask the user for the plural name of the module (e.g., `projects`, `webhooks`).
2. Verify that `services/api/modules/<name>` does not exist.
3. Create the directory and the following files inside it:
   - `<name>.routes.ts`: Defines Express routes.
   - `<name>.controller.ts`: Handles HTTP request/response wrapped in `asyncHandler`.
   - `<name>.service.ts`: Core business logic. Write service-specific interfaces at the top of this file.
   - `<name>.repository.ts`: Pure PostgreSQL database access. Write repository-specific interfaces at the top of this file.
   - `<name>.validation.ts`: Export Zod schemas for validating request payloads.
   - `<name>.types.ts`: Export enums or types shared strictly within this module.
4. Ensure the routes file is properly typed and exports an Express router.
5. Remind the user to mount this new router in the main `services/api/app.ts`.
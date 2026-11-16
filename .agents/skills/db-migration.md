# Skill: Database Migration

## Description
Use this skill when the pure PostgreSQL database schema changes and a new SQL migration file needs to be generated. Database migrations are potentially destructive. Never apply a migration automatically.

## Workflow
1. Read the existing SQL files in `packages/database/migrations/` to understand the current schema.
2. Explain to the user exactly what tables or fields are being added, modified, or removed.
3. After user approval, navigate to `packages/database/migrations/` and create a new sequentially numbered SQL file (e.g., `003_add_new_table.sql`).
4. Write pure, valid PostgreSQL DDL statements in the file.
5. Remind the user to run their database migration script (e.g., `npm run db:migrate`) to apply the changes to their local database.
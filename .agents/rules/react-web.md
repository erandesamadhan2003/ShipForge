---
trigger: "When editing files in apps/dashboard/ or writing React frontend components"
---

# ShipForge Dashboard Rules

## Framework
The dashboard strictly uses React, TypeScript, Vite, React Router, and Tailwind CSS.
*Do NOT use Next.js or React Server Components.*

## Architecture
- **Components:** Use functional components. Keep UI components reusable.
- **API Calls:** Centralize all HTTP communication in `apps/dashboard/src/api/`. Do not call `fetch()` directly from UI components.
- **Validation:** Import Zod schemas from the backend modules or shared packages for form validation.
- **Types:** Import global domain interfaces directly from `@shipforge/types`.
- **WebSockets:** Use centralized WebSocket clients for deployment status and build logs to prevent aggressive polling.
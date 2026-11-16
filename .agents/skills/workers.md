# ShipForge Worker Rules

## Architecture
Workers (`build-worker`, `deployment-worker`, `cleanup-worker`) are isolated Node.js processes. They do not serve HTTP traffic. They only consume BullMQ jobs from Redis.

## Job Processing Rules
- **No In-Memory State:** Workers can be scaled horizontally. Never rely on in-memory arrays or objects to share state between jobs.
- **Graceful Shutdown:** Always handle `SIGTERM` and `SIGINT` to pause BullMQ queues and let active jobs finish before exiting.
- **Idempotency:** Jobs must be idempotent. If a worker crashes halfway through a deployment, restarting the job must be safe and not result in duplicated resources.

## Communication
- Workers communicate progress back to the API/Dashboard using Redis Pub/Sub or by updating the database via `@ShipForge/database`.
- Do not write direct WebSocket servers inside the workers. The API handles WebSocket connections.

## Error Handling
- Use BullMQ's built-in retry mechanisms for transient network failures (e.g., pulling a Docker image fails).
- Fatal errors (e.g., invalid Dockerfile) must permanently fail the job and log the exact reason to the database so the user can see it in the dashboard.
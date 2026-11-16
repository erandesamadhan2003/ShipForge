import http from 'http';
import { env } from '@shipforge/config';
import { db } from '@shipforge/database';
import { app } from './app';

const PORT = env.PORT;

const server: http.Server = app.listen(PORT, async () => {
  console.log(`ShipForge API server running on port ${PORT}`);
  try {
    await db.query('SELECT 1');
    console.log('Successfully connected to PostgreSQL database.');
  } catch (error) {
    console.warn(
      'Warning: Could not connect to PostgreSQL database on startup:',
      error instanceof Error ? error.message : error
    );
    console.error('Exiting application due to database connection failure.');
    process.exit(1);
  }
});

let isShuttingDown = false;

const gracefulShutdown = (signal: string): void => {
  if (isShuttingDown) {
    return;
  }
  isShuttingDown = true;

  console.log(`Received ${signal}. Initiating graceful shutdown...`);

  const FORCE_SHUTDOWN_TIMEOUT_MS = 10000;
  const forceTimer = setTimeout(() => {
    console.error(
      `Could not close connections in time (${FORCE_SHUTDOWN_TIMEOUT_MS}ms). Forcefully shutting down.`
    );
    process.exit(1);
  }, FORCE_SHUTDOWN_TIMEOUT_MS);

  forceTimer.unref();

  const closeDatabase = async (): Promise<void> => {
    try {
      await db.end();
      console.log('Database connection pool successfully closed.');
    } catch (dbErr) {
      console.error('Error closing database pool:', dbErr);
    }
  };

  if (!server.listening) {
    closeDatabase().finally(() => process.exit(0));
    return;
  }

  server.close(async (err?: Error) => {
    if (err) {
      const code = (err as { code?: string })?.code;
      if (code !== 'ERR_SERVER_NOT_RUNNING') {
        console.error('Error during HTTP server shutdown:', err);
        process.exit(1);
      }
    }
    console.log('HTTP server successfully closed.');

    await closeDatabase();
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error('Unhandled Promise Rejection:', reason);
  gracefulShutdown('unhandledRejection');
});

export { server };
export default server;
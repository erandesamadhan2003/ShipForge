import express, { Application, Request, Response, NextFunction } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './utils/error';
import { sendOK } from './utils/responses';
import { authRoutes } from './modules/auth/auth.routes';
import { usersRoutes } from './modules/users/users.routes';

const app: Application = express();

// Standard middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  return sendOK(
    res,
    {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    'ShipForge API is healthy'
  );
});

// Domain API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

// 404 Catch-All Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
});

// Global Error Handler (must be registered last)
app.use(errorHandler);

export { app };
export default app;

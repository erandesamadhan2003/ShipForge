import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../utils/error';
import { HttpStatus } from '../utils/httpStatus';

export interface ErrorResponse {
  error: string;
  code: string;
  details?: unknown;
}

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    if (!err.isOperational) {
      console.error(`[AppError: Non-Operational] ${err.name} (${err.code}): ${err.message}`, err);
    }

    const payload: ErrorResponse = {
      error: err.message,
      code: err.code,
    };

    if (err.details !== undefined) {
      payload.details = err.details;
    }

    res.status(err.statusCode).json(payload);
    return;
  }

  console.error('[Unhandled Server Error]', err);

  const isDev = process.env.NODE_ENV === 'development';
  const errorMessage =
    isDev && err instanceof Error ? err.message : 'Internal Server Error';

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    error: errorMessage,
    code: 'INTERNAL_SERVER_ERROR',
  });
};

export default errorHandler;

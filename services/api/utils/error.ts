import { HttpStatus } from './httpStatus';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    code: string = 'INTERNAL_SERVER_ERROR',
    isOperational: boolean = true,
    details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request', details?: unknown) {
    super(message, HttpStatus.BAD_REQUEST, 'BAD_REQUEST', true, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', details?: unknown) {
    super(message, HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED', true, details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', details?: unknown) {
    super(message, HttpStatus.FORBIDDEN, 'FORBIDDEN', true, details);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', details?: unknown) {
    super(message, HttpStatus.NOT_FOUND, 'NOT_FOUND', true, details);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict', details?: unknown) {
    super(message, HttpStatus.CONFLICT, 'CONFLICT', true, details);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message = 'Unprocessable Entity', details?: unknown) {
    super(
      message,
      HttpStatus.UNPROCESSABLE_ENTITY,
      'UNPROCESSABLE_ENTITY',
      true,
      details
    );
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = 'Too Many Requests', details?: unknown) {
    super(
      message,
      HttpStatus.TOO_MANY_REQUESTS,
      'TOO_MANY_REQUESTS',
      true,
      details
    );
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error', details?: unknown) {
    super(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'INTERNAL_SERVER_ERROR',
      false,
      details
    );
  }
}

export class NotImplementedError extends AppError {
  constructor(message = 'Not Implemented', details?: unknown) {
    super(
      message,
      HttpStatus.NOT_IMPLEMENTED,
      'NOT_IMPLEMENTED',
      true,
      details
    );
  }
}

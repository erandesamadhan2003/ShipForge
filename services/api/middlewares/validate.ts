import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AnyZodObject } from 'zod';
import { BadRequestError } from '../utils/error';

export const validateBody = (schema: AnyZodObject): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issue = result.error.issues[0];
      const fieldPath = issue?.path.length ? `${issue.path.join('.')}: ` : '';
      const message = issue ? `${fieldPath}${issue.message}` : 'Validation error';
      next(new BadRequestError(message, result.error.format()));
      return;
    }
    req.body = result.data;
    next();
  };
};

export const validateQuery = (schema: AnyZodObject): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      const issue = result.error.issues[0];
      const fieldPath = issue?.path.length ? `${issue.path.join('.')}: ` : '';
      const message = issue ? `${fieldPath}${issue.message}` : 'Validation error';
      next(new BadRequestError(message, result.error.format()));
      return;
    }
    req.query = result.data;
    next();
  };
};

export const validateParams = (schema: AnyZodObject): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      const issue = result.error.issues[0];
      const fieldPath = issue?.path.length ? `${issue.path.join('.')}: ` : '';
      const message = issue ? `${fieldPath}${issue.message}` : 'Validation error';
      next(new BadRequestError(message, result.error.format()));
      return;
    }
    req.params = result.data;
    next();
  };
};

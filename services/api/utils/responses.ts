import { Response } from 'express';
import { HttpStatus } from './httpStatus';

export interface SuccessResponse<T = unknown> {
  success: true;
  message?: string;
  data?: T;
}

export const sendOK = <T = unknown>(
  res: Response,
  data?: T,
  message?: string
): Response => {
  const payload: SuccessResponse<T> = {
    success: true,
  };

  if (message !== undefined) {
    payload.message = message;
  }

  if (data !== undefined) {
    payload.data = data;
  }

  return res.status(HttpStatus.OK).json(payload);
};

export const sendCreated = <T = unknown>(
  res: Response,
  data?: T,
  message?: string
): Response => {
  const payload: SuccessResponse<T> = {
    success: true,
  };

  if (message !== undefined) {
    payload.message = message;
  }

  if (data !== undefined) {
    payload.data = data;
  }

  return res.status(HttpStatus.CREATED).json(payload);
};

export const sendNoContent = (res: Response): Response => {
  return res.status(HttpStatus.NO_CONTENT).send();
};

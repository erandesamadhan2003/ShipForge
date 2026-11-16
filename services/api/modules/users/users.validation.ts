import { z } from 'zod';

export const updateUserSchema = z.object({
  username: z.string().trim().min(2).max(50).optional(),
  email: z.string().trim().email('Invalid email address').optional(),
  avatar_url: z.string().url('Invalid avatar URL').optional(),
});

export const userIdParamSchema = z.object({
  id: z.string().uuid('Invalid user UUID'),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type UserIdParamSchema = z.infer<typeof userIdParamSchema>;

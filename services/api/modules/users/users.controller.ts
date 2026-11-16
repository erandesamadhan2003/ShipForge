import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { usersService, UsersService } from './users.service';
import { sendOK } from '../../utils/responses';
import { NotFoundError } from '../../utils/error';
import type { UpdateUserProfileDTO } from './users.types';

export class UsersController {
  constructor(private readonly service: UsersService = usersService) {}

  getProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const user = await this.service.getUserById(req.params.id);
    if (!user) {
      throw new NotFoundError(`User with ID ${req.params.id} not found`);
    }
    sendOK(res, user, 'User profile retrieved');
  });

  getCurrentUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = (req as Request & { user?: { id: string } }).user?.id ?? '';
    const user = await this.service.getCurrentUser(userId);
    sendOK(res, user, 'Current user retrieved');
  });

  updateProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const data = req.body as UpdateUserProfileDTO;
    const updated = await this.service.updateProfile(userId, data);
    sendOK(res, updated, 'User profile updated');
  });
}

export const usersController = new UsersController();
export default usersController;

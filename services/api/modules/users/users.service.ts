import type { User } from '@shipforge/types';
import { usersRepository, UsersRepository } from './users.repository';
import type { UpdateUserProfileDTO } from './users.types';
import { NotImplementedError } from '../../utils/error';

export class UsersService {
  constructor(private readonly repo: UsersRepository = usersRepository) {}

  /**
   * Retrieves a sanitized public user profile by UUID.
   */
  async getUserById(id: string): Promise<User | null> {
    const record = await this.repo.findById(id);
    if (!record) return null;

    return {
      id: record.id,
      github_id: record.github_id,
      username: record.username,
      email: record.email,
      avatar_url: record.avatar_url,
      created_at: record.created_at,
      updated_at: record.updated_at,
    };
  }

  /**
   * Retrieves the current authenticated user's profile.
   */
  async getCurrentUser(userId: string): Promise<User | null> {
    return this.getUserById(userId);
  }

  /**
   * Updates profile information for a user.
   */
  async updateProfile(_userId: string, _data: UpdateUserProfileDTO): Promise<User> {
    throw new NotImplementedError('UsersService.updateProfile not yet implemented');
  }
}

export const usersService = new UsersService();
export default usersService;

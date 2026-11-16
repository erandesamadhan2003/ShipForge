import { db } from '@shipforge/database';
import { NotImplementedError } from '../../utils/error';
import type { UserDBRecord, UpdateUserDBPayload } from './users.types';

export class UsersRepository {
  /**
   * Find user by primary UUID.
   */
  async findById(id: string): Promise<UserDBRecord | null> {
    const query = `
      SELECT id, github_id, username, email, avatar_url, created_at, updated_at
      FROM users
      WHERE id = $1
      LIMIT 1;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] ?? null;
  }

  /**
   * Find user by case-insensitive username.
   */
  async findByUsername(username: string): Promise<UserDBRecord | null> {
    const query = `
      SELECT id, github_id, username, email, avatar_url, created_at, updated_at
      FROM users
      WHERE LOWER(username) = LOWER($1)
      LIMIT 1;
    `;
    const result = await db.query(query, [username.trim()]);
    return result.rows[0] ?? null;
  }

  /**
   * Find user by GitHub account ID.
   */
  async findByGithubId(githubId: string): Promise<UserDBRecord | null> {
    const query = `
      SELECT id, github_id, username, email, avatar_url, created_at, updated_at
      FROM users
      WHERE github_id = $1
      LIMIT 1;
    `;
    const result = await db.query(query, [githubId]);
    return result.rows[0] ?? null;
  }

  /**
   * Update user profile fields.
   */
  async update(_id: string, _payload: UpdateUserDBPayload): Promise<UserDBRecord> {
    throw new NotImplementedError('UsersRepository.update not yet implemented');
  }
}

export const usersRepository = new UsersRepository();
export default usersRepository;

import { db } from '@shipforge/database';
import { NotImplementedError } from '../../utils/error';
import type {
  UserDBRecord,
  CreateUserWithPasswordDBPayload,
  AuthSessionDBRecord,
} from './auth.types';

export class AuthRepository {
  async findUserByEmail(email: string): Promise<UserDBRecord | null> {
    const query = `
      SELECT id, github_id, username, email, avatar_url, password_hash, created_at, updated_at
      FROM users
      WHERE LOWER(email) = LOWER($1)
      LIMIT 1;
    `;
    const result = await db.query(query, [email.trim()]);
    return result.rows[0] ?? null;
  }

  async findUserByUsername(username: string): Promise<UserDBRecord | null> {
    const query = `
      SELECT id, github_id, username, email, avatar_url, password_hash, created_at, updated_at
      FROM users
      WHERE LOWER(username) = LOWER($1)
      LIMIT 1;
    `;
    const result = await db.query(query, [username.trim()]);
    return result.rows[0] ?? null;
  }

  async createUserWithPassword(params: CreateUserWithPasswordDBPayload): Promise<UserDBRecord> {
    const query = `
      INSERT INTO users (username, email, password_hash, avatar_url)
      VALUES ($1, $2, $3, $4)
      RETURNING id, github_id, username, email, avatar_url, password_hash, created_at, updated_at;
    `;
    const values = [
      params.username.trim(),
      params.email.trim(),
      params.passwordHash,
      params.avatarUrl ?? null,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async findSessionByToken(_token: string): Promise<AuthSessionDBRecord | null> {
    throw new NotImplementedError('AuthRepository.findSessionByToken not yet implemented');
  }

  async createSession(_userId: string, _token: string): Promise<AuthSessionDBRecord> {
    throw new NotImplementedError('AuthRepository.createSession not yet implemented');
  }

  async deleteSession(_token: string): Promise<void> {
    throw new NotImplementedError('AuthRepository.deleteSession not yet implemented');
  }
}

export const authRepository = new AuthRepository();
export default authRepository;
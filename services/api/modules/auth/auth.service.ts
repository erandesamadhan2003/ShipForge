import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env, BCRYPT_SALT_ROUNDS } from '@shipforge/config';
import type { User } from '@shipforge/types';
import { authRepository, AuthRepository } from './auth.repository';
import type {
  SignupDTO,
  LoginDTO,
  AuthResponseDTO,
  AuthTokenPayload,
} from './auth.types';
import {
  ConflictError,
  UnauthorizedError,
  NotImplementedError,
} from '../../utils/error';

export class AuthService {
  constructor(private readonly repo: AuthRepository = authRepository) {}

  async signup(input: SignupDTO): Promise<AuthResponseDTO> {
    const existingByEmail = await this.repo.findUserByEmail(input.email);
    if (existingByEmail) {
      throw new ConflictError('A user with this email already exists');
    }

    const existingByUsername = await this.repo.findUserByUsername(input.username);
    if (existingByUsername) {
      throw new ConflictError('A user with this username already exists');
    }

    const passwordHash = await bcrypt.hash(input.password, BCRYPT_SALT_ROUNDS);

    const userRecord = await this.repo.createUserWithPassword({
      username: input.username,
      email: input.email,
      passwordHash,
    });

    const token = this.generateToken({
      userId: userRecord.id,
      email: userRecord.email,
      username: userRecord.username,
    });

    const user: User = {
      id: userRecord.id,
      github_id: userRecord.github_id,
      username: userRecord.username,
      email: userRecord.email,
      avatar_url: userRecord.avatar_url,
      created_at: userRecord.created_at,
      updated_at: userRecord.updated_at,
    };

    return { token, user };
  }

  async login(input: LoginDTO): Promise<AuthResponseDTO> {
    const userRecord = await this.repo.findUserByEmail(input.email);
    if (!userRecord || !userRecord.password_hash) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(input.password, userRecord.password_hash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = this.generateToken({
      userId: userRecord.id,
      email: userRecord.email,
      username: userRecord.username,
    });

    const user: User = {
      id: userRecord.id,
      github_id: userRecord.github_id,
      username: userRecord.username,
      email: userRecord.email,
      avatar_url: userRecord.avatar_url,
      created_at: userRecord.created_at,
      updated_at: userRecord.updated_at,
    };

    return { token, user };
  }

  private generateToken(payload: AuthTokenPayload): string {
    return jwt.sign(
      payload,
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions
    );
  }

  async loginWithGitHub(_code: string): Promise<never> {
    throw new NotImplementedError('AuthService.loginWithGitHub not yet implemented');
  }

  async logout(_token: string): Promise<void> {
    throw new NotImplementedError('AuthService.logout not yet implemented');
  }

  async getSession(_token: string): Promise<never> {
    throw new NotImplementedError('AuthService.getSession not yet implemented');
  }
}

export const authService = new AuthService();
export default authService;

import type { User } from '@shipforge/types';

// ============================================================================
// Database & Repository Types
// ============================================================================

export interface UserDBRecord {
  id: string;
  github_id: string | null;
  username: string;
  email: string | null;
  avatar_url: string | null;
  password_hash: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserWithPasswordDBPayload {
  username: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string | null;
}

export interface AuthSessionDBRecord {
  userId: string;
  token: string;
  expiresAt?: Date;
}

// ============================================================================
// Service DTOs (Data Transfer Objects)
// ============================================================================

export interface SignupDTO {
  email: string;
  password: string;
  username: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  user: User;
}

// ============================================================================
// Auth & Token Types
// ============================================================================

export interface AuthTokenPayload {
  userId: string;
  email: string | null;
  username: string;
}

export type AuthProvider = 'LOCAL' | 'GITHUB';

export interface User {
  id: string;
  github_id: string | null;
  username: string;
  email: string | null;
  avatar_url: string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

export type UserRole = 'OWNER' | 'ADMIN' | 'DEVELOPER' | 'VIEWER';

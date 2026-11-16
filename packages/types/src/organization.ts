import type { UserRole } from './user';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: UserRole;
  created_at: Date | string;
}

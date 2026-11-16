// ============================================================================
// Database & Repository Types
// ============================================================================

export interface UserDBRecord {
  id: string;
  github_id: string | null;
  username: string;
  email: string | null;
  avatar_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface UpdateUserDBPayload {
  username?: string;
  email?: string;
  avatar_url?: string;
}

// ============================================================================
// Service DTOs (Data Transfer Objects)
// ============================================================================

export interface UpdateUserProfileDTO {
  username?: string;
  email?: string;
  avatar_url?: string;
}

// ============================================================================
// Search & Filter Types
// ============================================================================

export interface UserSearchFilters {
  searchTerm?: string;
  limit?: number;
  offset?: number;
}

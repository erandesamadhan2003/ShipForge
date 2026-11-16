export const APP_NAME = 'ShipForge';

export const USER_ROLES = ['OWNER', 'ADMIN', 'DEVELOPER', 'VIEWER'] as const;

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const BCRYPT_SALT_ROUNDS = 10;

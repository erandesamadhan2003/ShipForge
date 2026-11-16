-- 002_add_local_auth.sql
-- Support local Email/Password authentication alongside GitHub OAuth

-- 1. Make github_id in users table nullable
ALTER TABLE users ALTER COLUMN github_id DROP NOT NULL;

-- 2. Add password_hash column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- 3. Add UNIQUE constraint to email column
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'uq_users_email'
    ) THEN
        ALTER TABLE users ADD CONSTRAINT uq_users_email UNIQUE (email);
    END IF;
END $$;

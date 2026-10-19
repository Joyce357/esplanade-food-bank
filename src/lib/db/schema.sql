-- =========================================================================
-- Esplanade Community Food Bank - Secure Database Schema Architecture
-- Production target: PostgreSQL 15+ (e.g. Supabase, Neon, AWS RDS)
-- MANDATORY: Connections must enforce TLS/SSL (sslmode=require or sslmode=verify-full)
-- =========================================================================

-- Enable UUID extension if not already loaded
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -------------------------------------------------------------------------
-- 1. Contact Inquiries Table
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id VARCHAR(32) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  topic VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  status VARCHAR(20) NOT NULL DEFAULT 'new', -- 'new', 'in_progress', 'resolved', 'archived'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_inquiries(created_at);

-- -------------------------------------------------------------------------
-- 2. Volunteer Applications Table
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id VARCHAR(32) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  preferred_role VARCHAR(100) NOT NULL,
  notes TEXT,
  orientation_status VARCHAR(30) NOT NULL DEFAULT 'pending_orientation', -- 'pending_orientation', 'oriented', 'active', 'inactive'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_volunteer_email ON volunteer_applications(email);
CREATE INDEX IF NOT EXISTS idx_volunteer_status ON volunteer_applications(orientation_status);

-- -------------------------------------------------------------------------
-- 3. Confidential Food Assistance Intake Registry
-- RESTRICTED ACCESS: Contains sensitive household and dietary information
-- Access strictly limited to authorized intake coordinators via Row Level Security (RLS)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS food_assistance_intake (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id VARCHAR(32) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  household_size VARCHAR(50) NOT NULL,
  dietary_preferences TEXT[] DEFAULT '{}',
  contact_info VARCHAR(150) NOT NULL,
  consent_given BOOLEAN NOT NULL DEFAULT TRUE,
  status VARCHAR(30) NOT NULL DEFAULT 'pending_intake', -- 'pending_intake', 'consultation_scheduled', 'active_client', 'inactive'
  -- RETENTION POLICY PENDING CLIENT APPROVAL:
  -- Configurable via application variable INTAKE_RETENTION_MONTHS (recommended: 6, 12, or 24 months)
  -- Nullable by default until client formally approves specific retention duration.
  retention_until TIMESTAMPTZ,
  ip_hash VARCHAR(64), -- SHA-256 hashed IP to prevent correlation while allowing rate control
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_food_intake_ref ON food_assistance_intake(reference_id);
CREATE INDEX IF NOT EXISTS idx_food_intake_status ON food_assistance_intake(status);
CREATE INDEX IF NOT EXISTS idx_food_intake_retention ON food_assistance_intake(retention_until);

-- Enforce Strict Row Level Security (RLS)
ALTER TABLE food_assistance_intake ENABLE ROW LEVEL SECURITY;

-- Deny all public and unauthenticated access
REVOKE ALL ON food_assistance_intake FROM PUBLIC;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL ON food_assistance_intake FROM anon;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE ALL ON food_assistance_intake FROM authenticated;
  END IF;
END $$;

-- Policy: Restrict operations strictly to authorized internal backend service role
DROP POLICY IF EXISTS service_role_food_assistance ON food_assistance_intake;
CREATE POLICY service_role_food_assistance ON food_assistance_intake
  FOR ALL
  TO CURRENT_USER
  USING (true)
  WITH CHECK (true);

-- -------------------------------------------------------------------------
-- 4. Newsletter Subscribers Table (Persistent records with CASL opt-in audit)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'active', -- 'active', 'unsubscribed', 'bounced'
  opt_in_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  opt_in_consent_text TEXT NOT NULL DEFAULT 'Opt-in to monthly community harvest gazette via website banner',
  opt_in_ip_hash VARCHAR(64),
  unsubscribe_token VARCHAR(64) NOT NULL UNIQUE,
  unsubscribed_at TIMESTAMPTZ,
  unsubscribed_ip_hash VARCHAR(64),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_token ON newsletter_subscribers(unsubscribe_token);

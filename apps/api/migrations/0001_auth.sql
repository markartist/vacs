-- VACS authentication tables (magic links)

CREATE TABLE IF NOT EXISTS auth_magic_links (
  id TEXT PRIMARY KEY,
  token_hash TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT NOT NULL,
  request_ip TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_auth_magic_links_email ON auth_magic_links(email);
CREATE INDEX IF NOT EXISTS idx_auth_magic_links_expires ON auth_magic_links(expires_at);

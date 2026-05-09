CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) DEFAULT NULL,
  timezone VARCHAR(80) NOT NULL DEFAULT 'Europe/Warsaw',
  plan VARCHAR(40) NOT NULL DEFAULT 'pro',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE calendar_connections (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  provider ENUM('google','apple','outlook','microsoft365') NOT NULL,
  account_email VARCHAR(190) NOT NULL,
  access_token TEXT DEFAULT NULL,
  refresh_token TEXT DEFAULT NULL,
  sync_status VARCHAR(80) NOT NULL DEFAULT 'Not connected',
  is_primary TINYINT(1) NOT NULL DEFAULT 0,
  conflict_check TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_calendar_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE booking_pages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  title VARCHAR(160) NOT NULL,
  slug VARCHAR(120) NOT NULL UNIQUE,
  description TEXT DEFAULT NULL,
  brand_color VARCHAR(20) NOT NULL DEFAULT '#1f3b2e',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_pages_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE event_types (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  booking_page_id INT UNSIGNED DEFAULT NULL,
  name VARCHAR(160) NOT NULL,
  slug VARCHAR(120) NOT NULL,
  description TEXT DEFAULT NULL,
  duration_minutes SMALLINT UNSIGNED NOT NULL DEFAULT 30,
  price_cents INT UNSIGNED NOT NULL DEFAULT 0,
  currency CHAR(3) NOT NULL DEFAULT 'USD',
  meeting_mode ENUM('one_on_one','group','round_robin','collective') NOT NULL DEFAULT 'one_on_one',
  location_type ENUM('zoom','google_meet','teams','phone','in_person') NOT NULL DEFAULT 'zoom',
  deposit_required TINYINT(1) NOT NULL DEFAULT 0,
  max_attendees SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_user_event_slug (user_id, slug),
  CONSTRAINT fk_events_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_events_page FOREIGN KEY (booking_page_id) REFERENCES booking_pages(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE availability_rules (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  weekday TINYINT UNSIGNED NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_enabled TINYINT(1) NOT NULL DEFAULT 1,
  CONSTRAINT fk_availability_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE scheduling_settings (
  user_id INT UNSIGNED PRIMARY KEY,
  buffer_before_minutes SMALLINT UNSIGNED NOT NULL DEFAULT 15,
  buffer_after_minutes SMALLINT UNSIGNED NOT NULL DEFAULT 15,
  minimum_notice_hours SMALLINT UNSIGNED NOT NULL DEFAULT 2,
  max_advance_days SMALLINT UNSIGNED NOT NULL DEFAULT 60,
  daily_booking_limit SMALLINT UNSIGNED NOT NULL DEFAULT 6,
  weekly_booking_limit SMALLINT UNSIGNED NOT NULL DEFAULT 22,
  protect_focus_time TINYINT(1) NOT NULL DEFAULT 1,
  cap_back_to_back TINYINT(1) NOT NULL DEFAULT 1,
  energy_recommendations TINYINT(1) NOT NULL DEFAULT 1,
  CONSTRAINT fk_settings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE bookings (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  event_type_id INT UNSIGNED NOT NULL,
  guest_name VARCHAR(160) NOT NULL,
  guest_email VARCHAR(190) NOT NULL,
  guest_phone VARCHAR(80) DEFAULT NULL,
  starts_at DATETIME NOT NULL,
  ends_at DATETIME NOT NULL,
  timezone VARCHAR(80) NOT NULL,
  status ENUM('confirmed','cancelled','rescheduled','completed','no_show') NOT NULL DEFAULT 'confirmed',
  payment_status ENUM('not_required','pending','paid','refunded') NOT NULL DEFAULT 'not_required',
  meeting_url VARCHAR(255) DEFAULT NULL,
  cancel_token CHAR(64) NOT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bookings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_bookings_event FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE,
  INDEX idx_bookings_starts_at (starts_at),
  INDEX idx_bookings_token (cancel_token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE team_members (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(190) NOT NULL,
  role VARCHAR(80) NOT NULL DEFAULT 'Host',
  timezone VARCHAR(80) NOT NULL DEFAULT 'Europe/Warsaw',
  routing_weight SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  CONSTRAINT fk_team_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE integrations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  provider VARCHAR(80) NOT NULL,
  status ENUM('connected','not_connected','needs_attention') NOT NULL DEFAULT 'not_connected',
  settings_json JSON DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_user_provider (user_id, provider),
  CONSTRAINT fk_integrations_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

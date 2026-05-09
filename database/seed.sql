INSERT INTO users (id, name, email, password_hash, timezone, plan)
VALUES
  (1, 'Alex Morgan', 'alex@example.com', NULL, 'Europe/Warsaw', 'pro');

INSERT INTO booking_pages (id, user_id, title, slug, description, brand_color, is_active)
VALUES
  (1, 1, 'Alex Morgan Coaching', 'alex-coaching', 'Health and wellness sessions with a calmer booking flow.', '#1f3b2e', 1);

INSERT INTO scheduling_settings (user_id) VALUES (1);

INSERT INTO availability_rules (user_id, weekday, start_time, end_time, is_enabled)
VALUES
  (1, 1, '09:00:00', '12:00:00', 1),
  (1, 1, '13:30:00', '17:00:00', 1),
  (1, 2, '09:00:00', '17:00:00', 1),
  (1, 3, '09:00:00', '12:00:00', 1),
  (1, 4, '10:00:00', '16:00:00', 1),
  (1, 5, '09:00:00', '13:00:00', 1);

INSERT INTO event_types (id, user_id, booking_page_id, name, slug, description, duration_minutes, price_cents, meeting_mode, location_type, deposit_required, max_attendees)
VALUES
  (1, 1, 1, 'Discovery Call', 'discovery-call', 'A short intro to see if we are a fit.', 30, 0, 'one_on_one', 'zoom', 0, 1),
  (2, 1, 1, 'Health Coaching Session', 'health-coaching', 'Deep-dive coaching, plan, and accountability.', 60, 15000, 'one_on_one', 'google_meet', 1, 1),
  (3, 1, 1, 'Nutrition Consultation', 'nutrition-consultation', 'Personalized nutrition guidance.', 45, 12000, 'one_on_one', 'zoom', 1, 1),
  (4, 1, 1, 'Group Class - Mornings', 'group-class-mornings', 'Small group accountability session.', 45, 2500, 'group', 'teams', 0, 8);

INSERT INTO calendar_connections (user_id, provider, account_email, sync_status, is_primary, conflict_check)
VALUES
  (1, 'google', 'alex@example.com', 'Synced 2 min ago', 1, 1),
  (1, 'apple', 'alex@icloud.com', 'Synced 4 min ago', 0, 1);

INSERT INTO integrations (user_id, provider, status)
VALUES
  (1, 'zoom', 'connected'),
  (1, 'google_meet', 'connected'),
  (1, 'stripe', 'not_connected'),
  (1, 'paypal', 'not_connected'),
  (1, 'slack', 'not_connected'),
  (1, 'zapier', 'not_connected'),
  (1, 'make', 'not_connected'),
  (1, 'webhooks', 'not_connected');

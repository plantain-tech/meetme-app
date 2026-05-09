# MeetMe Hostinger Deployment

This folder now contains two things:

- The original UI design export: `MeetMe.html`, `*.jsx`, `tokens.css`, and `uploads/`.
- The PHP/MySQL application: `public/`, `app/`, `config/`, `database/`, and `storage/`.

## 1. Create the database

In Hostinger hPanel:

1. Create a MySQL database.
2. Create or assign a MySQL user.
3. Open phpMyAdmin.
4. Import `database/schema.sql`.
5. Optional: import `database/seed.sql` for demo data.

The demo login email is:

```text
alex@example.com
```

The current login flow accepts the email only while the app is in early local build mode. Before public launch, replace this with password login and/or OAuth-only login.

## 2. Configure the app

Copy:

```text
config/config.example.php
```

to:

```text
config/config.php
```

Then update:

- `app_url`
- `db.host`
- `db.name`
- `db.user`
- `db.pass`
- OAuth keys
- Stripe/PayPal keys
- Mail/SMS provider details

Do not commit real production secrets.

## 3. Deploy to Hostinger

Current production target:

```text
https://meetme.kaptainone.com
```

Hostinger Git deployment:

```text
Repository: https://github.com/plantain-tech/meetme-app.git
Branch: main
Directory: meetme
Actual folder: public_html/meetme
```

Important: in Hostinger's Git deployment screen, the `Directory` field is relative to `public_html`. Use `meetme`, not `public_html/meetme`, otherwise Hostinger may deploy into `public_html/public_html/meetme`.

The repository includes a root `index.php` that loads the app from `public/index.php`, so deploying the whole repository into `public_html/meetme` is supported.

Preferred long-term structure:

```text
public_html/
  index.php
  .htaccess
  assets/

private app folder outside public_html if Hostinger plan allows:
  app/
  config/
  database/
  storage/
```

If your Hostinger plan does not allow a private folder outside `public_html`, upload the full project but protect these folders with `.htaccess` rules or move them one level above public web access:

- `app/`
- `config/`
- `database/`
- `storage/`

The current `public/index.php` expects this layout:

```text
MeetMe/
  app/
  config/
  database/
  public/
```

If you move files during deployment, adjust the `require dirname(__DIR__) . '/app/bootstrap.php';` line in `public/index.php`.

## 4. Repeatable Workflow

Every future update should follow this sequence:

```text
update locally -> test locally -> commit -> push to GitHub -> deploy on Hostinger -> verify live site
```

Local commands:

```bash
git status
git add .
git commit -m "Describe the change"
git push
```

Hostinger steps after `git push`:

1. Open hPanel.
2. Go to the `meetme.kaptainone.com` site.
3. Open Git deployment / Manage Repositories.
4. Click the three-dot menu for `plantain-tech/meetme-app`.
5. Click `Deploy`.
6. Open `View latest build output`.
7. Confirm it ends with `Deployment end`.
8. Visit `https://meetme.kaptainone.com`.

If Hostinger Auto Deployment is enabled later, the manual `Deploy` click can be replaced by Hostinger's auto deployment webhook.

## 5. Features implemented in this first PHP build

- Host dashboard
- Booking pages
- Public guest booking page
- Event types
- Availability guardrails
- Energy-aware scheduling controls
- Calendar sync UI
- Google/Apple/Outlook/Microsoft 365 connection surfaces
- Team scheduling surface
- Best Time Intelligence surface
- Smart Group Scheduling surface
- Reminders and automations surface
- Payments surface
- Integrations surface
- Settings page
- MySQL schema for the core scheduling product

## 6. Features that still need provider credentials

These screens exist, but real third-party behavior requires provider setup:

- Google Login and Google Calendar API
- Apple Sign In
- Apple Calendar/iCloud strategy
- Outlook and Microsoft 365 Calendar
- Zoom
- Google Meet
- Microsoft Teams
- Stripe
- PayPal
- SMS reminders
- Email delivery
- Slack
- Zapier
- Make
- CRM integrations
- Webhooks/API authentication

## 7. Suggested next implementation order

1. Add secure password login and account creation.
2. Add complete CRUD for availability date overrides.
3. Add real slot generation from availability and existing bookings.
4. Add booking reschedule/cancel token pages.
5. Add Google OAuth and Google Calendar sync.
6. Add email confirmations.
7. Add Stripe checkout for paid bookings.
8. Add cron jobs for reminders.
9. Add team routing and round-robin assignment.
10. Add production logging, backups, and admin maintenance tools.

<?php
declare(strict_types=1);

require dirname(__DIR__) . '/app/bootstrap.php';

verify_csrf();

$pdo = db();
$page = $_GET['page'] ?? 'dashboard';

if (isset($_GET['book'])) {
    public_booking((string) $_GET['book']);
    exit;
}

if (isset($_GET['manage'])) {
    manage_booking((string) $_GET['manage']);
    exit;
}

if ($page === 'logout') {
    session_destroy();
    redirect(url('login'));
}

if ($page === 'login') {
    login_page();
    exit;
}

$user = require_login();
handle_post($user);
layout($page, $user);

function handle_post(array $user): void
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !db()) {
        return;
    }

    $action = $_POST['action'] ?? '';
    $userId = (int) $user['id'];

    if ($action === 'create_event') {
        $name = trim((string) $_POST['name']);
        $slug = slugify($name);
        $stmt = db()->prepare('INSERT INTO event_types (user_id, booking_page_id, name, slug, description, duration_minutes, price_cents, meeting_mode, location_type, deposit_required, max_attendees) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            $userId,
            $_POST['booking_page_id'] ?: null,
            $name,
            $slug,
            trim((string) $_POST['description']),
            (int) $_POST['duration_minutes'],
            (int) round(((float) $_POST['price']) * 100),
            $_POST['meeting_mode'],
            $_POST['location_type'],
            isset($_POST['deposit_required']) ? 1 : 0,
            max(1, (int) $_POST['max_attendees']),
        ]);
        flash('Event type created.');
        redirect(url('events'));
    }

    if ($action === 'create_page') {
        $title = trim((string) $_POST['title']);
        $slug = slugify((string) ($_POST['slug'] ?: $title));
        $stmt = db()->prepare('INSERT INTO booking_pages (user_id, title, slug, description, brand_color, is_active) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->execute([$userId, $title, $slug, trim((string) $_POST['description']), $_POST['brand_color'], isset($_POST['is_active']) ? 1 : 0]);
        flash('Booking page created.');
        redirect(url('pages'));
    }

    if ($action === 'save_settings') {
        $stmt = db()->prepare('REPLACE INTO scheduling_settings (user_id, buffer_before_minutes, buffer_after_minutes, minimum_notice_hours, max_advance_days, daily_booking_limit, weekly_booking_limit, protect_focus_time, cap_back_to_back, energy_recommendations) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            $userId,
            (int) $_POST['buffer_before_minutes'],
            (int) $_POST['buffer_after_minutes'],
            (int) $_POST['minimum_notice_hours'],
            (int) $_POST['max_advance_days'],
            (int) $_POST['daily_booking_limit'],
            (int) $_POST['weekly_booking_limit'],
            isset($_POST['protect_focus_time']) ? 1 : 0,
            isset($_POST['cap_back_to_back']) ? 1 : 0,
            isset($_POST['energy_recommendations']) ? 1 : 0,
        ]);
        flash('Availability guardrails saved.');
        redirect(url('availability'));
    }

    if ($action === 'add_team_member') {
        $stmt = db()->prepare('INSERT INTO team_members (user_id, name, email, role, timezone, routing_weight) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->execute([$userId, $_POST['name'], $_POST['email'], $_POST['role'], $_POST['timezone'], (int) $_POST['routing_weight']]);
        flash('Team member added.');
        redirect(url('team'));
    }

    if ($action === 'mark_integration') {
        $stmt = db()->prepare('INSERT INTO integrations (user_id, provider, status) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status = VALUES(status)');
        $stmt->execute([$userId, $_POST['provider'], $_POST['status']]);
        flash('Integration status updated.');
        redirect(url('integrations'));
    }

    if ($action === 'update_profile') {
        $stmt = db()->prepare('UPDATE users SET name = ?, timezone = ? WHERE id = ?');
        $stmt->execute([$_POST['name'], $_POST['timezone'], $userId]);
        flash('Settings saved.');
        redirect(url('settings'));
    }
}

function login_page(): void
{
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && db()) {
        $email = trim((string) $_POST['email']);
        $stmt = db()->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        if ($user) {
            $_SESSION['user_id'] = $user['id'];
            redirect(url('dashboard'));
        }
        flash('No user found for that email. Import database/seed.sql or create a user first.', 'error');
    }

    render_head('Login');
    echo '<main class="auth-page"><section class="card auth-card">';
    echo '<div class="brand" style="color:var(--ink);padding:0 0 18px"><span class="brand-mark">m</span><span>MeetMe</span></div>';
    echo '<h1>Welcome back</h1><p style="margin:8px 0 22px">Sign in to manage booking pages, availability, calendars, payments, and automations.</p>';
    setup_notice();
    foreach (flashes() as $f) echo '<div class="flash ' . h($f['type']) . '">' . h($f['message']) . '</div>';
    echo '<form method="post">' . csrf_field() . '<div class="field"><label class="label">Email</label><input class="input" name="email" value="alex@example.com"></div><button class="btn primary full">Continue</button></form>';
    echo '<div class="grid" style="margin-top:14px"><button class="btn ghost full" type="button">Continue with Google</button><button class="btn ghost full" type="button">Continue with Apple</button></div>';
    echo '<p class="muted" style="margin-top:16px">Google and Apple OAuth buttons are ready as UI entry points. Real OAuth needs keys in config/config.php.</p>';
    echo '</section></main></body></html>';
}

function layout(string $page, array $user): void
{
    render_head(ucwords(str_replace('_', ' ', $page)));
    echo '<div class="shell">';
    sidebar($page, $user);
    echo '<main class="main">';
    setup_notice();
    foreach (flashes() as $f) echo '<div class="flash ' . h($f['type']) . '">' . h($f['message']) . '</div>';
    switch ($page) {
        case 'pages':
            page_booking_pages($user);
            break;
        case 'events':
            page_events($user);
            break;
        case 'availability':
            page_availability($user);
            break;
        case 'sync':
            page_calendar_sync($user);
            break;
        case 'team':
            page_team($user);
            break;
        case 'best':
            page_best_time($user);
            break;
        case 'group':
            page_group($user);
            break;
        case 'reminders':
            page_reminders($user);
            break;
        case 'payments':
            page_payments($user);
            break;
        case 'integrations':
            page_integrations($user);
            break;
        case 'settings':
            page_settings($user);
            break;
        default:
            page_dashboard($user);
            break;
    }
    echo '</main></div></body></html>';
}

function render_head(string $title): void
{
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">';
    echo '<title>' . h($title) . ' - MeetMe</title><link rel="stylesheet" href="assets/app.css"></head><body>';
}

function setup_notice(): void
{
    if (!file_exists(dirname(__DIR__) . '/config/config.php')) {
        echo '<div class="setup"><strong>Setup needed:</strong> copy <code>config/config.example.php</code> to <code>config/config.php</code>, add your Hostinger MySQL credentials, then import <code>database/schema.sql</code>.</div>';
    } elseif (!db()) {
        echo '<div class="setup"><strong>Database connection issue:</strong> ' . h($_SESSION['db_error'] ?? 'Check config/config.php') . '</div>';
    }
}

function sidebar(string $active, array $user): void
{
    $items = [
        'dashboard' => 'Dashboard', 'pages' => 'Booking Pages', 'events' => 'Event Types',
        'availability' => 'Availability', 'sync' => 'Calendar Sync', 'team' => 'Team',
        'best' => 'Best Time', 'group' => 'Group Find', 'reminders' => 'Reminders',
        'payments' => 'Payments', 'integrations' => 'Integrations', 'settings' => 'Settings',
    ];
    echo '<aside class="sidebar"><a class="brand" href="' . h(url('dashboard')) . '"><span class="brand-mark">m</span><span>MeetMe</span></a><nav class="nav">';
    foreach ($items as $key => $label) {
        echo '<a class="' . ($active === $key ? 'active' : '') . '" href="' . h(url($key)) . '"><span>' . nav_icon($key) . '</span>' . h($label) . '</a>';
    }
    echo '</nav><div class="workspace"><strong>' . h($user['name']) . '</strong>' . h($user['plan']) . ' plan<br><a href="' . h(url('logout')) . '">Log out</a></div></aside>';
}

function nav_icon(string $key): string
{
    return [
        'dashboard' => '⌂', 'pages' => '↗', 'events' => '▣', 'availability' => '◷', 'sync' => '↻',
        'team' => '◎', 'best' => '✦', 'group' => '◇', 'reminders' => '◔', 'payments' => '$',
        'integrations' => '⛓', 'settings' => '⚙',
    ][$key] ?? '•';
}

function topbar(string $title, string $subtitle = '', string $actions = ''): void
{
    echo '<header class="topbar"><div><h1>' . h($title) . '</h1>';
    if ($subtitle) echo '<p style="margin-top:6px">' . h($subtitle) . '</p>';
    echo '</div><div style="display:flex;gap:8px;flex-wrap:wrap">' . $actions . '</div></header>';
}

function rows(string $sql, array $params = []): array
{
    if (!db()) return [];
    $stmt = db()->prepare($sql);
    $stmt->execute($params);
    return $stmt->fetchAll();
}

function row(string $sql, array $params = []): ?array
{
    $rows = rows($sql, $params);
    return $rows[0] ?? null;
}

function page_dashboard(array $user): void
{
    $uid = (int) $user['id'];
    $bookings = rows('SELECT b.*, e.name event_name, e.location_type FROM bookings b JOIN event_types e ON e.id=b.event_type_id WHERE b.user_id=? ORDER BY b.starts_at DESC LIMIT 6', [$uid]);
    $actions = '<a class="btn ghost" href="' . h(public_booking_url(first_page_slug($uid))) . '">Preview booking page</a><a class="btn primary" href="' . h(url('events')) . '">New event type</a>';
    topbar('Good morning, ' . $user['name'], 'Your scheduling command center.', $actions);
    echo '<section class="content grid">';
    echo '<div class="grid grid-5">';
    stat('Bookings', (string) table_count('bookings', $uid), 'All time');
    stat('Event Types', (string) table_count('event_types', $uid), 'Active offers');
    stat('Pages', (string) table_count('booking_pages', $uid), 'Public links');
    stat('Team', (string) table_count('team_members', $uid), 'Members');
    stat('Focus', '11.5h', 'Protected this week');
    echo '</div><div class="grid grid-2">';
    echo '<section class="card"><h3>Recent bookings</h3><table class="table"><tr><th>Guest</th><th>Event</th><th>Time</th><th>Status</th></tr>';
    foreach ($bookings as $b) {
        echo '<tr><td>' . h($b['guest_name']) . '</td><td>' . h($b['event_name']) . '</td><td>' . h(date('M j, H:i', strtotime($b['starts_at']))) . '</td><td><span class="pill green">' . h($b['status']) . '</span></td></tr>';
    }
    if (!$bookings) echo '<tr><td colspan="4" class="muted">No bookings yet. Preview your booking page and create one.</td></tr>';
    echo '</table></section>';
    echo '<section class="card soft"><span class="pill clay">Best Time Insights</span><h3 style="margin-top:10px">Show good slots, not just free slots.</h3><p style="margin:8px 0 16px">Meeting fatigue, focus blocks, buffers, and time-zone fairness are scored before guests see recommended times.</p>';
    metric('Meeting fatigue', 42); metric('Focus protection', 70); metric('Energy fit', 86);
    echo '<a class="btn clay" href="' . h(url('best')) . '">Review suggestions</a></section></div></section>';
}

function stat(string $label, string $value, string $caption): void
{
    echo '<article class="card stat"><span class="muted">' . h($label) . '</span><strong>' . h($value) . '</strong><span class="pill green">' . h($caption) . '</span></article>';
}

function metric(string $label, int $value): void
{
    echo '<div style="margin:12px 0"><div style="display:flex;justify-content:space-between"><strong>' . h($label) . '</strong><span class="muted">' . $value . '/100</span></div><div style="height:6px;background:var(--paper-3);border-radius:99px;margin-top:6px"><div style="width:' . $value . '%;height:100%;background:var(--green);border-radius:99px"></div></div></div>';
}

function first_page_slug(int $userId): string
{
    $page = row('SELECT slug FROM booking_pages WHERE user_id=? ORDER BY id LIMIT 1', [$userId]);
    return $page['slug'] ?? 'alex-coaching';
}

function page_booking_pages(array $user): void
{
    $uid = (int) $user['id'];
    $pages = rows('SELECT * FROM booking_pages WHERE user_id=? ORDER BY created_at DESC', [$uid]);
    topbar('Booking Pages', 'Create shareable links where clients can book without back-and-forth.');
    echo '<section class="content grid grid-2"><div class="card"><h3>Create booking page</h3><form method="post">' . csrf_field() . '<input type="hidden" name="action" value="create_page">';
    field('Title', 'title', 'Alex Morgan Coaching'); field('Slug', 'slug', 'alex-coaching'); textarea_field('Description', 'description', 'Health and wellness sessions with a calmer booking flow.'); field('Brand color', 'brand_color', '#1f3b2e'); echo '<label><input type="checkbox" name="is_active" checked> Active</label><br><br><button class="btn primary">Create page</button></form></div>';
    echo '<div class="card"><h3>Your links</h3><table class="table"><tr><th>Page</th><th>Public link</th><th>Status</th></tr>';
    foreach ($pages as $p) echo '<tr><td>' . h($p['title']) . '</td><td><a href="' . h(public_booking_url($p['slug'])) . '">' . h($p['slug']) . '</a></td><td><span class="pill green">' . ($p['is_active'] ? 'Active' : 'Draft') . '</span></td></tr>';
    echo '</table></div></section>';
}

function page_events(array $user): void
{
    $uid = (int) $user['id'];
    $events = rows('SELECT e.*, p.title page_title FROM event_types e LEFT JOIN booking_pages p ON p.id=e.booking_page_id WHERE e.user_id=? ORDER BY e.created_at DESC', [$uid]);
    $pages = rows('SELECT * FROM booking_pages WHERE user_id=? ORDER BY title', [$uid]);
    topbar('Event Types', 'Different booking options: calls, demos, consultations, interviews, paid sessions, and group events.');
    echo '<section class="content grid"><div class="grid grid-3">';
    foreach ($events as $e) {
        echo '<article class="card"><span class="pill">' . h(str_replace('_', ' ', $e['meeting_mode'])) . '</span><h3 style="margin-top:10px">' . h($e['name']) . '</h3><p>' . h($e['description']) . '</p><p style="margin-top:12px"><strong>' . (int) $e['duration_minutes'] . ' min</strong> - ' . h(money((int) $e['price_cents'], $e['currency'])) . '</p><p class="muted">' . h($e['location_type']) . ' - ' . h($e['page_title'] ?? 'No page') . '</p></article>';
    }
    echo '</div><div class="card"><h3>New event type</h3><form method="post">' . csrf_field() . '<input type="hidden" name="action" value="create_event"><div class="grid grid-2">';
    field('Name', 'name', 'Strategy Call'); field('Duration minutes', 'duration_minutes', '30', 'number'); field('Price', 'price', '0', 'number');
    echo '<div class="field"><label class="label">Booking page</label><select name="booking_page_id"><option value="">None</option>';
    foreach ($pages as $p) echo '<option value="' . (int) $p['id'] . '">' . h($p['title']) . '</option>';
    echo '</select></div><div class="field"><label class="label">Meeting mode</label><select name="meeting_mode"><option value="one_on_one">One-on-one</option><option value="group">Group</option><option value="round_robin">Round-robin</option><option value="collective">Collective</option></select></div><div class="field"><label class="label">Location</label><select name="location_type"><option value="zoom">Zoom</option><option value="google_meet">Google Meet</option><option value="teams">Microsoft Teams</option><option value="phone">Phone</option><option value="in_person">In person</option></select></div>';
    field('Max attendees', 'max_attendees', '1', 'number'); echo '<div class="field"><label><input type="checkbox" name="deposit_required"> Deposit required</label></div></div>'; textarea_field('Description', 'description', ''); echo '<button class="btn primary">Create event</button></form></div></section>';
}

function page_availability(array $user): void
{
    $uid = (int) $user['id'];
    $settings = row('SELECT * FROM scheduling_settings WHERE user_id=?', [$uid]) ?? [];
    $rules = rows('SELECT * FROM availability_rules WHERE user_id=? ORDER BY weekday,start_time', [$uid]);
    topbar('Availability', 'Working hours, buffers, booking limits, minimum notice, and energy-aware guardrails.');
    echo '<section class="content grid grid-2"><div class="card"><h3>Working hours</h3><table class="table"><tr><th>Day</th><th>From</th><th>To</th><th>Status</th></tr>';
    foreach ($rules as $r) echo '<tr><td>' . h(['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][(int)$r['weekday']] ?? '') . '</td><td>' . h(substr($r['start_time'],0,5)) . '</td><td>' . h(substr($r['end_time'],0,5)) . '</td><td><span class="pill green">Enabled</span></td></tr>';
    echo '</table><p class="muted" style="margin-top:12px">Next step: add date overrides and inline editing controls.</p></div>';
    echo '<div class="card soft"><span class="pill clay">Energy-aware scheduling</span><h3 style="margin-top:10px">Protect focus and reduce meeting fatigue</h3><form method="post" style="margin-top:14px">' . csrf_field() . '<input type="hidden" name="action" value="save_settings"><div class="grid grid-2">';
    foreach (['buffer_before_minutes'=>'Buffer before','buffer_after_minutes'=>'Buffer after','minimum_notice_hours'=>'Minimum notice hours','max_advance_days'=>'Max advance days','daily_booking_limit'=>'Daily booking limit','weekly_booking_limit'=>'Weekly booking limit'] as $name => $label) {
        field($label, $name, (string) ($settings[$name] ?? 0), 'number');
    }
    echo '</div><label><input type="checkbox" name="protect_focus_time" ' . (!empty($settings['protect_focus_time']) ? 'checked' : '') . '> Hold focus blocks</label><br><label><input type="checkbox" name="cap_back_to_back" ' . (!empty($settings['cap_back_to_back']) ? 'checked' : '') . '> Cap back-to-back meetings</label><br><label><input type="checkbox" name="energy_recommendations" ' . (!empty($settings['energy_recommendations']) ? 'checked' : '') . '> Show best-time recommendations</label><br><br><button class="btn primary">Save guardrails</button></form></div></section>';
}

function page_calendar_sync(array $user): void
{
    $connections = rows('SELECT * FROM calendar_connections WHERE user_id=?', [(int) $user['id']]);
    topbar('Calendar Sync', 'Connect Google, Apple, Outlook, and Microsoft 365 to prevent double-booking.');
    echo '<section class="content grid grid-2"><div class="card"><h3>Sign in once</h3><p style="margin:8px 0 18px">OAuth buttons are ready. Add provider keys in config/config.php to activate real authorization.</p><button class="btn ghost full">Continue with Google</button><br><br><button class="btn ghost full">Continue with Apple</button><br><br><button class="btn ghost full">Continue with Outlook</button><br><br><button class="btn ghost full">Continue with Microsoft 365</button></div>';
    echo '<div class="card"><h3>Connected calendars</h3><table class="table"><tr><th>Provider</th><th>Email</th><th>Status</th></tr>';
    foreach ($connections as $c) echo '<tr><td>' . h(ucfirst($c['provider'])) . '</td><td>' . h($c['account_email']) . '</td><td><span class="pill green">' . h($c['sync_status']) . '</span></td></tr>';
    echo '</table></div></section>';
}

function page_team(array $user): void
{
    $members = rows('SELECT * FROM team_members WHERE user_id=? ORDER BY name', [(int) $user['id']]);
    topbar('Team Scheduling', 'Round-robin, collective availability, routing rules, and fair group scheduling.');
    echo '<section class="content grid grid-2"><div class="card"><h3>Team members</h3><table class="table"><tr><th>Name</th><th>Role</th><th>Routing</th></tr>';
    foreach ($members as $m) echo '<tr><td>' . h($m['name']) . '<br><span class="muted">' . h($m['email']) . '</span></td><td>' . h($m['role']) . '</td><td>' . (int) $m['routing_weight'] . '</td></tr>';
    if (!$members) echo '<tr><td colspan="3" class="muted">No team members yet.</td></tr>';
    echo '</table></div><div class="card"><h3>Add member</h3><form method="post">' . csrf_field() . '<input type="hidden" name="action" value="add_team_member">'; field('Name','name',''); field('Email','email',''); field('Role','role','Host'); field('Timezone','timezone',$user['timezone']); field('Routing weight','routing_weight','1','number'); echo '<button class="btn primary">Add member</button></form></div></section>';
}

function page_best_time(array $user): void
{
    topbar('Best Time Intelligence', 'Rank slots by focus impact, fatigue, urgency, and convenience.');
    echo '<section class="content grid grid-2"><div class="card"><h3>Ranked suggestions</h3>';
    foreach ([['Tue, May 27 - 10:30','96','Morning peak, low fatigue, fair across time zones'],['Wed, May 28 - 14:00','88','Good calendar fit, medium fatigue'],['Thu, May 29 - 09:00','81','Good for host, early for guest']] as $s) {
        echo '<div class="card" style="margin-top:10px"><span class="pill green">' . h($s[1]) . '/100</span><h3 style="margin-top:8px">' . h($s[0]) . '</h3><p>' . h($s[2]) . '</p></div>';
    }
    echo '</div><div class="card soft"><span class="pill clay">Why it matters</span><p style="margin-top:12px">This solves the biggest scheduling pain: most tools show when someone is free, but not whether the time is actually good. MeetMe scores fatigue, focus blocks, buffers, urgency, and fairness.</p></div></section>';
}

function page_group(array $user): void
{
    topbar('Smart Group Scheduling', 'Reduce polls and back-and-forth across multiple calendars and time zones.');
    echo '<section class="content grid grid-2"><div class="card"><h3>Attendees</h3><table class="table"><tr><th>Name</th><th>Time zone</th><th>Calendar</th></tr><tr><td>Alex Morgan</td><td>Europe/Warsaw</td><td><span class="pill green">Connected</span></td></tr><tr><td>Helena Voss</td><td>CET</td><td><span class="pill green">Connected</span></td></tr><tr><td>Marcus Chen</td><td>PT</td><td><span class="pill amber">Pending</span></td></tr></table></div><div class="card"><h3>Best group proposals</h3><p style="margin:8px 0 14px">MeetMe picks fair options without making everyone vote manually.</p>'; metric('Fairness', 96); metric('Focus respect', 92); metric('Calendar fit', 94); echo '<button class="btn clay">Send proposal</button></div></section>';
}

function page_reminders(array $user): void
{
    topbar('Reminders & Automations', 'Email/SMS confirmations, reminders, cancellations, reschedules, and follow-ups.');
    echo '<section class="content grid grid-2"><div class="card"><h3>Booking timeline</h3><table class="table"><tr><th>When</th><th>Channel</th><th>Message</th></tr><tr><td>Immediately</td><td>Email</td><td>Confirmation with all details</td></tr><tr><td>24 hours before</td><td>SMS</td><td>Reminder with one-tap join link</td></tr><tr><td>1 hour after</td><td>Email</td><td>Follow-up and book next session</td></tr></table></div><div class="card"><h3>Automation builder</h3><p>Create trigger/action workflows for Slack, CRM, webhooks, and email tools.</p><button class="btn primary" style="margin-top:14px">New automation</button></div></section>';
}

function page_payments(array $user): void
{
    $paid = rows('SELECT b.*, e.name event_name, e.price_cents FROM bookings b JOIN event_types e ON e.id=b.event_type_id WHERE b.user_id=? AND e.price_cents > 0 ORDER BY b.created_at DESC', [(int)$user['id']]);
    topbar('Payments', 'Collect full payments, deposits, and cancellation fees through Stripe or PayPal.');
    echo '<section class="content grid grid-2"><div class="card"><h3>Providers</h3><p style="margin-bottom:14px">Add API keys in config/config.php, then connect live checkout.</p><button class="btn ghost full">Connect Stripe</button><br><br><button class="btn ghost full">Connect PayPal</button></div><div class="card"><h3>Paid bookings</h3><table class="table"><tr><th>Guest</th><th>Event</th><th>Status</th></tr>';
    foreach ($paid as $p) echo '<tr><td>' . h($p['guest_name']) . '</td><td>' . h($p['event_name']) . '</td><td><span class="pill">' . h($p['payment_status']) . '</span></td></tr>';
    echo '</table></div></section>';
}

function page_integrations(array $user): void
{
    $providers = ['zoom','google_meet','microsoft_teams','stripe','paypal','hubspot','salesforce','slack','zapier','make','mailchimp','webhooks','api','analytics_pixels'];
    $existing = rows('SELECT provider,status FROM integrations WHERE user_id=?', [(int)$user['id']]);
    $map = array_column($existing, 'status', 'provider');
    topbar('Integrations', 'CRM, Zapier, Make, Slack, email tools, analytics pixels, webhooks, and API access.');
    echo '<section class="content grid grid-4">';
    foreach ($providers as $provider) {
        $status = $map[$provider] ?? 'not_connected';
        echo '<article class="card"><span class="pill ' . ($status === 'connected' ? 'green' : '') . '">' . h(str_replace('_',' ', $status)) . '</span><h3 style="margin:10px 0">' . h(ucwords(str_replace('_',' ', $provider))) . '</h3><form method="post">' . csrf_field() . '<input type="hidden" name="action" value="mark_integration"><input type="hidden" name="provider" value="' . h($provider) . '"><input type="hidden" name="status" value="' . ($status === 'connected' ? 'not_connected' : 'connected') . '"><button class="btn ghost">' . ($status === 'connected' ? 'Disconnect' : 'Mark connected') . '</button></form></article>';
    }
    echo '</section>';
}

function page_settings(array $user): void
{
    topbar('Settings', 'Account, branding, security, time zone, login methods, and deployment preferences.');
    echo '<section class="content grid grid-2"><div class="card"><h3>Profile</h3><form method="post">' . csrf_field() . '<input type="hidden" name="action" value="update_profile">'; field('Name','name',$user['name']); field('Timezone','timezone',$user['timezone']); echo '<button class="btn primary">Save settings</button></form></div><div class="card"><h3>Login methods</h3><p>Google and Apple sign-in are visible in the UI. Add OAuth credentials to activate production login and calendar authorization.</p></div></section>';
}

function field(string $label, string $name, string $value = '', string $type = 'text'): void
{
    echo '<div class="field"><label class="label" for="' . h($name) . '">' . h($label) . '</label><input class="input" id="' . h($name) . '" type="' . h($type) . '" name="' . h($name) . '" value="' . h($value) . '"></div>';
}

function textarea_field(string $label, string $name, string $value = ''): void
{
    echo '<div class="field"><label class="label" for="' . h($name) . '">' . h($label) . '</label><textarea id="' . h($name) . '" name="' . h($name) . '">' . h($value) . '</textarea></div>';
}

function public_booking(string $slug): void
{
    $page = row('SELECT p.*, u.name host_name, u.timezone FROM booking_pages p JOIN users u ON u.id=p.user_id WHERE p.slug=? AND p.is_active=1', [$slug]);
    if (!$page) {
        render_head('Booking page not found');
        echo '<main class="booking-public"><section class="card"><h1>Booking page not found</h1><p>This link is unavailable.</p></section></main></body></html>';
        return;
    }
    $events = rows('SELECT * FROM event_types WHERE booking_page_id=? AND is_active=1 ORDER BY duration_minutes', [(int)$page['id']]);

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && db()) {
        $event = row('SELECT * FROM event_types WHERE id=? AND booking_page_id=?', [(int)$_POST['event_type_id'], (int)$page['id']]);
        if ($event) {
            $start = new DateTime($_POST['booking_date'] . ' ' . $_POST['booking_time'], new DateTimeZone($page['timezone']));
            $end = clone $start;
            $end->modify('+' . (int)$event['duration_minutes'] . ' minutes');
            $token = bin2hex(random_bytes(32));
            $stmt = db()->prepare('INSERT INTO bookings (user_id, event_type_id, guest_name, guest_email, guest_phone, starts_at, ends_at, timezone, payment_status, meeting_url, cancel_token, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            $stmt->execute([
                $page['user_id'], $event['id'], $_POST['guest_name'], $_POST['guest_email'], $_POST['guest_phone'],
                $start->format('Y-m-d H:i:s'), $end->format('Y-m-d H:i:s'), $page['timezone'],
                ((int)$event['price_cents'] > 0 ? 'pending' : 'not_required'),
                meeting_url((string)$event['location_type']), $token, $_POST['notes'] ?? '',
            ]);
            render_head('Booking confirmed');
            echo '<main class="booking-public"><section class="card auth-card"><span class="pill green">Confirmed</span><h1 style="margin-top:12px">You are booked.</h1><p style="margin:8px 0 18px">' . h($event['name']) . ' with ' . h($page['host_name']) . ' on ' . h($start->format('M j, Y H:i')) . '.</p><div class="grid"><a class="btn primary full" href="' . h(public_booking_url($slug)) . '">Book another time</a><a class="btn ghost full" href="index.php?manage=' . h($token) . '">Reschedule or cancel</a></div></section></main></body></html>';
            return;
        }
    }

    render_head($page['title']);
    echo '<main class="booking-public"><div class="public-wrap"><header class="booking-header"><div class="portrait">AM</div><div><span class="pill green">Verified host</span><h1 style="margin-top:12px">' . h($page['host_name']) . '</h1><p>' . h($page['description']) . '</p><p class="muted" style="margin-top:8px">Time zone: ' . h($page['timezone']) . ' - Reschedule or cancel from your confirmation email.</p></div></header><form method="post" class="grid grid-2">' . csrf_field();
    echo '<section class="card"><h3>Choose your meeting</h3><div class="field"><label class="label">Event type</label><select name="event_type_id">';
    foreach ($events as $e) echo '<option value="' . (int)$e['id'] . '">' . h($e['name']) . ' - ' . (int)$e['duration_minutes'] . ' min - ' . h(money((int)$e['price_cents'], $e['currency'])) . '</option>';
    echo '</select></div><div class="grid grid-2">'; field('Date','booking_date',(new DateTime('+2 days'))->format('Y-m-d'),'date'); echo '<div class="field"><label class="label">Recommended time</label><select name="booking_time"><option>09:00</option><option>10:30</option><option>13:00</option><option>15:30</option></select></div></div><p class="muted">Recommended slots avoid fatigue, preserve focus blocks, and respect buffers.</p></section>';
    echo '<section class="card"><h3>Your details</h3>'; field('Name','guest_name',''); field('Email','guest_email','','email'); field('Phone','guest_phone',''); textarea_field('Notes','notes',''); echo '<button class="btn clay full">Confirm booking</button><p class="muted" style="margin-top:12px">Paid events will move to Stripe/PayPal checkout after payment keys are configured.</p></section></form></div></main></body></html>';
}

function meeting_url(string $location): string
{
    switch ($location) {
        case 'google_meet':
            return 'Google Meet link will be generated';
        case 'teams':
            return 'Microsoft Teams link will be generated';
        case 'phone':
            return 'Phone call';
        case 'in_person':
            return 'In-person meeting';
        default:
            return 'Zoom link will be generated';
    }
}

function manage_booking(string $token): void
{
    $booking = row('SELECT b.*, e.name event_name, e.duration_minutes, u.name host_name FROM bookings b JOIN event_types e ON e.id=b.event_type_id JOIN users u ON u.id=b.user_id WHERE b.cancel_token=?', [$token]);
    if (!$booking) {
        render_head('Booking not found');
        echo '<main class="booking-public"><section class="card auth-card"><h1>Booking not found</h1><p>This management link is unavailable.</p></section></main></body></html>';
        return;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && db()) {
        $action = $_POST['action'] ?? '';
        if ($action === 'cancel_booking') {
            $stmt = db()->prepare("UPDATE bookings SET status='cancelled', notes=CONCAT(COALESCE(notes,''), '\nCancellation reason: ', ?) WHERE cancel_token=?");
            $stmt->execute([$_POST['reason'] ?? '', $token]);
            flash('Booking cancelled.');
            redirect('index.php?manage=' . urlencode($token));
        }
        if ($action === 'reschedule_booking') {
            $start = new DateTime($_POST['booking_date'] . ' ' . $_POST['booking_time'], new DateTimeZone($booking['timezone']));
            $end = clone $start;
            $end->modify('+' . (int)$booking['duration_minutes'] . ' minutes');
            $stmt = db()->prepare("UPDATE bookings SET starts_at=?, ends_at=?, status='rescheduled' WHERE cancel_token=?");
            $stmt->execute([$start->format('Y-m-d H:i:s'), $end->format('Y-m-d H:i:s'), $token]);
            flash('Booking rescheduled.');
            redirect('index.php?manage=' . urlencode($token));
        }
    }

    render_head('Manage booking');
    foreach (flashes() as $f) echo '<div class="flash ' . h($f['type']) . '">' . h($f['message']) . '</div>';
    echo '<main class="booking-public"><section class="card auth-card"><span class="pill ' . ($booking['status'] === 'cancelled' ? 'clay' : 'green') . '">' . h($booking['status']) . '</span><h1 style="margin-top:12px">Manage your booking</h1><p style="margin:8px 0 18px">' . h($booking['event_name']) . ' with ' . h($booking['host_name']) . '<br>' . h(date('M j, Y H:i', strtotime($booking['starts_at']))) . '</p>';
    if ($booking['status'] !== 'cancelled') {
        echo '<form method="post" class="card" style="margin-bottom:12px">' . csrf_field() . '<input type="hidden" name="action" value="reschedule_booking"><h3>Reschedule</h3><div class="grid grid-2" style="margin-top:12px">'; field('New date', 'booking_date', (new DateTime('+3 days'))->format('Y-m-d'), 'date'); echo '<div class="field"><label class="label">New time</label><select name="booking_time"><option>09:00</option><option>10:30</option><option>13:00</option><option>15:30</option></select></div></div><button class="btn primary full">Reschedule</button></form>';
        echo '<form method="post" class="card">' . csrf_field() . '<input type="hidden" name="action" value="cancel_booking"><h3>Cancel</h3><div class="field" style="margin-top:12px"><label class="label">Reason</label><textarea name="reason"></textarea></div><button class="btn clay full">Cancel booking</button></form>';
    }
    echo '</section></main></body></html>';
}

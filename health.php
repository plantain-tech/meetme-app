<?php
declare(strict_types=1);

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$root = __DIR__;
$checks = [
    'Project root' => $root,
    'PHP version' => PHP_VERSION,
    'index.php exists' => file_exists($root . '/index.php') ? 'yes' : 'no',
    'public/index.php exists' => file_exists($root . '/public/index.php') ? 'yes' : 'no',
    'app/bootstrap.php exists' => file_exists($root . '/app/bootstrap.php') ? 'yes' : 'no',
    'assets/app.css exists' => file_exists($root . '/assets/app.css') ? 'yes' : 'no',
    'config/config.php exists' => file_exists($root . '/config/config.php') ? 'yes' : 'no',
    'config/config.example.php exists' => file_exists($root . '/config/config.example.php') ? 'yes' : 'no',
    'PDO extension' => extension_loaded('pdo') ? 'loaded' : 'missing',
    'PDO MySQL extension' => extension_loaded('pdo_mysql') ? 'loaded' : 'missing',
    'Session extension' => extension_loaded('session') ? 'loaded' : 'missing',
    'OpenSSL extension' => extension_loaded('openssl') ? 'loaded' : 'missing',
];

$bootstrapResult = 'not tested';
try {
    require_once $root . '/app/bootstrap.php';
    $bootstrapResult = 'loaded';
} catch (Throwable $e) {
    $bootstrapResult = 'failed: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine();
}
$checks['Bootstrap load'] = $bootstrapResult;

?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>MeetMe Health Check</title>
  <style>
    body { font-family: Arial, sans-serif; background: #fbf9f5; color: #1c1a16; padding: 32px; }
    main { max-width: 880px; margin: 0 auto; }
    table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #e8e3d8; border-radius: 12px; overflow: hidden; }
    td { padding: 12px 14px; border-bottom: 1px solid #e8e3d8; vertical-align: top; }
    tr:last-child td { border-bottom: 0; }
    td:first-child { width: 260px; font-weight: 700; }
    .bad { color: #9a462f; font-weight: 700; }
    .ok { color: #1f3b2e; font-weight: 700; }
  </style>
</head>
<body>
<main>
  <h1>MeetMe Health Check</h1>
  <p>This page is temporary and helps diagnose Hostinger deployment.</p>
  <table>
    <?php foreach ($checks as $label => $value): ?>
      <?php $isBad = strpos((string) $value, 'missing') !== false || strpos((string) $value, 'failed') !== false || $value === 'no'; ?>
      <tr>
        <td><?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?></td>
        <td class="<?= $isBad ? 'bad' : 'ok' ?>"><?= htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8') ?></td>
      </tr>
    <?php endforeach; ?>
  </table>
</main>
</body>
</html>

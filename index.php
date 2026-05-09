<?php
declare(strict_types=1);

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

try {
    require __DIR__ . '/public/index.php';
} catch (Throwable $e) {
    http_response_code(500);
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
    echo '<title>MeetMe Diagnostic</title>';
    echo '<style>body{font-family:Arial,sans-serif;background:#fbf9f5;color:#1c1a16;padding:32px}pre{white-space:pre-wrap;background:#fff;border:1px solid #e8e3d8;border-radius:12px;padding:16px}</style>';
    echo '</head><body><h1>MeetMe hit a PHP error</h1>';
    echo '<p>This temporary diagnostic page is shown so we can fix deployment.</p>';
    echo '<pre>';
    echo 'Message: ' . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8') . "\n";
    echo 'File: ' . htmlspecialchars($e->getFile(), ENT_QUOTES, 'UTF-8') . ':' . (int) $e->getLine() . "\n";
    echo 'PHP: ' . PHP_VERSION . "\n";
    echo '</pre>';
    echo '<p>Also open <a href="health.php">health.php</a> for environment checks.</p>';
    echo '</body></html>';
}

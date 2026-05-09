<?php
return [
    'app_name' => 'MeetMe',
    'app_url' => 'http://localhost',
    'timezone' => 'Europe/Warsaw',
    'db' => [
        'host' => 'localhost',
        'name' => 'meetme',
        'user' => 'meetme_user',
        'pass' => 'change-me',
        'charset' => 'utf8mb4',
    ],
    'oauth' => [
        'google_client_id' => '',
        'google_client_secret' => '',
        'apple_client_id' => '',
        'apple_team_id' => '',
        'apple_key_id' => '',
    ],
    'payments' => [
        'stripe_secret_key' => '',
        'paypal_client_id' => '',
    ],
    'mail' => [
        'from_email' => 'bookings@example.com',
        'from_name' => 'MeetMe',
    ],
];

<?php
/**
 * SDASMS Contact Form Handler
 * Receives JSON POST from the Contact page and sends email via PHP mail()
 * Place this file in your cPanel public_html directory
 */

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Read JSON input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request data']);
    exit;
}

// Sanitize inputs
function sanitize($val) {
    if (!is_string($val)) return '';
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}

$name = sanitize($data['name'] ?? '');
$email = sanitize($data['email'] ?? '');
$subject = sanitize($data['subject'] ?? '');
$message = sanitize($data['message'] ?? '');

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

// Build email
$to = 'hello@sdasms.com';
$emailSubject = 'Contact Form: ' . ($subject ?: 'New Message from ' . $name);

$emailBody = '<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px;">
<div style="max-width: 550px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

  <div style="background: linear-gradient(135deg, #D72444, #7C3AED); padding: 24px; text-align: center;">
    <h1 style="color: #fff; margin: 0; font-size: 20px;">New Contact Message</h1>
  </div>

  <div style="padding: 24px; font-size: 14px; color: #555;">
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr><td style="padding: 8px 0; color: #888; width: 30%;">Name</td><td style="padding: 8px 0; color: #333; font-weight: bold;">' . $name . '</td></tr>
      <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0; color: #D72444;">' . $email . '</td></tr>
      <tr><td style="padding: 8px 0; color: #888;">Subject</td><td style="padding: 8px 0; color: #333;">' . $subject . '</td></tr>
    </table>

    <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #eee;">
      <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message</p>
      <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">' . $message . '</p>
    </div>
  </div>

  <div style="background: #f9f9f9; padding: 16px; text-align: center; font-size: 12px; color: #999;">
    Received on ' . date('F j, Y \a\t g:i A') . ' | SDASMS Contact Form
  </div>
</div>
</body>
</html>';

// Email headers
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: SDASMS Contact <hello@sdasms.com>';
$headers[] = 'Reply-To: ' . $email;

// Send email
$sendResult = mail($to, $emailSubject, $emailBody, implode("\r\n", $headers));

if ($sendResult) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please email hello@sdasms.com directly.']);
}

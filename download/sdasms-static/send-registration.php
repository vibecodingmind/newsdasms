<?php
/**
 * SDASMS Registration Form Handler
 * 
 * Receives JSON POST from the "Get Started" registration form,
 * validates fields, sends notification and confirmation emails,
 * and returns a JSON response.
 */

// ─── Headers ────────────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// ─── Configuration ──────────────────────────────────────────────────────────
define('TO_EMAIL', 'hello@sdasms.com');
define('FROM_EMAIL', 'hello@sdasms.com');
define('SITE_NAME', 'SDASMS');

define('PERSONAL_PRICE', '99,500 TZS');
define('ORG_PRICE', '249,500 TZS');

define('BANK_NAME', 'Equity Bank Tanzania');
define('BANK_ACCOUNT_NAME', 'SDASMS Marketing Agency');
define('BANK_ACCOUNT_NO', '3002211802039');
define('MPESA_NUMBER', '51720044');

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Sanitize a string for safe email / HTML output.
 */
function sanitize(string $value): string
{
    return htmlspecialchars(trim($value), ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

/**
 * Strip newlines to prevent header injection on email addresses.
 */
function cleanEmail(string $value): string
{
    return preg_replace('/[\r\n]+/', '', trim($value));
}

/**
 * Validate email format.
 */
function isValidEmail(string $email): bool
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Return a JSON error response and exit.
 */
function fail(string $message, int $code = 400): void
{
    http_response_code($code);
    echo json_encode(['success' => false, 'message' => $message]);
    exit;
}

/**
 * Build a labelled table row for HTML email.
 */
function row(string $label, string $value, bool $alt = false): string
{
    $bg = $alt ? '#f9fafb' : '#ffffff';
    return <<<HTML
        <tr style="background-color:{$bg}">
            <td style="padding:10px 16px;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;width:40%">{$label}</td>
            <td style="padding:10px 16px;color:#1f2937;border-bottom:1px solid #e5e7eb">{$value}</td>
        </tr>
HTML;
}

/**
 * Send an HTML email using PHP mail().
 */
function sendMail(string $to, string $subject, string $htmlBody): bool
{
    $headers  = "From: " . FROM_EMAIL . "\r\n";
    $headers .= "Reply-To: " . FROM_EMAIL . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    return mail($to, $subject, $htmlBody, $headers);
}

/**
 * Wrap body content in a consistent HTML email shell.
 */
function emailShell(string $title, string $bodyContent): string
{
    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:32px 0">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
<!-- Header -->
<tr><td style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:28px 32px;text-align:center">
<h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px">{$title}</h1>
</td></tr>
<!-- Body -->
<tr><td style="padding:28px 32px">
{$bodyContent}
</td></tr>
<!-- Footer -->
<tr><td style="background-color:#f9fafb;padding:16px 32px;text-align:center;border-top:1px solid #e5e7eb">
<p style="margin:0;font-size:12px;color:#6b7280">&copy; " . date('Y') . " SDASMS Marketing Agency &mdash; All rights reserved.</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>
HTML;
}

// ─── Receive & Decode JSON ──────────────────────────────────────────────────
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    fail('Invalid request body. Please send valid JSON.');
}

// ─── Common Validation ──────────────────────────────────────────────────────
$accountType = sanitize($data['accountType'] ?? '');

if (!in_array($accountType, ['personal', 'organization'], true)) {
    fail('Invalid account type. Must be "personal" or "organization".');
}

$paymentMethod = sanitize($data['paymentMethod'] ?? '');
if (!in_array($paymentMethod, ['mpesa', 'bank'], true)) {
    fail('Invalid payment method.');
}

$termsAccepted = filter_var($data['termsAccepted'] ?? false, FILTER_VALIDATE_BOOLEAN);
if (!$termsAccepted) {
    fail('You must accept the terms and conditions.');
}

$paymentConfirmed = filter_var($data['paymentConfirmed'] ?? false, FILTER_VALIDATE_BOOLEAN);

// ─── Personal Validation ────────────────────────────────────────────────────
if ($accountType === 'personal') {
    $required = ['fullName', 'email', 'phone', 'address', 'city', 'region', 'country', 'repIdType', 'repIdNumber'];
    foreach ($required as $field) {
        if (empty(trim($data[$field] ?? ''))) {
            fail("Missing required field: {$field}");
        }
    }
    $registrantEmail = cleanEmail($data['email']);
    if (!isValidEmail($registrantEmail)) {
        fail('Invalid email address.');
    }
}

// ─── Organization Validation ────────────────────────────────────────────────
if ($accountType === 'organization') {
    $required = ['orgName', 'orgEmail', 'orgPhone', 'orgAddress', 'orgCity', 'orgRegion', 'orgCountry', 'orgType', 'repName', 'repEmail', 'repPhone', 'repDesignation'];
    foreach ($required as $field) {
        if (empty(trim($data[$field] ?? ''))) {
            fail("Missing required field: {$field}");
        }
    }
    $registrantEmail = cleanEmail($data['orgEmail']);
    if (!isValidEmail($registrantEmail)) {
        fail('Invalid organization email address.');
    }
    // Also validate rep email if present
    if (!empty($data['repEmail']) && !isValidEmail(cleanEmail($data['repEmail']))) {
        fail('Invalid representative email address.');
    }
}

// ─── Build Field Collections ────────────────────────────────────────────────
$price        = $accountType === 'personal' ? PERSONAL_PRICE : ORG_PRICE;
$priceLabel   = $accountType === 'personal' ? 'Personal Account' : 'Organization / Business Account';
$paymentLabel = $paymentMethod === 'mpesa' ? 'M-PESA (' . MPESA_NUMBER . ')' : 'Bank Transfer (' . BANK_NAME . ')';

$rows  = '';
$alt   = false;

// Account & payment
$rows .= row('Account Type', $priceLabel, $alt++);
$rows .= row('Price', $price, $alt++);
$rows .= row('Payment Method', $paymentLabel, $alt++);
$rows .= row('Payment Confirmed', $paymentConfirmed ? 'Yes' : 'No', $alt++);

if ($accountType === 'personal') {
    // Personal details
    $rows .= row('Full Name', sanitize($data['fullName']), $alt++);
    $rows .= row('Email', sanitize($data['email']), $alt++);
    $rows .= row('Phone', sanitize($data['phone']), $alt++);
    $rows .= row('Address', sanitize($data['address']), $alt++);
    $rows .= row('City', sanitize($data['city']), $alt++);
    $rows .= row('Region', sanitize($data['region']), $alt++);
    $rows .= row('Country', sanitize($data['country']), $alt++);
    $rows .= row('ID Type', sanitize($data['repIdType']), $alt++);
    $rows .= row('ID Number', sanitize($data['repIdNumber']), $alt++);
} else {
    // Organization details
    $rows .= row('Organization Name', sanitize($data['orgName']), $alt++);
    $rows .= row('Organization Email', sanitize($data['orgEmail']), $alt++);
    $rows .= row('Organization Phone', sanitize($data['orgPhone']), $alt++);
    $rows .= row('Organization Address', sanitize($data['orgAddress']), $alt++);
    $rows .= row('City', sanitize($data['orgCity']), $alt++);
    $rows .= row('Region', sanitize($data['orgRegion']), $alt++);
    $rows .= row('Country', sanitize($data['orgCountry']), $alt++);
    $rows .= row('Website', sanitize($data['orgWebsite'] ?? 'N/A'), $alt++);
    $rows .= row('Organization Type', sanitize($data['orgType']), $alt++);
    if (!empty(trim($data['orgTypeOther'] ?? ''))) {
        $rows .= row('Organization Type (Other)', sanitize($data['orgTypeOther']), $alt++);
    }

    // Representative details
    $rows .= row('Representative Name', sanitize($data['repName']), $alt++);
    $rows .= row('Representative Email', sanitize($data['repEmail']), $alt++);
    $rows .= row('Representative Phone', sanitize($data['repPhone']), $alt++);
    $rows .= row('Designation', sanitize($data['repDesignation']), $alt++);
}

// ─── Admin Notification Email ───────────────────────────────────────────────
$adminSubject = "New {$priceLabel} Registration — " . SITE_NAME;

$adminBody = emailShell('New Registration', <<<BODY
<p style="margin:0 0 16px;color:#374151;font-size:15px">A new registration has been submitted through the SDASMS website.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
{$rows}
</table>
BODY
);

// ─── User Confirmation Email ────────────────────────────────────────────────
$userSubject = "Registration Received — " . SITE_NAME;

$paymentInstructions = '';
if ($paymentMethod === 'mpesa') {
    $paymentInstructions = <<<HTML
<div style="background-color:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin-top:16px">
<p style="margin:0 0 8px;font-weight:700;color:#1e40af">M-PESA Payment</p>
<p style="margin:0;color:#1e40af">Pay <strong>{$price}</strong> to M-PESA number: <strong>{$paymentMethod === 'mpesa' ? MPESA_NUMBER : ''}</strong></p>
</div>
HTML;
} else {
    $paymentInstructions = <<<HTML
<div style="background-color:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin-top:16px">
<p style="margin:0 0 8px;font-weight:700;color:#1e40af">Bank Transfer Payment</p>
<p style="margin:0 0 4px;color:#1e40af">Pay <strong>{$price}</strong> to:</p>
<p style="margin:0 0 2px;color:#1e40af"><strong>Bank:</strong> {BANK_NAME}</p>
<p style="margin:0 0 2px;color:#1e40af"><strong>Account Name:</strong> {BANK_ACCOUNT_NAME}</p>
<p style="margin:0;color:#1e40af"><strong>Account Number:</strong> {BANK_ACCOUNT_NO}</p>
</div>
HTML;
}

$userBody = emailShell('Thank You for Registering!', <<<BODY
<p style="margin:0 0 12px;color:#374151;font-size:15px">Dear {sanitized_name},</p>
<p style="margin:0 0 12px;color:#374151;font-size:15px">Thank you for registering with SDASMS! We have received your application for a <strong>{$priceLabel}</strong>.</p>
<p style="margin:0 0 12px;color:#374151;font-size:15px">Your registration fee is <strong>{$price}</strong>.</p>
{$paymentInstructions}
<p style="margin:16px 0 8px;color:#374151;font-size:15px">Once your payment is verified, our team will activate your account and reach out with next steps.</p>
<p style="margin:0;color:#374151;font-size:15px">If you have any questions, reply to this email or contact us at <a href="mailto:hello@sdasms.com" style="color:#2563eb">hello@sdasms.com</a>.</p>
BODY
);

// Replace placeholders in user body
$sanitized_name = $accountType === 'personal'
    ? sanitize($data['fullName'])
    : sanitize($data['orgName']);

$userBody = str_replace(
    ['{sanitized_name}', '{BANK_NAME}', '{BANK_ACCOUNT_NAME}', '{BANK_ACCOUNT_NO}'],
    [$sanitized_name, BANK_NAME, BANK_ACCOUNT_NAME, BANK_ACCOUNT_NO],
    $userBody
);

// ─── Send Emails ────────────────────────────────────────────────────────────

// Admin email — Reply-To should be the registrant
$adminHeaders  = "From: " . FROM_EMAIL . "\r\n";
$adminHeaders .= "Reply-To: " . $registrantEmail . "\r\n";
$adminHeaders .= "MIME-Version: 1.0\r\n";
$adminHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";
$adminHeaders .= "X-Mailer: PHP/" . phpversion();

$adminSent = mail(TO_EMAIL, $adminSubject, $adminBody, $adminHeaders);

// User confirmation email
$userHeaders  = "From: " . FROM_EMAIL . "\r\n";
$userHeaders .= "Reply-To: " . FROM_EMAIL . "\r\n";
$userHeaders .= "MIME-Version: 1.0\r\n";
$userHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";
$userHeaders .= "X-Mailer: PHP/" . phpversion();

$userSent = mail($registrantEmail, $userSubject, $userBody, $userHeaders);

// ─── Response ───────────────────────────────────────────────────────────────
if ($adminSent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send registration email. Please try again later.']);
}

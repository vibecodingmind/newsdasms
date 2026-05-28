<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['success'=>false,'message'=>'Method not allowed']); exit(); }
$json = file_get_contents('php://input');
$data = json_decode($json, true);
if (!$data) { http_response_code(400); echo json_encode(['success'=>false,'message'=>'Invalid data']); exit(); }
$fullName = isset($data['fullName']) ? htmlspecialchars(trim($data['fullName'])) : '';
$email = isset($data['email']) ? htmlspecialchars(trim($data['email'])) : '';
$phone = isset($data['phone']) ? htmlspecialchars(trim($data['phone'])) : '';
$organization = isset($data['organization']) ? htmlspecialchars(trim($data['organization'])) : '';
$country = isset($data['country']) ? htmlspecialchars(trim($data['country'])) : '';
$useCase = isset($data['useCase']) ? htmlspecialchars(trim($data['useCase'])) : '';
$message = isset($data['message']) ? htmlspecialchars(trim($data['message'])) : '';
if (empty($fullName)||empty($email)||empty($phone)) { http_response_code(400); echo json_encode(['success'=>false,'message'=>'Please fill in all required fields']); exit(); }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { http_response_code(400); echo json_encode(['success'=>false,'message'=>'Invalid email address']); exit(); }
$to = 'info@sdasms.com';
$mail_sent = mail($to, "SDASMS Registration: $fullName", "Name: $fullName\nEmail: $email\nPhone: $phone\nOrg: $organization\nCountry: $country\nUse Case: $useCase\n\n$message", "From: noreply@sdasms.com\r\nReply-To: $email");
if ($mail_sent) { echo json_encode(['success'=>true,'message'=>'Registration submitted successfully!']); }
else { http_response_code(500); echo json_encode(['success'=>false,'message'=>'Failed to submit registration.']); }

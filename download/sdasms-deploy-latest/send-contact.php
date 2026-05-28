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
$name = isset($data['name']) ? htmlspecialchars(trim($data['name'])) : '';
$email = isset($data['email']) ? htmlspecialchars(trim($data['email'])) : '';
$subject = isset($data['subject']) ? htmlspecialchars(trim($data['subject'])) : '';
$message = isset($data['message']) ? htmlspecialchars(trim($data['message'])) : '';
if (empty($name)||empty($email)||empty($message)) { http_response_code(400); echo json_encode(['success'=>false,'message'=>'Please fill in all required fields']); exit(); }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { http_response_code(400); echo json_encode(['success'=>false,'message'=>'Invalid email address']); exit(); }
$to = 'info@sdasms.com';
$mail_sent = mail($to, "SDASMS Contact: $subject", "Name: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message", "From: noreply@sdasms.com\r\nReply-To: $email");
if ($mail_sent) { echo json_encode(['success'=>true,'message'=>'Message sent successfully!']); }
else { http_response_code(500); echo json_encode(['success'=>false,'message'=>'Failed to send message.']); }

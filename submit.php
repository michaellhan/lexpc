<?php
header('Content-Type: application/json');

// Get form data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (empty($data['name']) || empty($data['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name and email are required']);
    exit;
}

// Sanitize input
$name = filter_var($data['name'], FILTER_SANITIZE_STRING);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$grade = filter_var($data['grade'], FILTER_SANITIZE_STRING);
$experience = filter_var($data['experience'], FILTER_SANITIZE_STRING);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Email configuration
$to = "lexpc@lexingtonma.org"; // Replace with your actual email
$subject = "New LEXPC Application";
$message = "New application received:\n\n";
$message .= "Name: $name\n";
$message .= "Email: $email\n";
$message .= "Grade: $grade\n";
$message .= "Experience: $experience\n";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$mailSent = mail($to, $subject, $message, $headers);

if ($mailSent) {
    echo json_encode(['success' => true, 'message' => 'Application submitted successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to submit application. Please try again.']);
}
?> 
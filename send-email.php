<?php
// Configuration
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Votre adresse email où vous recevrez les messages
$to_email = "ashuzamaheshe4@gmail.com";

// Configuration Cloudflare Turnstile
$turnstile_secret_key = "VOTRE_SECRET_KEY_ICI"; // À remplacer par votre Secret Key de Cloudflare

// Vérifier que c'est une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Récupérer les données du formulaire
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$turnstile_token = isset($_POST['cf_turnstile_token']) ? $_POST['cf_turnstile_token'] : '';

// Vérifier le token Cloudflare Turnstile
if (empty($turnstile_token)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Token Turnstile manquant']);
    exit;
}

// Vérifier le token auprès de Cloudflare
$turnstile_url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
$turnstile_data = [
    'secret' => $turnstile_secret_key,
    'response' => $turnstile_token,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];

$turnstile_options = [
    'http' => [
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($turnstile_data)
    ]
];

$turnstile_context = stream_context_create($turnstile_options);
$turnstile_result = file_get_contents($turnstile_url, false, $turnstile_context);
$turnstile_response = json_decode($turnstile_result);

// Vérifier la réponse de Turnstile
if (!$turnstile_response->success) {
    http_response_code(403);
    $error_codes = isset($turnstile_response->{'error-codes'}) ? implode(', ', $turnstile_response->{'error-codes'}) : 'unknown';
    echo json_encode([
        'success' => false,
        'message' => 'Vérification Turnstile échouée. Vous pourriez être un bot.',
        'error_codes' => $error_codes
    ]);
    exit;
}

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Le nom est requis';
}

if (empty($email)) {
    $errors[] = 'L\'email est requis';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email invalide';
}

if (empty($subject)) {
    $errors[] = 'Le sujet est requis';
}

if (empty($message)) {
    $errors[] = 'Le message est requis';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

// Préparer l'email
$email_subject = "Contact Portfolio: " . $subject;
$email_body = "Vous avez reçu un nouveau message depuis votre portfolio.\n\n";
$email_body .= "Nom: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Sujet: " . $subject . "\n\n";
$email_body .= "Message:\n" . $message . "\n";

// En-têtes de l'email
$headers = "From: noreply@votredomaine.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Envoyer l'email
$mail_sent = mail($to_email, $email_subject, $email_body, $headers);

if ($mail_sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Message envoyé avec succès!'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
    ]);
}
?>


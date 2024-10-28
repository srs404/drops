<?php 

// api.php
header('Content-Type: application/json');
session_start();

require_once 'auth.php';

$auth = new Auth();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate CSRF token
    if (!isset($_POST['csrf_token']) || 
        !$auth->validateCSRFToken($_POST['csrf_token'])) {
        http_response_code(403);
        die(json_encode(['error' => 'Invalid CSRF token']));
    }

    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'register':
                $result = $auth->register(
                    $_POST['name'],
                    $_POST['email'],
                    $_POST['password']
                );
                echo json_encode($result);
                break;

            case 'login':
                $result = $auth->login(
                    $_POST['email'],
                    $_POST['password']
                );
                echo json_encode($result);
                break;

            default:
                http_response_code(400);
                echo json_encode(['error' => 'Invalid action']);
        }
    }
}


?>
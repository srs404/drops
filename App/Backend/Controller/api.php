<?php
header('Content-Type: application/json');
session_start();

require_once 'auth.php';
require_once '../Model/db.php';

try {
    $auth = new Auth();

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Check if CSRF token exists in session and request
    if (empty($_SESSION['csrf_token']) || empty($_POST['csrf_token'])) {
        throw new Exception('Missing CSRF token');
    }

    // Validate CSRF token
    if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
        throw new Exception('Invalid CSRF token');
    }

    if (empty($_POST['action'])) {
        throw new Exception('No action specified');
    }

    switch ($_POST['action']) {
        case 'register':
            if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['password'])) {
                throw new Exception('Missing required fields');
            }

            $result = $auth->register(
                $_POST['name'],
                $_POST['email'],
                $_POST['password']
            );
            echo json_encode($result);
            break;

        case 'login':
            if (empty($_POST['email']) || empty($_POST['password'])) {
                throw new Exception('Missing required fields');
            }

            $result = $auth->login(
                $_POST['email'],
                $_POST['password']
            );

            if ($result['success']) {
                $_SESSION['user_token'] = $result['token'];
            }

            echo json_encode($result);
            break;

        default:
            throw new Exception('Invalid action');
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
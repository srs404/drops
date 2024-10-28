<?php
require_once '../Model/db.php';

class Auth {
    private $db;
    private const MAX_LOGIN_ATTEMPTS = 5;
    private const LOCKOUT_TIME = 900; // 15 minutes

    public function __construct() {
        try {
            $this->db = Database::getInstance()->getConnection();
        } catch (Exception $e) {
            error_log("Database connection error: " . $e->getMessage());
            throw new Exception('Database connection failed');
        }
    }

    private function isRateLimited($email, $ip) {
        try {
            $stmt = $this->db->prepare("
                SELECT COUNT(*) as attempts 
                FROM failed_login_attempts 
                WHERE email = ? AND ip_address = ? 
                AND attempted_at > DATE_SUB(NOW(), INTERVAL 15 MINUTE)
            ");
            $stmt->execute([$email, $ip]);
            $result = $stmt->fetch();
            return $result['attempts'] >= self::MAX_LOGIN_ATTEMPTS;
        } catch (Exception $e) {
            error_log("Rate limit check error: " . $e->getMessage());
            return false;
        }
    }

    private function logFailedAttempt($email, $ip) {
        try {
            $stmt = $this->db->prepare("
                INSERT INTO failed_login_attempts (email, ip_address) 
                VALUES (?, ?)
            ");
            $stmt->execute([$email, $ip]);
        } catch (Exception $e) {
            error_log("Failed to log attempt: " . $e->getMessage());
        }
    }

    public function register($name, $email, $password) {
        if (empty($name) || empty($email) || empty($password)) {
            return ['success' => false, 'error' => 'All fields are required'];
        }

        try {
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                return ['success' => false, 'error' => 'Invalid email format'];
            }

            if (strlen($password) < 8) {
                return ['success' => false, 'error' => 'Password must be at least 8 characters'];
            }

            // Check if email exists
            $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->fetch()) {
                return ['success' => false, 'error' => 'Email already registered'];
            }

            // Hash password
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);

            // Insert user
            $stmt = $this->db->prepare("
                INSERT INTO users (name, email, password_hash, created_at)
                VALUES (?, ?, ?, NOW())
            ");
            $stmt->execute([$name, $email, $passwordHash]);

            return ['success' => true, 'message' => 'Registration successful'];
        } catch (Exception $e) {
            error_log("Registration error: " . $e->getMessage());
            return ['success' => false, 'error' => 'Registration failed. Please try again.'];
        }
    }

    public function login($email, $password) {
        if (empty($email) || empty($password)) {
            return ['success' => false, 'error' => 'Email and password are required'];
        }

        try {
            $ip = $_SERVER['REMOTE_ADDR'];

            if ($this->isRateLimited($email, $ip)) {
                return ['success' => false, 'error' => 'Too many login attempts. Please try again later.'];
            }

            $stmt = $this->db->prepare("
                SELECT id, password_hash 
                FROM users 
                WHERE email = ? AND is_active = 1
            ");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if (!$user || !password_verify($password, $user['password_hash'])) {
                $this->logFailedAttempt($email, $ip);
                return ['success' => false, 'error' => 'Invalid credentials'];
            }

            // Generate session token
            $token = bin2hex(random_bytes(32));
            
            // Store session
            $stmt = $this->db->prepare("
                INSERT INTO user_sessions (user_id, token, ip_address, user_agent, expires_at)
                VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))
            ");
            $stmt->execute([
                $user['id'],
                $token,
                $ip,
                $_SERVER['HTTP_USER_AGENT'] ?? ''
            ]);

            // Update last login
            $stmt = $this->db->prepare("
                UPDATE users 
                SET last_login_at = NOW() 
                WHERE id = ?
            ");
            $stmt->execute([$user['id']]);

            return [
                'success' => true,
                'token' => $token,
                'message' => 'Login successful'
            ];
        } catch (Exception $e) {
            error_log("Login error: " . $e->getMessage());
            return ['success' => false, 'error' => 'Login failed. Please try again.'];
        }
    }

    public function generateCSRFToken() {
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    public function validateCSRFToken($token) {
        return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
    }
}
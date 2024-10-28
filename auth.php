<?php 

require_once 'config.php';

// auth.php
class Auth {
    private $db;
    private const MAX_LOGIN_ATTEMPTS = 5;
    private const LOCKOUT_TIME = 900; // 15 minutes

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    private function isRateLimited($email, $ip) {
        $stmt = $this->db->prepare("
            SELECT COUNT(*) as attempts 
            FROM failed_login_attempts 
            WHERE email = ? AND ip_address = ? 
            AND attempted_at > DATE_SUB(NOW(), INTERVAL 15 MINUTE)
        ");
        $stmt->execute([$email, $ip]);
        $result = $stmt->fetch();
        return $result['attempts'] >= self::MAX_LOGIN_ATTEMPTS;
    }

    private function logFailedAttempt($email, $ip) {
        $stmt = $this->db->prepare("
            INSERT INTO failed_login_attempts (email, ip_address) 
            VALUES (?, ?)
        ");
        $stmt->execute([$email, $ip]);
    }

    public function register($name, $email, $password) {
        try {
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new Exception('Invalid email format');
            }

            if (strlen($password) < 8) {
                throw new Exception('Password must be at least 8 characters');
            }

            // Check if email exists
            $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->fetch()) {
                throw new Exception('Email already registered');
            }

            // Hash password
            $passwordHash = password_hash($password, PASSWORD_ARGON2ID, [
                'memory_cost' => 65536,
                'time_cost' => 4,
                'threads' => 3
            ]);

            // Insert user
            $stmt = $this->db->prepare("
                INSERT INTO users (name, email, password_hash)
                VALUES (?, ?, ?)
            ");
            $stmt->execute([$name, $email, $passwordHash]);

            return ['success' => true, 'message' => 'Registration successful'];
        } catch (Exception $e) {
            error_log("Registration error: " . $e->getMessage());
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    public function login($email, $password) {
        try {
            $ip = $_SERVER['REMOTE_ADDR'];

            if ($this->isRateLimited($email, $ip)) {
                throw new Exception('Too many login attempts. Please try again later.');
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
                throw new Exception('Invalid credentials');
            }

            // Generate session token
            $token = bin2hex(random_bytes(32));
            $stmt = $this->db->prepare("
                INSERT INTO user_sessions (user_id, token, ip_address, user_agent, expires_at)
                VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))
            ");
            $stmt->execute([
                $user['id'],
                $token,
                $ip,
                $_SERVER['HTTP_USER_AGENT']
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
            return ['success' => false, 'error' => $e->getMessage()];
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

?>
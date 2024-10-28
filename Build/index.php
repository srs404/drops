<?php 

session_start();

if (!isset($_SESSION['user_token'])) {
    require_once 'App/Frontend/View/login.php';
} else {
    require_once 'App/Frontend/View/index.php';
}
exit;

?>
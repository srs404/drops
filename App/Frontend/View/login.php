<?php 

// Generate CSRF token if it doesn't exist
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drops Coffee - Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        poppins: ['Poppins', 'sans-serif'],
                    },
                    backdropBlur: {
                        xs: '2px',
                    },
                    animation: {
                        'slide-up': 'slideUp 0.5s ease-out',
                        'fade-in': 'fadeIn 0.5s ease-out',
                    },
                    keyframes: {
                        slideUp: {
                            '0%': {
                                transform: 'translateY(20px)',
                                opacity: '0'
                            },
                            '100%': {
                                transform: 'translateY(0)',
                                opacity: '1'
                            },
                        },
                        fadeIn: {
                            '0%': {
                                opacity: '0'
                            },
                            '100%': {
                                opacity: '1'
                            },
                        }
                    },
                },
            },
        }
    </script>
    <link rel="stylesheet" href="App/Frontend/CSS/style.css">
</head>

<body class="min-h-screen font-poppins bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- Background Shapes -->
    <div class="fixed inset-0 overflow-hidden -z-10">
        <div class="floating-shape absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-full -translate-x-1/2 -translate-y-1/2">
        </div>
        <div class="floating-shape absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-full translate-x-1/2 translate-y-1/2"
            style="animation-delay: -7s;">
        </div>
    </div>

    <!-- Main Container -->
    <div class="relative min-h-screen flex flex-col items-center pt-12 p-6 mb-12">
        <!-- Logo -->
        <div class="w-full max-w-md text-center mb-8 animate-slide-up">
            <h1 class="text-4xl font-semibold text-white tracking-wide">drops</h1>
        </div>

        <!-- Form Container -->
        <div class="w-full max-w-md form-container animate-fade-in">
            <div class="form-wrapper">
                <!-- Login Form -->
                <div class="login-form glass-effect rounded-3xl p-8 md:p-10 w-full">
                    <h2 class="text-2xl md:text-3xl font-medium text-white text-center mb-8">Welcome Back</h2>
                    <form id="loginForm" class="space-y-6">
                        <input type="hidden" name="action" value="login">
                        <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">

                        <div>
                            <label class="block text-gray-300 text-sm font-medium mb-2">Email</label>
                            <input type="email" name="email" required
                                class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                                placeholder="Enter your email">
                        </div>
                        <div>
                            <label class="block text-gray-300 text-sm font-medium mb-2">Password</label>
                            <input type="password" name="password" required
                                class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                                placeholder="Enter your password">
                        </div>
                        <button type="submit"
                            class="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors mt-8">
                            Sign In
                        </button>
                        <p class="text-center text-gray-400 mt-6">
                            <a href="#" id="switchToRegister" class="hover:text-white transition-colors">
                                Don't have an account? Register
                            </a>
                        </p>
                    </form>
                </div>

                <!-- Register Form -->
                <div class="register-form glass-effect rounded-3xl p-8 md:p-10 w-full">
                    <h2 class="text-2xl md:text-3xl font-medium text-white text-center mb-8">Create Account</h2>
                    <form id="registerForm" class="space-y-6">
                        <input type="hidden" name="action" value="register">
                        <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">

                        <div>
                            <label class="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                            <input type="text" name="name" required
                                class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                                placeholder="Enter your full name">
                        </div>
                        <div>
                            <label class="block text-gray-300 text-sm font-medium mb-2">Email</label>
                            <input type="email" name="email" required
                                class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                                placeholder="Enter your email">
                        </div>
                        <div>
                            <label class="block text-gray-300 text-sm font-medium mb-2">Password</label>
                            <input type="password" name="password" required
                                class="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                                placeholder="Enter your password">
                        </div>
                        <button type="submit"
                            class="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors mt-8">
                            Create Account
                        </button>
                        <p class="text-center text-gray-400 mt-6">
                            <a href="#" id="switchToLogin" class="hover:text-white transition-colors">
                                Already have an account? Login
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="App/Frontend/JS/login.js"></script>
</body>

</html>
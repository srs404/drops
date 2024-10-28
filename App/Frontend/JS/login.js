document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.querySelector('.form-container');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        formContainer.classList.add('register-active');
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        formContainer.classList.remove('register-active');
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(loginForm);
            const response = await fetch('App/Backend/Controller/api.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            console.log('Login response:', result); // Debug log

            if (result.success) {
                window.location.reload();
            } else {
                alert(result.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(registerForm);
            const response = await fetch('App/Backend/Controller/api.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            console.log('Register response:', result); // Debug log

            if (result.success) {
                alert('Registration successful! Please login.');
                formContainer.classList.remove('register-active');
                registerForm.reset();
            } else {
                alert(result.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    // Hardcoded credentials (for demo only - not secure for production)
    const validCredentials = {
        'admin': { password: 'admin123', isAdmin: true },
        'user': { password: 'user123', isAdmin: false }
    };

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (validCredentials[username] && validCredentials[username].password === password) {
            // Save login state to localStorage
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);
            localStorage.setItem('isAdmin', validCredentials[username].isAdmin);

            // Redirect to home page
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password');
        }
    });
});

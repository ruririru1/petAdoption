// auth.js - Final working version
document.addEventListener('DOMContentLoaded', function () {
    // 1. Check authentication status immediately
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    // 2. Set up UI based on user role
    updateUI();

    // 3. Set up logout button - THIS IS THE FIX
    document.getElementById('logoutBtn').addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Clear all auth data
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');

        // Force redirect to login page
        window.location.href = 'login.html';
    });
});

function updateUI() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const username = localStorage.getItem('username');

    // Update greeting
    const greeting = document.getElementById('userGreeting');
    if (greeting) {
        greeting.textContent = `Hello, ${username}${isAdmin ? ' (Admin)' : ''}`;
    }

    // Hide admin features if not admin - THIS FIXES THE POST AD LINK
    if (!isAdmin) {
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            el.style.display = 'none';
        });
    }
}
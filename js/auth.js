/**
 * AUTHENTICATION CONTROLLER
 * Handles Login, Logout, Session Identity.
 */

const AUTH = {
    SESSION_KEY: 'HMS_SESSION_TOKEN',
    USER_KEY: 'HMS_USER_DATA',

    // Simulate Login
    login: (username, password) => {
        const user = window.MOCK_DB.findUser(username);

        if (!user) {
            return { success: false, message: "User not found!" };
        }

        if (!window.MOCK_DB.verifyPassword(user, password)) {
            return { success: false, message: "Invalid password!" };
        }

        // Generate a "Fake" JWT Token
        const token = btoa(`${user.username}:${Date.now()}`);

        // Save to LocalStorage (Simulate Backend Session)
        localStorage.setItem(AUTH.SESSION_KEY, token);
        localStorage.setItem(AUTH.USER_KEY, JSON.stringify(user));

        return { success: true, user: user };
    },

    // Logout
    logout: () => {
        localStorage.removeItem(AUTH.SESSION_KEY);
        localStorage.removeItem(AUTH.USER_KEY);
        window.location.href = 'index.html';
    },

    // Get Current User
    getUser: () => {
        const userStr = localStorage.getItem(AUTH.USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    },

    // Check if Authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem(AUTH.SESSION_KEY);
    },

    // Require Auth (Redirect if not logged in)
    requireAuth: () => {
        if (!AUTH.isAuthenticated()) {
            window.location.href = 'index.html';
        }
    },

    // Redirect if already logged in (Use on Login page)
    redirectIfLoggedIn: () => {
        if (AUTH.isAuthenticated()) {
            window.location.href = 'dashboard.html';
        }
    }
};

window.AUTH = AUTH;

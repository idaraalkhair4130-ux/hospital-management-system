const authService = require('../services/authService');

const register = async (req, res) => {
    const { email, password, name, role } = req.body;
    try {
        const user = await authService.registerUser(email, password, name, role);
        res.json({ message: 'User registered', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await authService.loginUser(email, password);
        if (!result) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await authService.getUserProfile(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login, getProfile };

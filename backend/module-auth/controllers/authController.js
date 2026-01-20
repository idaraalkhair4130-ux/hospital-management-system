const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        // Pass role to service
        const data = await authService.loginUser(email, password, role);
        res.json(data);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await authService.getUserProfile(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login, getProfile };

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');
require('dotenv').config();

const registerUser = async (email, password, name, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role',
        [email, hashedPassword, name, role]
    );
    return result.rows[0];
};

const loginUser = async (email, password) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return null;

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) return null;

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
};

const getUserProfile = async (userId) => {
    const result = await pool.query('SELECT id, email, name, role FROM users WHERE id = $1', [userId]);
    return result.rows[0];
};

module.exports = { registerUser, loginUser, getUserProfile };

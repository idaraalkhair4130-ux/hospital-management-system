const { pool } = require('../db');

const generateToken = async (data) => {
    const { patient_name, doctor_id, consultation_fee } = data;
    const result = await pool.query(
        'INSERT INTO tokens (patient_name, doctor_id, consultation_fee) VALUES ($1, $2, $3) RETURNING *',
        [patient_name, doctor_id, consultation_fee]
    );
    return result.rows[0];
};

const getTokens = async () => {
    const result = await pool.query('SELECT * FROM tokens ORDER BY created_at DESC');
    return result.rows;
};

const assignDoctor = async (tokenId, doctorId) => {
    const result = await pool.query(
        'UPDATE tokens SET doctor_id = $1, status = $2 WHERE id = $3 RETURNING *',
        [doctorId, 'Assigned', tokenId]
    );
    return result.rows[0];
};

const deleteToken = async (id) => {
    await pool.query('DELETE FROM tokens WHERE id = $1', [id]);
    return { message: 'Token deleted' };
};

module.exports = { generateToken, getTokens, assignDoctor, deleteToken };

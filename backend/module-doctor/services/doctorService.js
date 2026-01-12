const { pool } = require('../db');

const createDoctor = async (data) => {
    const { name, specialization, contact, fee, schedule } = data;
    const result = await pool.query(
        'INSERT INTO doctors (name, specialization, contact, fee, schedule) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, specialization, contact, fee, schedule]
    );
    return result.rows[0];
};

const getAllDoctors = async () => {
    const result = await pool.query('SELECT * FROM doctors ORDER BY created_at DESC');
    return result.rows;
};

const getDoctorFee = async (id) => {
    const result = await pool.query('SELECT id, name, fee FROM doctors WHERE id = $1', [id]);
    return result.rows[0];
};

const getDoctorSchedule = async (id) => {
    const result = await pool.query('SELECT id, name, schedule FROM doctors WHERE id = $1', [id]);
    return result.rows[0];
};

module.exports = { createDoctor, getAllDoctors, getDoctorFee, getDoctorSchedule };

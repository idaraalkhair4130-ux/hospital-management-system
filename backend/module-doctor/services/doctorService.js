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
    try {
        const result = await pool.query('SELECT * FROM doctors ORDER BY created_at DESC');
        return result.rows;
    } catch (err) {
        console.error("⚠️ DB Error (Using Mock Doctors):", err.message);
        return [
            { id: 201, name: "Dr. House (Mock)", specialization: "Diagnostic", contact: "555-0199", fee: 500, schedule: "Mon-Fri 9-5" },
            { id: 202, name: "Dr. Strange (Mock)", specialization: "Surgery", contact: "555-0100", fee: 1000, schedule: "On Call" }
        ];
    }
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

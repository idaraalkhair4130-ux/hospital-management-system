const { pool } = require('../db');

const createPatient = async (data) => {
    const { name, age, gender, contact, address } = data;
    const result = await pool.query(
        'INSERT INTO patients (name, age, gender, contact, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, age, gender, contact, address]
    );
    return result.rows[0];
};

const getAllPatients = async () => {
    try {
        const result = await pool.query('SELECT * FROM patients ORDER BY created_at DESC');
        return result.rows;
    } catch (err) {
        console.error("⚠️ DB Error (Using Mock Patients):", err.message);
        return [
            { id: 101, name: "John Doe (Mock)", age: 30, gender: "Male", contact: "1234567890", address: "123 Mock St", created_at: new Date() },
            { id: 102, name: "Jane Smith (Mock)", age: 25, gender: "Female", contact: "0987654321", address: "456 Test Ave", created_at: new Date() }
        ];
    }
};

const getPatientById = async (id) => {
    const result = await pool.query('SELECT * FROM patients WHERE id = $1', [id]);
    return result.rows[0];
};

const updatePatient = async (id, data) => {
    const { name, age, gender, contact, address } = data;
    const result = await pool.query(
        'UPDATE patients SET name = $1, age = $2, gender = $3, contact = $4, address = $5 WHERE id = $6 RETURNING *',
        [name, age, gender, contact, address, id]
    );
    return result.rows[0];
};

module.exports = { createPatient, getAllPatients, getPatientById, updatePatient };

const { pool } = require('../db');

const createBill = async (data) => {
    const { patient_name, description, amount } = data;
    const result = await pool.query(
        'INSERT INTO bills (patient_name, description, amount) VALUES ($1, $2, $3) RETURNING *',
        [patient_name, description, amount]
    );
    return result.rows[0];
};

const getBills = async () => {
    const result = await pool.query('SELECT * FROM bills ORDER BY created_at DESC');
    return result.rows;
};

const payBill = async (id) => {
    const result = await pool.query(
        'UPDATE bills SET status = $1 WHERE id = $2 RETURNING *',
        ['Paid', id]
    );
    return result.rows[0];
};

const deleteBill = async (id) => {
    await pool.query('DELETE FROM bills WHERE id = $1', [id]);
    return { message: 'Bill deleted' };
};

module.exports = { createBill, getBills, payBill, deleteBill };

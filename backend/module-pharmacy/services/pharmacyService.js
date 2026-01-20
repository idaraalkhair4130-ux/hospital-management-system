const { pool } = require('../db');

const addMedicine = async (data) => {
    const { name, stock, price, expiry_date } = data;
    const result = await pool.query(
        'INSERT INTO medicines (name, stock, price, expiry_date) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, stock, price, expiry_date]
    );
    return result.rows[0];
};

const getMedicines = async () => {
    const result = await pool.query('SELECT * FROM medicines ORDER BY created_at DESC');
    return result.rows;
};

const updateMedicine = async (id, data) => {
    const { stock, price } = data;
    const result = await pool.query(
        'UPDATE medicines SET stock = $1, price = $2 WHERE id = $3 RETURNING *',
        [stock, price, id]
    );
    return result.rows[0];
};

const issueMedicine = async (id, quantity) => {
    const medicine = await pool.query('SELECT stock FROM medicines WHERE id = $1', [id]);
    if (medicine.rows.length === 0) throw new Error('Medicine not found');

    const currentStock = medicine.rows[0].stock;
    if (currentStock < quantity) throw new Error('Insufficient stock');

    const result = await pool.query(
        'UPDATE medicines SET stock = stock - $1 WHERE id = $2 RETURNING *',
        [quantity, id]
    );
    return result.rows[0];
};

module.exports = { addMedicine, getMedicines, updateMedicine, issueMedicine };

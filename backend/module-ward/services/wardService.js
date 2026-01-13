const { pool } = require('../db');

const addBed = async (data) => {
    const { bed_number, type, price } = data;
    const result = await pool.query(
        'INSERT INTO beds (bed_number, type, price) VALUES ($1, $2, $3) RETURNING *',
        [bed_number, type, price]
    );
    return result.rows[0];
};

const getBeds = async () => {
    const result = await pool.query('SELECT * FROM beds ORDER BY bed_number ASC');
    return result.rows;
};

const updateBedStatus = async (id, status) => {
    const result = await pool.query(
        'UPDATE beds SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
    );
    return result.rows[0];
};

const deleteBed = async (id) => {
    await pool.query('DELETE FROM beds WHERE id = $1', [id]);
    return { message: 'Bed deleted' };
};

module.exports = { addBed, getBeds, updateBedStatus, deleteBed };

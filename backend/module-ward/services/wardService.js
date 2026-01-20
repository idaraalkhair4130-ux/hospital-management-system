const { pool } = require('../db');

// Mock Data Store (In-Memory for Fallback)
let mockBeds = [
    { id: 601, bed_number: "W-101", type: "General", price: 500, status: "Available" },
    { id: 602, bed_number: "W-102", type: "General", price: 500, status: "Occupied", patient_name: "John Doe" },
    { id: 603, bed_number: "ICU-1", type: "ICU", price: 2000, status: "Available" },
    { id: 604, bed_number: "ICU-2", type: "ICU", price: 2000, status: "Occupied", patient_name: "Jane Smith" }
];

const addBed = async (data) => {
    const { bed_number, type, price } = data;
    try {
        const result = await pool.query(
            'INSERT INTO beds (bed_number, type, price) VALUES ($1, $2, $3) RETURNING *',
            [bed_number, type, price]
        );
        return result.rows[0];
    } catch (err) {
        console.error("⚠️ DB Error (Using Mock):", err.message);
        const newBed = { id: Date.now(), bed_number, type, price, status: 'Available' };
        mockBeds.push(newBed);
        return newBed;
    }
};

const getBeds = async () => {
    try {
        const result = await pool.query('SELECT * FROM beds ORDER BY bed_number ASC');
        return result.rows;
    } catch (err) {
        console.error("⚠️ DB Error (Using Mock Beds):", err.message);
        return mockBeds;
    }
};

const updateBedStatus = async (id, status) => {
    try {
        const result = await pool.query(
            'UPDATE beds SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        return result.rows[0];
    } catch (err) {
        console.error("⚠️ DB Error (Using Mock Update):", err.message);
        const bed = mockBeds.find(b => b.id == id);
        if (bed) {
            bed.status = status;
            return bed;
        }
        throw new Error("Bed not found in mock store");
    }
};

const deleteBed = async (id) => {
    try {
        await pool.query('DELETE FROM beds WHERE id = $1', [id]);
        return { message: 'Bed deleted' };
    } catch (err) {
        console.error("⚠️ DB Error (Using Mock Delete):", err.message);
        mockBeds = mockBeds.filter(b => b.id != id);
        return { message: 'Bed deleted (Mock)' };
    }
};

module.exports = { addBed, getBeds, updateBedStatus, deleteBed };

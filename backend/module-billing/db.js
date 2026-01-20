const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

const initDb = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS bills (
                id SERIAL PRIMARY KEY,
                patient_name VARCHAR(100) NOT NULL,
                description TEXT,
                amount DECIMAL(10, 2) NOT NULL,
                status VARCHAR(20) DEFAULT 'Pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ Bills table initialized");
        client.release();
    } catch (err) {
        console.error("❌ Database Connection Failed:", err.message);
    }
};

module.exports = { pool, initDb };

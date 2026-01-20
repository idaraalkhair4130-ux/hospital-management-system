const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

// Init Table
const initDb = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        role VARCHAR(20) DEFAULT 'patient',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log("✅ Users table initialized");
        client.release();
    } catch (err) {
        console.error("❌ Database Connection Failed:", err.message);
    }
};

module.exports = { pool, initDb };

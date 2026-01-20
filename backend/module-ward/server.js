const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initDb } = require('./db');
const wardRoutes = require('./routes/wardRoutes');

const app = express();
const PORT = process.env.PORT || 5006;

app.use(cors());
app.use(express.json());

// Initialize DB
initDb();

// Mount Routes
app.use('/api/beds', wardRoutes);

app.listen(PORT, () => {
    console.log(`Ward Module running on port ${PORT}`);
});

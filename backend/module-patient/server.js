const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initDb } = require('./db');
const patientRoutes = require('./routes/patientRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Initialize DB
initDb();

// Mount Routes
app.use('/api/patients', patientRoutes);

app.listen(PORT, () => {
    console.log(`Patient Module running on port ${PORT}`);
});

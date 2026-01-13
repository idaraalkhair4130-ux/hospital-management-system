const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initDb } = require('./db');
const pharmacyRoutes = require('./routes/pharmacyRoutes');

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

// Initialize DB
initDb();

// Mount Routes
app.use('/api/medicines', pharmacyRoutes);

app.listen(PORT, () => {
    console.log(`Pharmacy Module running on port ${PORT}`);
});

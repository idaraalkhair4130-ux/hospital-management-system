const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initDb } = require('./db');
const doctorRoutes = require('./routes/doctorRoutes');

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

// Initialize DB
initDb();

// Mount Routes
app.use('/api/doctors', doctorRoutes);

app.listen(PORT, () => {
    console.log(`Doctor Module running on port ${PORT}`);
});

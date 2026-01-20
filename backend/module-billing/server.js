const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initDb } = require('./db');
const billingRoutes = require('./routes/billingRoutes');

const app = express();
const PORT = process.env.PORT || 5007;

app.use(cors());
app.use(express.json());

// Initialize DB
initDb();

// Mount Routes
app.use('/api/bills', billingRoutes);

app.listen(PORT, () => {
    console.log(`Billing Module running on port ${PORT}`);
});

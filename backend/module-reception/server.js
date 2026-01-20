const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initDb } = require('./db');
const receptionRoutes = require('./routes/receptionRoutes');

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

// Initialize DB
initDb();

// Mount Routes
app.use('/api/tokens', receptionRoutes); // Base path matches prompt requirements mostly (tokens/generate)
app.use('/api', receptionRoutes); // Fallback to match exactly if needed, but safer to use /api/tokens for tokens related. 
// Prompt asked for: 
// POST   /api/tokens/generate
// GET    /api/tokens/{tokenId}
// POST   /api/appointments/assign-doctor (This is slightly different structure)

// Let's refine routing to match prompt exactly:
// We can mount specifics in server.js or handle in router.
// Currently router handles /generate -> /api/tokens/generate.
// for /api/appointments/assign-doctor we need a different mount or router.

// Simpler: Just map all to a main router or split.
// I'll add specific mounts to be safe.

app.post('/api/appointments/assign-doctor', require('./controllers/receptionController').assign);
// And the keys:
app.use('/api/tokens', receptionRoutes);

app.listen(PORT, () => {
    console.log(`Reception Module running on port ${PORT}`);
});

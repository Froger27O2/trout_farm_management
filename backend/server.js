require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Database connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test DB connection
pool.connect()
    .then(() => console.log('✅ Connected to PostgreSQL (Trout_Farm_DB)'))
    .catch(err => console.error('❌ Database connection error:', err.stack));

// Health Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'success', message: 'The Trout Farm API is running smoothly!' });
});

// --- ROUTES ---

// Auth Routes
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);

// Pond Routes (The New Stuff)
const pondRoutes = require('./src/routes/ponds');
app.use('/api/ponds', pondRoutes);

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
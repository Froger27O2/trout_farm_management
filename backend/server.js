require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import DB from our new file

const app = express();
const PORT = process.env.PORT || 5000;

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

// Import and use routes
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
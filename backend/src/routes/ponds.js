const express = require('express');
const router = express.Router();
const pool = require('../../db'); // Your Supabase connection pool

// 1. GET ALL PONDS (For the Dashboard Grid)
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ponds ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error('Fetch Ponds Error:', err.message);
        res.status(500).json({ error: "Failed to fetch ponds from the farm." });
    }
});

// 2. GET SINGLE POND DETAILS (For the Detailed View)
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM ponds WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Pond not found." });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Fetch Pond Detail Error:', err.message);
        res.status(500).json({ error: "Server error fetching pond details." });
    }
});

module.exports = router;
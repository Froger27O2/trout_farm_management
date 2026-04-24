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

// 3. CREATE NEW POND (Add Pond Form)
router.post('/', async (req, res) => {
    const { name, length, width, depth, current_count, initial_weight } = req.body;

    // --- VALIDATION BLOCK ---
    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "Pond name is required." });
    }

    if (!length || !width || !depth || length <= 0 || width <= 0 || depth <= 0) {
        return res.status(400).json({ error: "Dimensions must be positive numbers." });
    }

    if (current_count < 0 || initial_weight < 0) {
        return res.status(400).json({ error: "Fish count and weight cannot be negative." });
    }

    try {
        const volume = parseFloat(length) * parseFloat(width) * parseFloat(depth);
        const water_source = 'river';

        const newPond = await pool.query(
            `INSERT INTO ponds (name, length, width, depth, volume_m3, water_source, current_count, avg_weight_g) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
             RETURNING *`,
            [name, length, width, depth, volume, water_source, current_count, initial_weight]
        );

        res.status(201).json(newPond.rows[0]);
    } catch (err) {
        console.error('Create Pond Error:', err.message);
        res.status(500).json({ error: "Server error while creating new pond." });
    }
});

module.exports = router;
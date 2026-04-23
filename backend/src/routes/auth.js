const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../db');

const router = express.Router();

// 1. PUBLIC REGISTRATION (Forces Client Role)
router.post('/register', async (req, res) => {
    const { fullName, email, password, phone, address } = req.body;

    try {
        // Check if user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "Email is already registered." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user (Hardcoded role_id = 3 for Client)
        const newUser = await pool.query(
            `INSERT INTO users (role_id, full_name, email, password_hash, phone_number, address) 
             VALUES (3, $1, $2, $3, $4, $5) RETURNING id, full_name, email`,
            [fullName, email, hashedPassword, phone, address]
        );

        res.status(201).json({ message: "Registration successful!", user: newUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error during registration." });
    }
});

// 2. LOGIN ROUTE
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const user = result.rows[0];

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Create the JWT Token (Includes ID and Role)
        const token = jwt.sign(
            { id: user.id, role_id: user.role_id, name: user.full_name },
            process.env.JWT_SECRET,
            { expiresIn: '8h' } // Token expires in 8 hours
        );

        res.json({ 
            message: "Login successful!", 
            token, 
            user: { id: user.id, name: user.full_name, role_id: user.role_id } 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error during login." });
    }
});

module.exports = router;
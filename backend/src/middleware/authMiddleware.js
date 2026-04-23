const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // The token usually comes in as "Bearer [token]"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid or expired token." });
        req.user = user; // Attach the user info to the request
        next(); // Let them pass
    });
};

module.exports = { authenticateToken };
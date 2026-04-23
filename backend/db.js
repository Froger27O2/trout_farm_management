const { Pool } = require('pg');
require('dotenv').config();

// MASKED LOG: This will show everything EXCEPT your password
const dbUrl = process.env.DATABASE_URL || "NOT FOUND";
const maskedUrl = dbUrl.replace(/:([^:@]+)@/, ':****@');
console.log('🔍 Backend is attempting to connect with:', maskedUrl);

const pool = new Pool({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false }
});
// Your startup test query
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Failed to connect to Supabase:', err.message);
  } else {
    console.log('✅ Successfully connected to Supabase! Server time:', res.rows[0].now);
  }
});

module.exports = pool;
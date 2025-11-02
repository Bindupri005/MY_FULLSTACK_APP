// Step 1: Import necessary modules
const { Pool } = require("pg");      // 'pg' is the PostgreSQL client for Node.js
require("dotenv").config();          // Loads environment variables from .env file

// Step 2: Create a connection pool using details from .env
const pool = new Pool({
  host: process.env.DB_HOST,         // e.g., localhost or container name
  user: process.env.DB_USER,         // e.g., postgres
  password: process.env.DB_PASSWORD, // your PostgreSQL password
  database: process.env.DB_NAME,     // e.g., travelguide
  port: process.env.DB_PORT,         // usually 5432
});

// Step 3: Connect to the database and test the connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Step 4: Export the pool so other files can use it (like server.js)
module.exports = pool;

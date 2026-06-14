const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async () => {
  try {
    const result = await pool.query(
      "SELECT * FROM registrations ORDER BY submitted_at DESC"
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ rows: result.rows })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
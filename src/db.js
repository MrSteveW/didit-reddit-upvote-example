import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    require: false, // Don't require SSL but allow it
  },
});

export default pool;
export { pool as db };

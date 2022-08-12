import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pg;
const db = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});
export default db;
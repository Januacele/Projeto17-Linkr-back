import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pg;
// const db = new Pool({
//   host: process.env.DB_HOST,
//   port: 5432,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });

const user = process.env.USUARIO;
const password = process.env.SENHA;
const host = process.env.HOST;
const port = process.env.PORTPG;
const database = process.env.DATABASE_URL;

const db = new Pool({
  user,
  password,
  host,
  port,
  database
});


export default db;
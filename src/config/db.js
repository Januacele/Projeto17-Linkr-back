import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pg;

const databaseConfig = {
 user : process.env.USUARIO,
 password : process.env.SENHA,
 host : process.env.HOST,
 port : process.env.PORTPG,
 database : process.env.DATABASE_URL,

}

const db = new Pool(databaseConfig);
export default db;

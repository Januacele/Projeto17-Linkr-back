import db from '../config/db.js';


export async function getUserById(id) {
    return db.query(`SELECT * FROM users WHERE id = $1 `, [id]);
  }
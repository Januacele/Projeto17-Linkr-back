import db from '../config/db.js';


async function getUserById(userId) {
    return db.query(`SELECT * FROM users WHERE id = $1 `, [userId]);
  }

async function getUser(){
  const {authorization} = req.headers
  const token = authorization?.replace("Bearer", "").trim()

  return db.query(`
  SELECT users.id, users."userName", users."profilePicture"
  FROM users
  JOIN sessions ON sessions.token = $1
  WHERE users.id = sessions."userId";`, [token]);
}

const usersRepository = {
  getUserById,
  getUser
}

export default usersRepository;
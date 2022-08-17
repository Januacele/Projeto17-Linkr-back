
import db from '../config/db.js';


async function getUserById(id) {
    return db.query(`SELECT * FROM users WHERE id = $1 `, [parseInt(id)]);
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

async function searchUsers(username) {
  return db.query(
    `SELECT users.id, users.username, users.profile_image FROM users WHERE username LIKE '%' || $1 || '%'`,
    [username]
  );
}


export const userRepository = {
  getUserById,
  getUser,
  searchUsers
}



export default userRepository
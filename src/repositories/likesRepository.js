import db from "../config/db.js"

async function likePost(user_id, post_id) {
  return db.query(
    `INSERT INTO likes ("user_id", "post_id")
    VALUES ($1, $2)`,
    [user_id, post_id]
  )
}

async function getLikes(post_id) {
  return db.query(`
    SELECT * COUNT(user_id) as "likeCount"
    FROM likes
    JOIN users ON user_id = users.id
    WHERE post_id= $1
    `, [post_id]);
}

const likesRepository = {
  likePost,
  getLikes
}

export default likesRepository
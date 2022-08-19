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
    SELECT COUNT(user_id) as "likeCount"
    FROM likes
    JOIN users ON user_id = users.id
    WHERE post_id= $1
    `, [post_id]);
}

async function checkLike(user_id, post_id) {
  return db.query(
    `SELECT * FROM likes WHERE user_id=$1 AND post_id=$2`,
    [user_id, post_id]
  );
}

async function countLikes(post_id) {
  return db.query(`SELECT COUNT(*) FROM likes WHERE post_id=$1`, [
    post_id,
  ]);
}

async function lastUserLikes(id, user_id) {
  return db.query(
    `SELECT DISTINCT u.username FROM likes AS lp
        JOIN users AS u ON lp.user_id=u.id
        WHERE lp.post_id=$1 AND u.id<>$2
        LIMIT 2`,
    [id, user_id]
  );
}

const likesRepository = {
  likePost,
  getLikes,
  checkLike,
  countLikes,
  lastUserLikes
}

export default likesRepository
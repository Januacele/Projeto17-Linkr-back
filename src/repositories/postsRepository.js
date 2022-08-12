import db from "../config/db.js"

async function savePost(user_id, message, shared_url) {
  return db.query(
    `INSERT INTO posts ("user_id", "message", "shared_url")
    VALUES ($1, $2, $3)`,
    [user_id, message, shared_url],
  )
}

const postsRepository = {
  savePost
}

export default postsRepository

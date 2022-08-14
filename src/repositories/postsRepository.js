import db from "../config/db.js"
import SqlString from "sqlstring"

async function createPost(user_id, message, shared_url) {
  return db.query(
    `INSERT INTO posts ("user_id", "message", "shared_url")
    VALUES ($1, $2, $3)`,
    [user_id, message, shared_url],
  )
}

async function getLastPost(message) {
  return db.query(
    `SELECT 
    posts.id
    , posts.message
    , posts.shared_url as "sharedUrl"
    , posts.created_at as "createdAt"
    FROM posts 
    WHERE posts.message = $1 
    ORDER BY posts.id DESC
    LIMIT 1`,
    [message],
    )
  }
  
  export async function getPostsUsersFollows(user_id){
    return db.query(`
  SELECT posts.*, follows.followed_id, follows.follower_id, COUNT(comments.post_id) as "countComments"
  FROM posts
  JOIN follows ON follows.followed_id = posts.user_id
  LEFT JOIN comments ON comments.post_id = posts.id
  WHERE follows.follower_id"= $1
  GROUP BY posts, posts.id, follows.follower_id, follows.followed_id`, [user_id]);
}


async function repostedUserFollows(user_id){
  return db.query(`
  SELECT * FROM users
  WHERE id=$1`, [user_id]);
}

async function repostedTimeline(post_id){
  return db.query(`
  SELECT * FROM reposts
  WHERE post_id=$1`, [post.post_id]);
}
async function getAllHashtags() {
  return db.query(
    `SELECT * 
    FROM hashtags`,
  )
}



async function createHashtags(hashtags) {
  const valuesText = hashtags.reduce((acc, hashtag, index) => {
    if (index === hashtags.length - 1)
    return (acc += `(${SqlString.escape(hashtag)})`)
    else return (acc += `(${SqlString.escape(hashtag)}), `)
  }, "")
  
  const queryText = `INSERT INTO 
  hashtags (name) 
  VALUES ${valuesText}
  RETURNING id`
  
  return db.query(queryText)
}

async function createRelationHashtagPost(postId, hashtagId) {
  const queryText = `INSERT INTO 
  posts_hashtags (post_id, hashtag_id) 
  VALUES (${postId}, ${hashtagId})
  RETURNING id`

  return db.query(queryText)
}


const postsRepository = {
  createPost,
  getLastPost,
  getAllHashtags,
  createHashtags,
  createRelationHashtagPost
}
export default postsRepository
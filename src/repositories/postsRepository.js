import db from "../config/db.js"
import SqlString from "sqlstring"

async function createPost(
  user_id, 
  message,
  shared_url,
  title_link,
  image_link,
  description_link) {
  return db.query(
    `INSERT INTO posts (user_id, message, shared_url, title_link,
      image_link, description_link)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [user_id, message, shared_url, title_link, image_link, description_link],
  );
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

async function filterPostsByUser(id) {
  const query = `
        SELECT posts.*, users.username AS username, users.profile_image AS picture
        FROM posts 
        JOIN users ON users.id = posts.user_id
        WHERE users.id = $1
        ORDER BY posts.id DESC
    `;
  return db.query(query, [id]);
}

async function findPost(id) {
  return db.query(`SELECT * FROM posts WHERE id=$1`, [id]);
}

async function updateDescription(id, message) {
  return db.query(`UPDATE posts SET message=$1 WHERE id=$2`, [
    message,
    id,
  ]);
}

const postsRepository = {
  createPost,
  getLastPost,
  getAllHashtags,
  createHashtags,
  createRelationHashtagPost,
  filterPostsByUser,
  findPost,
  updateDescription
}
export default postsRepository
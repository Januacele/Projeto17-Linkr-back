import db from "../config/db.js"

async function savePost(user_id, message, shared_url) {
  return db.query(
    `INSERT INTO posts ("user_id", "message", "shared_url")
    VALUES ($1, $2, $3)`,
    [user_id, message, shared_url],
  )
}

async function getPostsUsersFollows(){
  return db.query(`
  SELECT posts.*, follows.followed_id, follows.follower_id, COUNT(comments.post_id) as "countComments"
  FROM posts
  JOIN follows ON follows.followed_id = posts.user_id
  LEFT JOIN comments ON comments.post_id = posts.id
  WHERE follows.follower_id"= $1
  GROUP BY posts, posts.id, follows.follower_id, follows.followed_id`, [posts.user_id]);
}

async function getPostsTimeline(){
  return db.query(`
  SELECT posts.*, users.username, users.profile_image,
  COUNT(comments.posts_id) as "countComments"
  FROM posts
  JOIN users ON posts.user_id = users.id
  LEFT JOIN comments ON comments.post_id = posts.id
  WHERE posts.id=$1
  GROUP BY posts.id, users.username, users.profile_image`, [posts.post_id])
}

async function repostedUserFollows(user_id){
  return db.query(`
  SELECT * FROM users
  WHERE id=$1`, [user_id]);
}

async function repostedTimeline(post_id){
  return db.query(`
  SELECT * FROM reposts
  WHERE post_id=$1`, [post_id]);
}

const postsRepository = {
  savePost,
  getPostsUsersFollows,
  getPostsTimeline,
  repostedUserFollows,
  repostedTimeline
}

export default postsRepository

import db from '../config/db.js';

async function shareExist(user_id, post_id) {
    return db.query(
      `SELECT COUNT(*) FROM posts WHERE user_id=$1 AND id=$2`,
      [user_id, post_id]);
}

async function sharePost(post_id, user_id) {
    return db.query(
      `INSERT INTO reposts (post_id, user_id) 
          VALUES ($1, $2)`,
      [post_id, user_id]);
}

async function countShares(post_id) {
    return db.query(
      `SELECT COUNT(*) FROM posts WHERE id=$1`,
      [post_id]);
  };

const shareRepository = {
    shareExist,
    sharePost,
    countShares
}

export default shareRepository;
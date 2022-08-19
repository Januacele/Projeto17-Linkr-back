import db from '../config/db.js';

async function insertComment(post_id, user_id, message) {
    return db.query(
      `INSERT INTO comments (post_id, user_id, message) VALUES ($1,$2,$3)`, [post_id, user_id, message]
    );
}

async function getComments(user_id) {
    return db.query(
      `SELECT comments.*,
      t1.username,
      t1.profile_image,
      t2.user_id as "postAuthor" 
      FROM comments 
      JOIN users as t1 ON comments.user_id=t1.id 
      JOIN posts as t2 ON comments.post_id=t2.id 
      WHERE comments.post_id=$1`, [user_id]
    );
  };

const commentRepository = {
    insertComment,
    getComments
}

export default commentRepository;
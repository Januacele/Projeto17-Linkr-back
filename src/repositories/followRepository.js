import db from "../config/db.js";


async function insertFollow(user_id, following) {
    return db.query(`INSERT INTO follows (user_id, following) VALUES ($1, $2)`, [
      parseInt(user_id),
      parseInt(following),
    ]);
  }

async function getFollow(user_id, following) {
    return db.query(
      `SELECT * FROM follows WHERE user_id = $1 AND following = $2`,
      [parseInt(user_id), parseInt(following)]
    );
  }

  async function getAllFollowed(user_id) {
    return db.query(`SELECT * FROM follows WHERE "user_id"= $1`, [
      parseInt(user_id),
    ]);
  }

  async function deleteFollow(user_id, following) {
    return db.query(
      `DELETE FROM follows WHERE "user_id" = $1 AND following = $2`,
      [parseInt(user_id), parseInt(following)]
    );
  }
  

  const followRepository = {
    insertFollow,
    getFollow,
    getAllFollowed,
    deleteFollow
  };
  
  export default followRepository;
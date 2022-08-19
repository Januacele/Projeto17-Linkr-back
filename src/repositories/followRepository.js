import db from "../config/db.js";


async function insertFollow(followed_id, following_id) {
    return db.query(`INSERT INTO follows (followed_id, follower_id) VALUES ($1, $2)`, [
      parseInt(followed_id),
      parseInt(following_id),
    ]);
  }

async function getFollow(followed_id, following_id) {
  console.log(followed_id, following_id)
    return db.query(
      `SELECT * FROM follows WHERE "followed_id" = $1 AND "follower_id" = $2`,
      [
        parseInt(followed_id),
        parseInt(following_id),
      ]
    );
  }

  async function getAllFollowed(following_id) {
    return db.query(`SELECT * FROM follows WHERE "follower_id"= $1`, [
      parseInt(following_id),
    ]);
  }

  async function deleteFollow(followed_id, following_id) {
    return db.query(
      `DELETE FROM follows WHERE followed_id = $1 AND follower_id = $2`,
      [parseInt(followed_id), parseInt(following_id)]
    );
  }

  async function getAllFollowedArray(followed_id) {
    return db.query(`SELECT ARRAY (SELECT follower_id FROM follows WHERE followed_id=$1)`, [
      parseInt(followed_id)
    ]);
  }
  

  const followRepository = {
    insertFollow,
    getFollow,
    getAllFollowed,
    deleteFollow,
    getAllFollowedArray
  };
  
  export default followRepository;
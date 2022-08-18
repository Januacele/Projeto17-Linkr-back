import db from "../config/db.js";


async function insertFollow(idUser, idFollowed) {
    return db.query(`INSERT INTO follows (user_id, following) VALUES ($1, $2)`, [
      parseInt(idUser),
      parseInt(idFollowed),
    ]);
  }

async function getFollow(idUser, idFollowed) {
    return db.query(
      `SELECT * FROM follows WHERE user_id = $1 AND following = $2`,
      [parseInt(idUser), parseInt(idFollowed)]
    );
  }



  const followRepository = {
    insertFollow,
    getFollow,
  };
  
  export default followRepository;
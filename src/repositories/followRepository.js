import db from "../config/db.js";


async function insertFollow(customer, following) {
    return db.query(`INSERT INTO follows (customer, following) VALUES ($1, $2)`, [
      parseInt(customer),
      parseInt(following),
    ]);
  }

async function getFollow(customer, following) {
    return db.query(
      `SELECT * FROM follows WHERE customer = $1 AND following = $2`,
      [parseInt(customer), parseInt(following)]
    );
  }

  async function getAllFollowed(customer) {
    return db.query(`SELECT * FROM follows WHERE "customer"= $1`, [
      parseInt(customer),
    ]);
  }

  async function deleteFollow(customer, following) {
    return db.query(
      `DELETE FROM follows WHERE customer = $1 AND following = $2`,
      [parseInt(customer), parseInt(following)]
    );
  }
  

  const followRepository = {
    insertFollow,
    getFollow,
    getAllFollowed,
    deleteFollow
  };
  
  export default followRepository;
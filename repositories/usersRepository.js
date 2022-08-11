import res from 'express/lib/response';
import db from '../config/db.js';


export async function getUserById(id) {
    return db.query(`SELECT * FROM users WHERE id = $1 `, [id]);
  }

export async function getUserByName(){
  const { searchString } = req.body;
  return db.query(`
    SELECT * FROM (
      (
        SELECT users.id, users.username, users.profile_image, (users.id IN (
          SELECT follows.followed_id FROM follows
          WHERE follows.follower_id = $1
        )) AS follower FROM users
      )
    ) AS result WHERE result.username LIKE $2
    ORDER BY follower DESC`, [res.locals.user_id, searchString + '%']
    );
}
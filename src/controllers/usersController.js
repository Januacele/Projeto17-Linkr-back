import usersRepository from '../repositories/usersRepository.js';
import postsRepository from '../repositories/postsRepository.js';
import db from '../config/db.js';

export const getUsersByNameFollowersFirst = async (req, res) => {
    try {
        const {searchString} = req.body
        const result = await db.query(
            `SELECT * FROM (
                (
                    SELECT users.id, users.username, users.profile_image, (users.id IN (
                        SELECT follows.followed_id FROM follows
                        WHERE follows.follower_id = $1
                    )) AS follower FROM users
                )
            ) AS result WHERE result.username LIKE $2
            ORDER BY follower DESC;`,
            [res.locals.user_id, searchString + '%']
        )
        return res.status(200).send(result)
    } catch(error) { 
        return res.status(500).send(error) 
    }
}

export const getUser = async (req, res) => {
  const {authorization} = req.headers
  const token = authorization?.replace("Bearer", "").trim()
    try {
        const result1 = await db.query(`Select * from sessions
            where token = $1`,[token])
        console.log(result1.rows[0].user_id)
        let id = result1.rows[0].user_id
        const result = await usersRepository.getUserById(id);
       
        return res.status(200).send(result);

    } catch(error) { 
        return res.status(500).send(error) 
    }
}

export async function userByToken(req, res) {
    const { user } = res.locals;
    res.status(200).send(res.locals);
}
  

export async function getPostsByUser(req, res) {
    const { id } = req.params;
  
    try {
      const userPosts = await postsRepository.filterPostsByUser(id);
  
      const limit = 20;
      if (userPosts.rowCount === 0) {
        res.sendStatus(204);
        return;
      } else if (userPosts.rowCount <= limit) {
        res.status(200).send(userPosts.rows);
        return;
      }

      const start = 0;
      const end = limit;
  
      res.status(200).send(userPosts.rows.splice(start, end));
    } catch (error) {
      console.log(error.message);
      res.sendStatus(error.message);
    }
  }


  export async function getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await usersRepository.getUserById(id);
  
      res.status(200).send(user.rows[0]);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
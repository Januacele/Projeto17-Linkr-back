import usersRepository from '../repositories/usersRepository.js';
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
        const user = result.rows[0]
        return res.status(200).send(user)

    } catch(error) { 
        return res.status(500).send(error) 
    }
}
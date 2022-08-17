// import postsRepository from '../repositories/postsRepository.js';
// import repostsRepository from '../repositories/repostsRepository.js';

import db from "../config/db.js";

export async function validateTimeline(req, res, next){
    try{
        const {user_id} = res.locals;
        const postsData = await db.query(`SELECT posts.*, follows.follower_id, follows.followed_id, COUNT(comments.post_id) as "countComments"
                                                FROM posts
                                                JOIN follows ON follows.followed_id = posts.user_id
                                                LEFT JOIN comments ON comments.post_id = posts.id
                                                WHERE follows.follower_id= $1
                                                GROUP BY posts, posts.id, follows.follower_id, follows.followed_id`, [user_id]);
        const posts = postsData.rows

        const repostsData = await db.query(`SELECT reposts.*, follows.follower_id, follows.followed_id FROM reposts
                                                JOIN follows ON follows.followed_id = reposts.user_id
                                                WHERE follows.follower_id=$1`, [user_id]);
        const reposts = repostsData.rows

        const timelineList = [...posts, ...reposts]
        res.locals = {
            timelineList
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Erro ao acessar o banco de dados.'})
    }
    next()
} 
      
  
      
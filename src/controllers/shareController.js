import postsRepository from "../repositories/postsRepository.js";
import shareRepository from "../repositories/shareRepository.js";
import usersRepository from "../repositories/usersRepository.js";

export async function sharePost(req, res) {
    try {
      const { post_id } = req.body;
      const userId = res.locals.userId;
      console.log(post_id, userId)
  
      const post = await postsRepository.findPost(post_id);
      if (post.rowCount === 0) {
        return res.sendStatus(404);
      }
  
      const exist = await shareRepository.shareExist(userId, post_id);
      if (exist.rows[0].count === 0) {
        return res.sendStatus(409);
      }
  
      await shareRepository.sharePost(userId, post_id);
      return res.sendStatus(201);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
  

  export async function countShares(req, res) {
    try {
      const { id } = req.params;
      const post = await postsRepository.findPost(id);
      if (post.rowCount === 0) {
        return res.sendStatus(404);
      }
  
      const user = await usersRepository.getUserById(post.rows[0].user_id);
   
      const count = await postsRepository.countShares(id);
      return res.status(200).send({
        count: count.rows[0].count,
        user: {
          id: user.rows[0].id,
          username: user.rows[0].username,
          profile_image: user.rows[0].profile_image,
        },
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
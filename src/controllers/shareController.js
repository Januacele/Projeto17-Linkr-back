import postsRepository from "../repositories/postsRepository.js";
import shareRepository from "../repositories/shareRepository.js";

export async function sharePost(req, res) {
    try {
      const { post_id } = req.body;
      const user = res.locals.user;
  
      const post = await postsRepository.findPost(post_id);
      if (post.rowCount === 0) {
        return res.sendStatus(404);
      }
  
      const exist = await shareRepository.shareExist(user.id, post.rows[0].id);
      if (exist.rows[0].count === 0) {
        return res.sendStatus(409);
      }
  
      await shareRepository.sharePost(user.id, post.rows[0]);
      return res.sendStatus(201);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
  
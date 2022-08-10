import postsRepository from '../repositories/postsRepository.js';
import repostsRepository from '../repositories/repostsRepository.js';

export async function validateTimeline(req, res, next) {
    try {
        const {user_id} = res.locals;
        const postsUsers = await postsRepository.getPostsUsersFollows(user_id);
        const posts = postsUsers.rows;

        const repostsTimeline = await repostsRepository.getRepostsTimeline(user_id);
        const reposts = repostsTimeline.rows;

        const timelineList = [...posts, ...reposts]
        res.locals = {
            timelineList
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Error rendering posts");
    }
    next();
}
      
  
      
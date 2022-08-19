import commentRepository from "../repositories/commentRepository";
import followRepository from '../repositories/followRepository.js';

export async function addComment(req, res) {
    try {
      const { id: user_id } = res.locals.user;
      const { post_id, message } = req.body;
  
      const newComment = await commentRepository.insertComment(
        post_id,
        user_id,
        message
      );
      return res.status(200).send(newComment);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
}

export async function getComments(req, res) {
    try {
      const user = res.locals.user;
      const { id: post_id } = req.params;
      const postComments = await commentRepository.getComments(post_id);
      const arrayFollowers = await followRepository.getAllFollowedArray(user.id);
  
      postComments.rows.map((comment) => {
        if (comment.user_id === comment.postAuthor) {
          comment.type = "post's author";
        } else if (arrayFollowers.rows[0].array.includes(comment.customer)) {
          comment.type = "following";
        } else {
          comment.type = "";
        }
      });
      console.log();
      return res.status(200).send(postComments.rows);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }


  export async function countComments(req, res) {
    try {
      const { id: post_id } = req.params;
      const postComments = await commentRepository.countComments(post_id);
      return res.status(200).send(postComments.rows[0].count);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
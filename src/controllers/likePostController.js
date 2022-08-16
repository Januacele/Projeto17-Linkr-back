import likesRepository from "../repositories/likesRepository.js"
import db from "../config/db.js"

export async function likePost(req, res) {
  const user_id = res.locals.userId;
  const { post_id } = req.params;

  try {
    await likesRepository.likePost(user_id, post_id)
    return res.status(200).json({message:'Post liked.'})
  } catch(error) { 
      console.log(error)
      return res.status(500).send(error.data)
  }
}

export async function unlikePost(req, res) {
  const user_id = res.locals.userId;
  const { post_id } = req.params;

  try {
    await db.query(`DELETE FROM likes WHERE post_id = $1 AND user_id = $2;`, [post_id, user_id])
    return res.status(200).json({message:'Post unliked.'})
  } catch(error) { 
      console.log(error)
      return res.status(500).send(error.data)
  }
}

export async function getLikes(req, res) {
  const user_id = res.locals.userId;
  const { post_id } = req.params;

  try {
    const likes = await likesRepository.getLikes(post_id);
    return res.status(200).send(likes);
  } catch(error) { 
      console.log(error)
      return res.status(500).send(error.data)
  }
}
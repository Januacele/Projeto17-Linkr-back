import postsRepository from "../repositories/postsRepository.js"

export async function savePost(req, res) {
  const { message, shared_url } = req.body;
  const user_id = res.locals.userId;

  try {
      await postsRepository.savePost(user_id, message, shared_url);
      return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
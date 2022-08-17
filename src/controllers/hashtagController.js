import hashtagRepository from "../repositories/hashtagRepository.js"

export async function getHashtag(req, res) {
  console.log("ALO CONTROLLER")
  try {
    const result = await hashtagRepository.getHashtag();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
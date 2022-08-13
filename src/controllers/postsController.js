import postsRepository from "../repositories/postsRepository.js"
import db from '../config/db.js'

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


const findUniqueHashtags = message => {
  let hashtags = [];
  let newHashtag = [];
  let readNewHashtag = false;
  for(let i = 0; i <= message.length; i++) {
      if(message[i] === "#") {
          readNewHashtag = true;
          newHashtag = ["#"];
          continue;
      }
      if(readNewHashtag) {
          if(message[i] === "#" || message[i] === " " || i === message.length) {
              hashtags.push(newHashtag.join(""));
              readNewHashtag = false;
              continue;
          }
          newHashtag.push(message[i]);
      }
  }

  let uniqueHashtags = [];
  for(let ht of hashtags) {
      if(!uniqueHashtags.includes(ht))
          uniqueHashtags.push(ht);
  }

  return uniqueHashtags
}

export const editPostController = async (req, res) => {
  const {id, message, user_id} = res.locals.editPostData

  const uniqueHashtags = findUniqueHashtags(message)

  try {
      const oldHashtags = (await db.query(
          `SELECT "PostsHashtags"."hashtagId", hashtags.name 
           FROM "PostsHashtags"
           JOIN hashtags ON "PostsHashtags"."hashtagId" = hashtags.id
           WHERE "PostsHashtags".post_id = $1
          `,
      [ id ])).rows

      const newHashtags = uniqueHashtags.filter(e => !(oldHashtags.map(({name}) => name).includes(e)))
      const noMoreHashtags = oldHashtags.filter(({name}) => !(uniqueHashtags.includes(name)))

      console.log(newHashtags, oldHashtags, uniqueHashtags, noMoreHashtags)

      await db.query(
          `UPDATE posts
           SET message = $1
           WHERE id = $2 AND user_id = $3;`, [message, id, user_id])
      for(let ht of newHashtags) {
          let tagId = await hashtagsRepository.getHashtagIdByTag(ht);
          await db.query(
              `INSERT INTO "PostsHashtags" (post_id, hashtag_id)
              VALUES ($1, $2)`, [id, tagId]
          );
      }
      for(let ht of noMoreHashtags) {
          await db.query(
              `DELETE FROM "PostsHashtags"
              WHERE "PostsHashtags".post_id = $1 AND "PostsHashtags".hashtag_id = $2`, [id, ht.hashtag_id]
          );
      }
      return res.status(200).json({message:'Post editado.'})
  } catch(error) { 
      console.log(error)
      return  res.status(500).send(error.data)
  }
}
import postsRepository from "../repositories/postsRepository.js"
import urlMetadata from "url-metadata"
import db from "../config/db.js"


export async function savePost(req, res) {
  const { message, shared_url } = req.body;
  const user_id = res.locals.userId;
  
  console.log("1")
  const hashtagExp = new RegExp("#([a-zA-ZãÃÇ-Üá-ú]*)", "gi") //Regex que separa as #'s pela inicial das demais palavras
  const hashtags = message?.match(hashtagExp)
  const uniqueHashtags = [...new Set(hashtags)] //lsita para cada # do post enviado
  
  try {
    const foundHashtags = await postsRepository.getAllHashtags()
    console.log("2")
    let notFoundHastags = []
    let alreadyCreatedHashtags = []
    let allHashtagsId = []
  
    uniqueHashtags.forEach((hashtag, index) => { //ForEach para cada # do post enviado
      let hashtagText = hashtag.split("#")[1]
      console.log(hashtagText)
  
      const findResult = foundHashtags.rows.find((foundHashtag) => {
        return foundHashtag.name === hashtagText
      })
      if (!findResult) {
        notFoundHastags.push(hashtagText)
      } else {
        alreadyCreatedHashtags.push({ id: findResult.id })
      }
    })
  
    allHashtagsId = [...alreadyCreatedHashtags]
    console.log(allHashtagsId)
    try {
      console.log("3")
      if (notFoundHastags.length > 0) {
        const createdResult = await postsRepository.createHashtags(
          notFoundHastags,
        )
        allHashtagsId = [...alreadyCreatedHashtags, ...createdResult.rows]
      }
     
      try {
        console.log("4")
        console.log(user_id,shared_url,message)
       
        const result = await  db.query(
          `INSERT INTO posts ("user_id", "message", "shared_url")
          VALUES ($1, $2, $3)`,
          [user_id, message, shared_url],
        )
  
        const lastPost = await postsRepository.getLastPost(message)
        const lastPostInfo = lastPost.rows[0]
  
        allHashtagsId.forEach(async (hashtagId) => {
          const createRelationHashtagPost =
            await postsRepository.createRelationHashtagPost(
              lastPostInfo.id,
              hashtagId.id,
            )
        })
  
        const createdPost = {
          ...{ ...lastPost.rows[0] },
        }
        if (result.rowCount === 1) {
          try {
            const metadata = await urlMetadata(shared_url)
  
            createdPost.previewTitle = metadata.title
            createdPost.previewImage = metadata.image
            createdPost.previewDescription = metadata.description
            createdPost.previewUrl = metadata.url
  
            return res.status(201).send({ ...createdPost })
          } catch (error) {
            console.log("Error:", error)
            return res.status(201).send({ ...createdPost })
          }
        } else return res.sendStatus(400)
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  
      
    } catch (error) {
      console.log("Error:", error)

      return res.send(error)
    }
  } catch (error) {
    console.log("Error:", error)

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

export async function getPosts(req, res) {
  try {
    const query = `
        SELECT posts.*, users.username AS username, users.profile_image AS picture
        FROM posts 
        JOIN users ON users.id = posts.user_id
        ORDER BY posts.id DESC
    `;
    const allPosts = await db.query(query);
    if (allPosts.rowCount === 0) {
      res.sendStatus(204);
      return;
    }
    res.status(200).send(allPosts.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
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


export const deletePostController = async (req, res) => {
    const { id } = res.locals
    try {
        await db.query(`DELETE FROM "PostsHashtags" WHERE post_id = $1;`, [id])
        await db.query(`DELETE FROM likes WHERE post_id = $1;`, [id])
        await db.query(`DELETE FROM posts WHERE id = $1;`, [id])
        return res.status(200).json({message:'Post deletado.'})
    } catch(error) { 
        console.log(error)
        return  res.status(500).send(error.data)
    }
}
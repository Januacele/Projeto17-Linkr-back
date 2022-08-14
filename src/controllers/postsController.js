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

// export async function savePost(req, res){
  // try {
    // SELECT 
    // posts.id
    // , posts.message
    // , posts.shared_url as "sharedUrl"
    // , posts.created_at as "createdAt"
    // , posts.user_id as "userId"
    // , users.username
    // , users.profile_image as "profileImage"
    // from posts
    // JOIN users on users.id = posts.user_id
    // JOIN posts_hashtags ph ON ph.post_id = posts.id
    // JOIN hashtags ON hashtags.id=ph.hashtag_id
    // WHERE posts.deleted IS NOT true AND hashtags.id=11
    // GROUP BY posts.id, users.id
    // ORDER BY posts.created_at DESC
    // LIMIT 20
//   } catch (error) {
    
//   }
// }
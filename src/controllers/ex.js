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
     //AQUI ACABAM AS #

      try { //ESSE TRY ESTA REPETIDO
        console.log("4")
        console.log(user_id,shared_url,message)
       
        try {
          const metadata = await urlMetadata(shared_url)
          const {
            title: title_link,
            image: image_link,
            message: description_link,
          } = metadata;
          
          const result = await postsRepository.createPost(
            user_id,
            message,
            shared_url,
            title_link,
            image_link,
            description_link
          );
          const postId = result.rows[0].id;
          res.locals.postId = postId;
          
          res.status(201).send({ ...createdPost })
        } catch (error) {
          console.log("Error:", error)
          res.status(400).send({ ...createdPost })
        }
     

  
        const lastPost = await postsRepository.getLastPost(message)
        const lastPostInfo = lastPost.rows[0]
       //DEPOIS DE PUBLICAR O POST PRECISO CRIAR A RELAÇÃO POST #
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
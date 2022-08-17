import { Router } from "express"
import { savePost, editPost, deletePostController, getPosts, getPostsByHashtag } from "../controllers/postsController.js"
import { validateSchema } from "../middlewares/schemaValidator.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"
import { deletePostValidation } from "../middlewares/validatePost.js"
import { postSchema } from "../schemas/postSchema.js"

const postsRouter = Router()

postsRouter.post("/posts", tokenValidation, validateSchema(postSchema), savePost)
postsRouter.get("/posts", tokenValidation, getPosts);
postsRouter.get("/posthashtags/:name", getPostsByHashtag);
postsRouter.put('/editpost/:id', tokenValidation, editPost)
postsRouter.delete('/deletepost/:id', deletePostValidation, deletePostController)

export default postsRouter

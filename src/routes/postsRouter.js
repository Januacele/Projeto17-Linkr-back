import { Router } from "express"
import { savePost, editPostController, deletePostController, getPosts } from "../controllers/postsController.js"
import { validateSchema } from "../middlewares/schemaValidator.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"
import { editPostValidation, deletePostValidation } from "../middlewares/validatePost.js"
import { postSchema, editPostSchema } from "../schemas/postSchema.js"

const postsRouter = Router()

postsRouter.post("/posts", tokenValidation, validateSchema(postSchema), savePost)
postsRouter.get("/posts", tokenValidation, getPosts);
postsRouter.put('/editpost', editPostValidation, validateSchema(editPostSchema), editPostController)
postsRouter.delete('/deletepost/:id', deletePostValidation, deletePostController)
postsRouter.get("/posts", tokenValidation, getPosts);

export default postsRouter

import { Router } from "express"
import { savePost, editPostController } from "../controllers/postsController.js"
import { validateSchema } from "../middlewares/schemaValidator.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"
import { editPostValidation } from "../middlewares/validatePost.js"
import { postSchema, editPostSchema } from "../schemas/postSchema.js"

const postsRouter = Router()

postsRouter.post("/posts", tokenValidation, validateSchema(postSchema), savePost)
postsRouter.put('/editpost', editPostValidation, validateSchema(editPostSchema), editPostController)

export default postsRouter

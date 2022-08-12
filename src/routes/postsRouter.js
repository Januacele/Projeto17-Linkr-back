import { Router } from "express"
import { savePost } from "../controllers/postsController.js"
import { validateSchema } from "../middlewares/schemaValidator.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"
import { postSchema } from "../schemas/postSchema.js"

const postsRouter = Router()

postsRouter.post("/posts", tokenValidation, validateSchema(postSchema), savePost)

export default postsRouter

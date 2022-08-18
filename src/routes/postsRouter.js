import { Router } from "express"
import { savePost, editPost, deletePostController, getPosts, getNewPosts, getPostsByHashtag } from "../controllers/postsController.js"
import { validateSchema } from "../middlewares/schemaValidator.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"
import { deletePostValidation } from "../middlewares/validatePost.js"
import { postSchema } from "../schemas/postSchema.js"
import { userHashtagValidation } from '../middlewares/validatePost.js';
import {getTimelineController} from '../controllers/timelineController.js';

const postsRouter = Router()

postsRouter.post("/posts", tokenValidation, validateSchema(postSchema), savePost)
postsRouter.get("/posts", tokenValidation, getPosts);
postsRouter.get("/posts/new/:id", tokenValidation, getNewPosts);
postsRouter.get("/posthashtags/:name",tokenValidation, userHashtagValidation, getTimelineController);
postsRouter.put('/editpost/:id', tokenValidation, editPost)
postsRouter.delete('/deletepost/:id', deletePostValidation, deletePostController)

export default postsRouter

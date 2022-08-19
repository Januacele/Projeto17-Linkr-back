import { Router } from "express";
import { savePost, editPost, deletePostController, getPosts, getNewPosts, getPostsByHashtag } from "../controllers/postsController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { deletePostValidation } from "../middlewares/validatePost.js";
import { postSchema } from "../schemas/postSchema.js";
import { commentSchema } from "../schemas/commentSchema.js";
import { userHashtagValidation } from '../middlewares/validatePost.js';
import {getTimelineController} from '../controllers/timelineController.js';
import { addComment, getComments, countComments } from '../controllers/commentController.js';
import { sharePost, countShares } from '../controllers/shareController.js';

const postsRouter = Router()

postsRouter.post("/posts", tokenValidation, validateSchema(postSchema), savePost) // working
postsRouter.get("/posts", tokenValidation, getPosts);// working
postsRouter.get("/posts/new/:id", tokenValidation, getNewPosts);// working
postsRouter.get("/posthashtags/:name",tokenValidation, userHashtagValidation, getTimelineController);// working
postsRouter.put('/editpost/:id', tokenValidation, editPost)// working
postsRouter.delete('/deletepost/:id', deletePostValidation, deletePostController)// working
postsRouter.post("/posts/comment", tokenValidation, validateSchema(commentSchema), addComment);// working
postsRouter.get("/posts/comment/:id", tokenValidation, getComments);// working
postsRouter.get("/posts/commentcount/:id", tokenValidation, countComments);// working
postsRouter.post("/posts/share", tokenValidation, sharePost);// Erro de Foreign Key
postsRouter.get("/posts/sharecount/:id", tokenValidation, countShares);// Depende do erro acima

export default postsRouter

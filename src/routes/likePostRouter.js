import { Router } from 'express';
import { tokenValidation } from '../middlewares/tokenValidation.js';
import { likePost, unlikePost, getLikes, checkPostLikes, countLikes } from '../controllers/likePostController.js';

const likePostRouter = Router()

likePostRouter.post('/likes/:post_id', tokenValidation, likePost);
likePostRouter.delete('/likes/:post_id', tokenValidation, unlikePost);
likePostRouter.get('/likes/:post_id', tokenValidation, getLikes);
likePostRouter.post("/posts/checklike", tokenValidation, checkPostLikes);
likePostRouter.get("/posts/likecount/:id", tokenValidation, countLikes);


export default likePostRouter
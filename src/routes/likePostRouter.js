import { Router } from 'express';
import { tokenValidation } from '../middlewares/tokenValidation.js';
import { likePost, unlikePost, getLikes, checkPostLikes, countLikes } from '../controllers/likePostController.js';

const likePostRouter = Router()

likePostRouter.post('/likes/:post_id', tokenValidation, likePost);// working
likePostRouter.delete('/likes/:post_id', tokenValidation, unlikePost);// working
likePostRouter.get('/likes/:post_id', tokenValidation, getLikes);// working
likePostRouter.post("/posts/checklike", tokenValidation, checkPostLikes);// working
likePostRouter.get("/posts/likecount/:id", tokenValidation, countLikes);// working


export default likePostRouter
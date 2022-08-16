import { Router } from 'express';
import { tokenValidation } from '../middlewares/tokenValidation.js';
import { likePost, unlikePost, getLikes } from '../controllers/likePostController.js';

const likePostRouter = Router()

likePostRouter.post('/likes/:post_id', tokenValidation, likePost);
likePostRouter.delete('/likes/:post_id', tokenValidation, unlikePost);
likePostRouter.get('/likes/:post_id', tokenValidation, getLikes);

export default likePostRouter
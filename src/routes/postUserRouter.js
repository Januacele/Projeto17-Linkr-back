import { Router } from 'express';
import { tokenValidation } from '../middlewares/tokenValidation.js';
import { userPageValidation } from '../middlewares/validatePost.js';
import {getTimelineController} from '../controllers/timelineController.js';

const postUserRouter = Router()


postUserRouter.get('/user/:id', tokenValidation, userPageValidation, getTimelineController);


export default postUserRouter
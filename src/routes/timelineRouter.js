import { Router } from 'express';
import { tokenValidation } from '../middlewares/tokenValidation.js';
import { validateTimeline } from '../middlewares/validateTimeline.js';
import { getTimelineController } from '../controllers/timelineController.js';


const timelineRouter = Router();

timelineRouter.get("/timeline", tokenValidation, validateTimeline, getTimelineController);


export default timelineRouter;
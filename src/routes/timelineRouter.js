import { Router } from 'express';
import { validateToken } from '../../middlewares/validateToken.js';
import { validateTimeline } from '../../middlewares/validateTimeline.js';
import { getTimelineController } from '../controllers/timelineController.js';


const timelineRouter = Router();

timelineRouter.get("/timeline", validateToken, validateTimeline, getTimelineController);



export default timelineRouter;
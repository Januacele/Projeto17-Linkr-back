import { Router } from 'express';
import timelineRouter from './timelineRouter.js';
import usersRouter from '../routes/usersRouter.js';


const router = Router();


router.use(timelineRouter);
router.use(usersRouter);

export default router;
import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { schemaValidator } from '../middlewares/schemaValidator.js';
import { getUsersByNameSchema } from '../schemas/userSchemas.js';
import { getUsersByNameFollowersFirst} from '../controllers/usersController.js';

const usersRouter = Router ();

usersRouter.post('/users', validateToken, schemaValidator(getUsersByNameSchema), getUsersByNameFollowersFirst);


export default usersRouter;
import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { getUsersByNameSchema } from '../schemas/userSchemas.js';
import { getUsersByNameFollowersFirst, getUser} from '../controllers/usersController.js';

const usersRouter = Router ();

usersRouter.post('/users', validateToken, validateSchema(getUsersByNameSchema), getUsersByNameFollowersFirst);
usersRouter.get('/user', getUser);

export default usersRouter;
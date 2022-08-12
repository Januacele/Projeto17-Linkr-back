import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { schemaValidator } from '../middlewares/schemaValidator.js';
import { getUsersByNameSchema } from '../schemas/userSchemas.js';
import { getUsersByNameFollowersFirst, getUser} from '../controllers/usersController.js';

const usersRouter = Router ();

usersRouter.post('/users', validateToken, schemaValidator(getUsersByNameSchema), getUsersByNameFollowersFirst);
usersRouter.get('/user', getUser);

export default usersRouter;
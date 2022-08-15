import { Router } from 'express';
import { tokenValidation } from '../middlewares/tokenValidation.js';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { getUsersByNameSchema } from '../schemas/userSchemas.js';
import { getUsersByNameFollowersFirst, getUser} from '../controllers/usersController.js';

const usersRouter = Router ();

usersRouter.post('/users', tokenValidation, validateSchema(getUsersByNameSchema), getUsersByNameFollowersFirst);
usersRouter.get('/user', tokenValidation, getUser);

export default usersRouter;
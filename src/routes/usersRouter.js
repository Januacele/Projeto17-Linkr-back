import { Router } from 'express';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { getUsersByNameSchema } from '../schemas/userSchemas.js';
import { getUsersByNameFollowersFirst, getUser, userByToken} from '../controllers/usersController.js';
import { tokenValidation } from '../middlewares/tokenValidation.js';

const usersRouter = Router ();

usersRouter.post('/users', tokenValidation, validateSchema(getUsersByNameSchema), getUsersByNameFollowersFirst);
usersRouter.get('/user', tokenValidation, getUser);
usersRouter.get("/userToken", tokenValidation, userByToken);

export default usersRouter;
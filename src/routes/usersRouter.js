import { Router } from 'express';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { getUsersByNameSchema } from '../schemas/userSchemas.js';
import { getUsersByNameFollowersFirst, getUser, userByToken, getPostsByUser, getUserById} from '../controllers/usersController.js';
import { tokenValidation } from '../middlewares/tokenValidation.js';

const usersRouter = Router ();

usersRouter.post('/users', tokenValidation, validateSchema(getUsersByNameSchema), getUsersByNameFollowersFirst);
usersRouter.get('/user', tokenValidation, getUser);
usersRouter.get("/userToken", tokenValidation, userByToken);
usersRouter.get("/user/:id", tokenValidation, getPostsByUser);

usersRouter.get("/users/:id", tokenValidation, getUserById);

export default usersRouter;
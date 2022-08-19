import { Router } from 'express';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { getUsersByNameSchema } from '../schemas/userSchemas.js';
import { getUsersByNameFollowersFirst, getUser, userByToken, getPostsByUser, getUserById, getSearchedUser} from '../controllers/usersController.js';
import { tokenValidation } from '../middlewares/tokenValidation.js';

const usersRouter = Router ();

usersRouter.post('/users', tokenValidation, validateSchema(getUsersByNameSchema), getUsersByNameFollowersFirst);// working
usersRouter.get('/user', tokenValidation, getUser);// working
usersRouter.get("/userToken", tokenValidation, userByToken);// working
usersRouter.get("/user/:id", tokenValidation, getPostsByUser);// working
usersRouter.get("/users/search", tokenValidation, getSearchedUser);// working
usersRouter.get("/users/:id", tokenValidation, getUserById);// working

export default usersRouter;
import { Router } from "express";
import {
    followUser,
    checkFollow,
    sendAllFollows,
    unfollowUser
} from "../controllers/followController.js";

import {tokenValidation} from "../middlewares/tokenValidation.js";

const followRouter = Router();

followRouter.post("/follow/:id", tokenValidation, followUser);// working
followRouter.delete("/follow/:id", tokenValidation, unfollowUser);// working
followRouter.get("/follow/:id", tokenValidation, checkFollow);// working
followRouter.get("/follows", tokenValidation, sendAllFollows);// working

export default followRouter;
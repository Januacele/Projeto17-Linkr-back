import { Router } from "express";
import {
    followUser,
    checkFollow,
    sendAllFollows,
    unfollowUser
} from "../controllers/followController.js";

import {tokenValidation} from "../middlewares/tokenValidation.js";

const followRouter = Router();

followRouter.post("/follow/:id", tokenValidation, followUser);
followRouter.delete("/follow/:id", tokenValidation, unfollowUser);
followRouter.get("/follow/:id", tokenValidation, checkFollow);
followRouter.get("/follows", tokenValidation, sendAllFollows);

export default followRouter;
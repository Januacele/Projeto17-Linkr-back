import { Router } from "express";
import {
    followUser
} from "../controllers/followController.js";

import {tokenValidation} from "../middlewares/tokenValidation.js";

const followRouter = Router();

followRouter.post("/follow/:id", tokenValidation, followUser);
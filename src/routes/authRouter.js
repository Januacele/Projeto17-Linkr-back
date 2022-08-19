import { Router } from "express"

import {
  deleteSession,
  postAutoLogin,
  postSignin,
  postUser,
} from "../controllers/authController.js"
import {
  signinMiddleware,
  signupMiddleware,
} from "../middlewares/authMiddleware.js"
import { validateSchema } from "../middlewares/schemaValidator.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"
import { signinSchema, signupSchema } from "../schemas/authSchema.js"

const authRouter = Router()
authRouter.post(
  "/signup", // working
  validateSchema(signupSchema),
  signupMiddleware,
  postUser,
)
authRouter.post(
  "/signin",// working
  validateSchema(signinSchema),
  signinMiddleware,
  postSignin,
)
authRouter.post("/auto-login", tokenValidation, postAutoLogin)
authRouter.delete("/session", tokenValidation, deleteSession) // working

export default authRouter

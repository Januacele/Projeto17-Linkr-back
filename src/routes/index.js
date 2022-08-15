import { Router } from "express"
import authRouter from "./authRouter.js"
import postsRouter from "./postsRouter.js"
import hashtagRouter from "./hashtagRouter.js"
import timelineRouter from './timelineRouter.js'
import usersRouter from '../routes/usersRouter.js'
import postUserRouter from '../routes/postUserRouter.js'

const router = Router()

router.use(authRouter)
router.use(postsRouter)
router.use(hashtagRouter)
router.use(timelineRouter)
router.use(usersRouter)
router.use(postUserRouter)

export default router

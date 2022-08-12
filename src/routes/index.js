import { Router } from "express"
import authRouter from "./authRouter.js"
import postsRouter from "./postsRouter.js"
import hashtagRouter from "./hashtagRouter.js"
import timelineRouter from './timelineRouter.js'
import usersRouter from '../routes/usersRouter.js'

const router = Router()

router.use(authRouter)
router.use(postsRouter)
router.use(hashtagRouter)
router.use(timelineRouter)
router.use(usersRouter)

export default router

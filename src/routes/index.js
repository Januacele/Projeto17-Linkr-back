import { Router } from "express"
import authRouter from "./authRouter.js"
import postsRouter from "./postsRouter.js"
import hashtagRouter from "./hashtagRouter.js"
import timelineRouter from './timelineRouter.js'
import usersRouter from './usersRouter.js'
import postUserRouter from './postUserRouter.js'
import likePostRouter from './likePostRouter.js'
import followRouter from "./followRouter.js"

const router = Router()

router.use(authRouter)
router.use(postsRouter)
router.use(hashtagRouter)
router.use(timelineRouter)
router.use(usersRouter)
router.use(postUserRouter)
router.use(likePostRouter)
router.use(followRouter)

export default router

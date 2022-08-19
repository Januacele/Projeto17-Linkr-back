import { Router } from "express"
import { getHashtag } from "../controllers/hashtagController.js"


const hashtagRouter = Router()

hashtagRouter.get("/hashtags", getHashtag)// working

export default hashtagRouter

import {GetReviews} from "../controllers/reviews.js";
import { PostReviews } from "../controllers/reviews.js";
import express from "express"

const router=express.Router();


router.get('/',GetReviews)
router.post('/post/review',PostReviews)


export default router;
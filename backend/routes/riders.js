import express from "express"
import {GetRiders, LoginRider,NewOrdersDisplay,RiderInformation} from "../controllers/rider.js"
import { PostReviews } from "../controllers/reviews.js";
const router=express.Router();

router.get("/",GetRiders)
router.post('/login',LoginRider)
router.post('/information',RiderInformation)
router.post('/new_orders',NewOrdersDisplay)

export default router;

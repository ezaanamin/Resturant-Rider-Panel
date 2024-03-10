import express from "express"
import {GetAbout, SendMail} from "../controllers/About.js";
const router=express.Router();

router.get('/',GetAbout)
router.post('/mail',SendMail)
export default router;
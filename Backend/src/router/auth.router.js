import express from "express"
import { Login, Register , Logout , GetMe } from "../controller/auth.controller.js";
import { Protected } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/register" , Register)
router.post("/login" , Login)
router.post("/logout" , Logout)
router.get("/getme" , Protected , GetMe)

export default router
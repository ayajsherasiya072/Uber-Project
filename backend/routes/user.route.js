import { Router } from "express";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {verifyJWTuser } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/getuserprofile").get(verifyJWTuser,getUserProfile)
router.route("/logout").post(verifyJWTuser,logoutUser)

export default router
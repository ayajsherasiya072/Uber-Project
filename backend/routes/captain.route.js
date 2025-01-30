import { Router } from "express";
import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from "../controllers/captain.controller.js";
import {  verifyJWTcaptain } from "../middlewares/auth.middleware.js";


const router=Router()

router.route("/register").post(registerCaptain)
router.route("/login").post(loginCaptain)
router.route("/logout").post(verifyJWTcaptain,logoutCaptain)
router.route("/getcaptainprofile").get(verifyJWTcaptain,getCaptainProfile)

export default router
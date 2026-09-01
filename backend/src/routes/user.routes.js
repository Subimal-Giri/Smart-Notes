import { Router } from "express";
import { registerUser, loginUser, logoutUser, changeCurrentPassword } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = Router();

    // register
router.route("/register").post(authLimiter, registerUser);

    // login
router.route("/login").post(authLimiter, loginUser);

    // logout
router.route("/logout").post(verifyJWT, logoutUser);

    // Change Current Password
router.route("/change-password").post(verifyJWT, changeCurrentPassword);


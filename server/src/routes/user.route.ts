import express from "express";
import { checkAuth, forgotPassword, login, logout, signup, updateProfile, verifyEmail,resetPassword } from "../controllers/user.controller.ts";
import { isAuthenticated } from "../middlewares/isAuthenticated.ts";


const router = express.Router();

router.route("/check-auth").get(isAuthenticated, checkAuth);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/profile/update").put(isAuthenticated, updateProfile);


export default router;
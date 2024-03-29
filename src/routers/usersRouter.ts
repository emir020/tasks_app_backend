import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();
router.route("/login").post(authController.login);

export default router;

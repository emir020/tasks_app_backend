import express from "express";
import * as tasksController from "../controllers/tasksController";

const router = express.Router();
router.route("/").get(tasksController.fetchTasks);

export default router;

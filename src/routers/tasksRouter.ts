import express from "express";
import * as tasksController from "../controllers/tasksController";

const router = express.Router();
router.route("/").get(tasksController.fetchTasks);
router.route("/:id").get(tasksController.fetchSingleTask);

export default router;

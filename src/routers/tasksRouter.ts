import express from "express";
import * as tasksController from "../controllers/tasksController";

const router = express.Router();
router
  .route("/")
  .get(tasksController.fetchTasks)
  .post(tasksController.createTask);

router
  .route("/:id")
  .get(tasksController.fetchSingleTask)
  .delete(tasksController.deleteTask);

export default router;

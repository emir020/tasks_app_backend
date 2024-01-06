import { Request, Response } from "express";
import tasks from "../tasks";

/**
 * @description Fetches tasks and sends a JSON
 * response with a success message and the list of tasks.
 */
export const fetchTasks = (req: Request, res: Response) => {
  // Set the HTTP status code to 200 (OK) and send a JSON response
  res.status(200).json({
    message: "success",
    tasks,
  });
};

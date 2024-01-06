import { Request, Response } from "express";
import tasks from "../tasks";
import { Task } from "../types";

/**
 * @description Fetches tasks and sends a JSON
 * response with a success message and the list of tasks.
 */
export const fetchTasks = (req: Request, res: Response) => {
  // 1) Set the HTTP status code to 200 (OK) and send a JSON response
  res.status(200).json({
    message: "success",
    tasks,
  });
};

/**
 * @description Fetches a single task by ID
 * and sends a JSON response with the task details.
 */
export const fetchSingleTask = (req: Request, res: Response) => {
  // 1a) Extract the task ID from the request parameters
  const id: string = req.params?.id;

  // 1b) If no ID is provided, exit the function
  if (!id) return;

  // 2a) Find the task with the provided ID in the tasks array
  const foundTask: Task | undefined = tasks.find(
    (task: Task) => task.id === +id
  );

  // 2b) If no task is found, throw an error
  if (!foundTask) {
    throw new Error(`Task with provided id: ${id} does not exist!`);
  }

  // 3) Send a JSON response with the success message and the found task
  res.status(200).json({
    message: "success",
    task: foundTask,
  });
};

import { NextFunction, Request, Response } from "express";
import tasks from "../tasks";
import { Task } from "../types";
import AppError from "../utils/appError";

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
export const fetchSingleTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    return next(
      new AppError(`Task with provided id: ${id} does not exist!`, 404)
    );
  }

  // 3) Send a JSON response with the success message and the found task
  res.status(200).json({
    message: "success",
    task: foundTask,
  });
};

/**
 * @description Creates a new task and adds it to the tasks array.
 */
export const createTask = (req: Request, res: Response, next: NextFunction) => {
  // 1a) Extract the 'name' property from the request body
  const { name, description, dueDate } = req.body;

  // 1b) Check if 'name' is provided, return an error if not
  if (!name) {
    return next(new AppError("Please provide the title for this task!", 400));
  }

  // 2) Create a new task with an incremented ID, provided name, and 'completed' set to false
  const newTask: Task = {
    id: tasks.length + 1,
    name,
    completed: false,
    description,
    dueDate: dueDate ? dueDate : new Date().toLocaleDateString(),
  };

  // 3) Add the new task to the tasks array
  tasks.push(newTask);

  // 4) Respond with a success message and the updated tasks array
  res.status(201).json({
    message: "success",
    tasks,
  });
};

/**
 * @description Delete a task with the specified ID.
 */
export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  // 1a) Extract task ID from request parameters
  const id: string = req.params?.id;

  // 1b) Check if the ID is provided
  if (!id) return;

  // 2a) Find the index of the task with the specified ID
  const taskIndex: number = tasks.findIndex((task: Task) => task.id === +id);

  // 2b) Check if the task with the specified ID exists
  if (taskIndex === -1) {
    return next(new AppError("There was a problem deleting this task!", 400));
  }

  // 3) Remove the task from the tasks array
  tasks.splice(taskIndex, 1);

  // 4) Return success response
  res.status(204).json({
    message: "success",
  });
};

/**
 * @description Update a task with the specified ID.
 */
export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  // 1a) Extract task ID from request parameters
  const id: string = req.params?.id;

  // 1b) Extract fields to be updated from the request body
  const updatedFields: Partial<Task> = req.body;

  // 1c) Check if ID is provided; if not, return early
  if (!id) {
    return;
  }

  // 2a) Find the index of the task with the given ID
  const taskIndex = tasks.findIndex((task: Task) => task.id === +id);

  // 2b) If task with the given ID is not found, return an error
  if (taskIndex === -1) {
    return next(new AppError("There was a problem updating this task!", 400));
  }

  // 3) Update task fields dynamically based on provided properties
  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedFields };

  // 4) Send a success response with updated tasks
  res.status(200).json({
    message: "success",
    tasks,
  });
};

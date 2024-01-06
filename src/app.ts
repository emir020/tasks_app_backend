import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import tasksRouter from "./routers/tasksRouter";

// Initialize .env
dotenv.config();

const app = express();

// Enable simple request logs in development environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routers
app.use("/api/v1/tasks", tasksRouter);

export default app;

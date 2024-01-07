import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import globalErrorHandler from "./controllers/errorController";
import tasksRouter from "./routers/tasksRouter";
import AppError from "./utils/appError";

// Initialize .env
dotenv.config();

const app = express();

// Cors
app.use(
  cors({
    origin: "*",
  })
);

// Parse request body
app.use(express.json());

// Enable simple request logs in development environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routers
app.use("/api/v1/tasks", tasksRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;

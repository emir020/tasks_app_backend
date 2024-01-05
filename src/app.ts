import express, { Request, Response } from "express";
import dotenv from "dotenv";

// Initialize .env
dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.write("Hello world!", "utf8");
  res.end();
});

export default app;

// Import necessary modules from the Express framework and jsonwebtoken library
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

// Function to sign a JSON Web Token (JWT) using the provided email and environment-specific secret
const signToken = (email: string) => {
  return jwt.sign({ email }, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Function to create and send a JWT as a cookie to the client
const createSendToken = (
  email: string,
  statusCode: number,
  req: Request,
  res: Response
) => {
  // Generate a JWT using the provided email!
  const token = signToken(email);

  // Set the JWT as a cookie in the client's browser
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Cookie cannot be accessed or modified by client-side scripts
    secure: req.secure || req.headers["x-forwarded-proto"] === "https", // Use secure connection if available
  });

  // Send a JSON response to the client with the status and the generated token
  res.status(statusCode).json({
    status: "success",
    token,
  });
};

// Express controller for handling user login
export const login = (req: Request, res: Response, next: NextFunction) => {
  // Extract email from the request body
  const { email } = req.body;

  // Send a JWT to the client as a response
  createSendToken(email, 200, req, res);
};

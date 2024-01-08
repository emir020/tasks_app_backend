import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

const signToken = (email: string) => {
  return jwt.sign({ email }, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  email: string,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = signToken(email);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  res.status(statusCode).json({
    status: "success",
    token,
  });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  // 1) Send token to client
  createSendToken(email, 200, req, res);
};

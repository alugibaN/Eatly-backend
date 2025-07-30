import { ErrorAuth } from "@/utils/error/errorAuth";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ErrorAuth("Authorization header is missing or invalid");
    }

    const token = authHeader.split(" ")[1];
    try {
      const payload = jwt.verify(
        token,
        `${process.env.ACCESS_TOKEN_SECRET}`
      ) as {
        userID: string;
      };
      req.body.userID = payload.userID;

      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError)
        throw new ErrorAuth("Token expired");
      throw new ErrorAuth("Invalid token");
    }
  } catch (error) {
    next(error);
  }
};

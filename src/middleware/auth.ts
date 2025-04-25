import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({ message: "Authorization header is missing or invalid" });
}
const token = authHeader.split(' ')[1];
try {
  const payload = jwt.verify(
    token,  
    `${process.env.ACCESS_TOKEN_SECRET}`) as { userID: string };
    req.body.userID =  payload.userID ;
  next();
} catch (err) {  
  if (err instanceof jwt.TokenExpiredError) return res.status(401).json({ message: "Token expired" });
  return res.status(401).json({ message: "Invalid token" });
}

};

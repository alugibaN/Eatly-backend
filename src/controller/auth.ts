import { NextFunction, Request, Response } from "express";
import * as userService from "../service/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import { access } from "fs";
dotenv.config();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.body);
    const token = jwt.sign({ userID: user.id }, "secret", { expiresIn: "1h" });
    const option = { httpOnly: true, maxAge: 3600000 * 24 * 7 };
    res.cookie("access_token", "Bearer " + token, option);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.login(req.body);
    
    const accessToken = jwt.sign(
      { userID: user.id },
      `${process.env.ACCESS_TOKEN_SECRET}`, 
      { expiresIn: '30m' } 
    );
    
    const refreshToken = jwt.sign(
      { userID: user.id },
      `${process.env.REFRESH_TOKEN_SECRET}`,
      { expiresIn: '7d' }
    );


    const refreshOption = {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const
    };
    
    res.cookie("refresh_token", refreshToken, refreshOption);
    
    res.status(200).json({ 
      accessToken,
      expiresIn: 1800, 
      user: { id: user.id } 
    });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {cookies} = req
    if (!cookies.refresh_token) {
      throw new Error("Refresh token not found");
    }
    const decoded = jwt.verify(
      cookies.refresh_token,
      `${process.env.REFRESH_TOKEN_SECRET}`
    ) as { userID: string };

    const newAccessToken = jwt.sign(
      { userID: decoded.userID },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: "30m" } 
    );

    const newRefreshToken = jwt.sign(
      { userID: decoded.userID },
      `${process.env.REFRESH_TOKEN_SECRET}`,
      { expiresIn: "7d" } 
    );

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", 
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({
      accessToken: newAccessToken,
      expiresIn: 30 * 60, 
    });
  } catch (err) {
    // if (err instanceof jwt.TokenExpiredError) {
    //   return res.status(401).json({ message: "Refresh token expired" });
    // }
    // if (err instanceof jwt.JsonWebTokenError) {
    //   return res.status(401).json({ message: "Invalid refresh token" });
    // }
    next(err);
  }  
}





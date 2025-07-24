import { Request, Response, NextFunction } from "express";
import * as ProfileService from "../service/profile";

export const getProfileData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataProfile = await ProfileService.getProfileData(req.body.userID);
    res.status(200).json(dataProfile)
  } catch (err) {
    next(err);
  }
};

export const editProfileData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userID, ...etherParamsUser } = req.body;
    console.log();
    const profile = await ProfileService.editProfileData(userID, etherParamsUser);
    res.status(200).json(profile)
  } catch (err) {
    next(err);
  }
};

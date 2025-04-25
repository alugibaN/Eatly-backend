import { Request, Response, NextFunction } from "express";
import * as ProfileService from "../service/profile";

export const getProfileData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataProfile = await ProfileService.getProfileData(req.body.user.userID);
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
    const { user, ...etherParamsUser } = req.body;
    const profile = await ProfileService.editProfileData(user.userID, etherParamsUser);
    res.status(200).json(profile)
  } catch (err) {
    next(err);
  }
};

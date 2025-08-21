import * as RestaurantService from "@/service/restaurant";
import { NextFunction, Request, Response } from "express";

export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userID, ...rest } = req.body;
  try {
    const restaurant = await RestaurantService.createRestaurant(rest, userID);
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};

export const getAllRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allRestaurant = await RestaurantService.getAllRestaurant();
    res.status(200).json(allRestaurant);
  } catch (err) {
    next(err);
  }
};

export const GetFilteredRestaurant = async (
  req: Request<{}, {}, {}, RestaurantService.QueryParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const rest = await RestaurantService.GetFilteredRestaurant(req.query);
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

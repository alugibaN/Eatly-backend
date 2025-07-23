import * as RestaurantService from "@/service/restaurant";
import { NextFunction, Request, Response } from "express";

export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurant = await RestaurantService.createRestaurant(
      req.body,
      req.body.user.userID
    );
    res.status(200).json(restaurant);
  } catch (err) {
    // console.error("Error in createRestaurant:", err);
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

export const getTopRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rest = await RestaurantService.getTopRestaurant();
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

import { Request, Response, NextFunction } from "express";
import * as ServiceDish from "../service/dish";

export const createDish = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dish = await ServiceDish.createDish(req.body);
    res.status(201).json(dish);
  } catch (err) {
    next(err);
  }
};

export const GetFilteredDishes = async (
  req: Request<{}, {}, {}, ServiceDish.QueryParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const dish = await ServiceDish.GetFilteredDishes(req.query);
    res.status(200).json(dish);
  } catch (err) {
    next(err);
  }
};

export const updateDish = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dish = await ServiceDish.updateDish(req.body);
    res.status(201).json(dish);
  } catch (err) {
    next(err);
  }
};

export const getFiveTopDish = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dish = await ServiceDish.getFiveTopDish();
    res.status(200).json(dish);
  } catch (err) {
    next(err);
  }
};

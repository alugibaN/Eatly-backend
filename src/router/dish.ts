import { createDish, GetFilteredDishes, getFiveTopDish, updateDish } from "@/controller/dish";
import { Router } from "express";

const dishRouter = Router();

dishRouter.post("/", createDish);
dishRouter.get("/", GetFilteredDishes );
dishRouter.patch("/", updateDish );
dishRouter.get("/top-dishes", getFiveTopDish);


export default dishRouter;
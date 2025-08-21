import { createDish, GetFilteredDishes, updateDish } from "@/controller/dish";
import { Router } from "express";

const dishRouter = Router();

dishRouter.post("/", createDish);
dishRouter.get("/", GetFilteredDishes );
dishRouter.patch("/", updateDish );


export default dishRouter;
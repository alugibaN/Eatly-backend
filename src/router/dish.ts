import { createDish, getFiveTopDish, getManyDishes, updateDish } from "@/controller/dish";
import { Router } from "express";

const dishRouter = Router();

dishRouter.post("/", createDish);
dishRouter.get("/", getManyDishes );
dishRouter.patch("/", updateDish );
dishRouter.get("/top-dishes", getFiveTopDish );
// dishRouter.get("/category", findParams)


export default dishRouter;
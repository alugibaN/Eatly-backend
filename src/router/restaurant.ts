import { Router } from "express";
import { createRestaurant, getAllRestaurant, getTopRestaurant } from "@/controller/restaurant";

const restaurantRouter = Router();

restaurantRouter.post("/", createRestaurant );
restaurantRouter.get("/", getAllRestaurant );
restaurantRouter.get("/top-restaurant", getTopRestaurant)


export default restaurantRouter;
     
import { Router } from "express";
import { createRestaurant, getAllRestaurant } from "@/controller/restaurant";
import { getTopRestaurant } from "@/service/restaurant";

const restaurantRouter = Router();

restaurantRouter.post("/", createRestaurant );
restaurantRouter.get("/", getAllRestaurant );
restaurantRouter.get("/top-restaurant", getTopRestaurant)


export default restaurantRouter;
     
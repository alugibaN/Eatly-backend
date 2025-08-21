import { Router } from "express";
import { createRestaurant, getAllRestaurant, GetFilteredRestaurant } from "@/controller/restaurant";

const restaurantRouter = Router();

restaurantRouter.post("/", createRestaurant );
restaurantRouter.get("/", getAllRestaurant );
restaurantRouter.get("/filter", GetFilteredRestaurant );


export default restaurantRouter;
     
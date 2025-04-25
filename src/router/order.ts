import { createOrder, updateOrder } from "@/controller/order";
import { Router } from "express";

export const orderRout = Router()

orderRout.post("/", createOrder)
orderRout.post("/update", updateOrder)
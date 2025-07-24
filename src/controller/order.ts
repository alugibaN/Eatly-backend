import { NextFunction,Request,Response } from "express";
import * as ServiceOrder from "../service/order";


export const createOrder = async (req:Request, res:Response,next: NextFunction) =>{
  try{
    const order = await ServiceOrder.createOrder(req.body)
    res.status(200).json(order)
  } catch(err) {
    next(err)
  }
}


export const updateOrder = async (req:Request, res:Response, next: NextFunction)=>{
  try{
    console.log("asd");
    const order = await ServiceOrder.updateOrder(req.body)
    res.status(200).json(order)
  } catch(err) {
    next(err)
  }
}
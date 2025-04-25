import { PrismaClient, Orders } from "@prisma/client";

const prisma =  new PrismaClient()


export const createOrder = async (order:Orders) => {
  const cheackDishes = await prisma.dishes.findMany({
    where:{
      id: { in: order.dishes }
    }
  })
  if(!cheackDishes) throw new Error("Некорректные блюда")
  const newOrder = await prisma.orders.create({data: order})
  return newOrder
}

export const updateOrder = async (order:Orders)=>{
  const newOrder = await prisma.orders.update({
    where:{
      id: order.id
    },
    data: order
  })
  if(!newOrder) throw new Error("Not Found Order")
}
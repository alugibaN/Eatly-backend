import prisma from "@/lib/prisma";
import { ErrorFind } from "@/utils/error/erorFind";
import { ErrorValidation } from "@/utils/error/errorValidation";
import { Orders } from "@prisma/client";


export const createOrder = async (order: Orders) => {
  const cheackDishes = await prisma.dishes.findMany({
    where: {
      id: { in: order.dishes },
    },
  });
  if (!cheackDishes) throw new ErrorValidation("Некорректные блюда");
  const newOrder = await prisma.orders.create({ data: order });
  return newOrder;
};

export const updateOrder = async (order: Orders) => {
  console.log(order.id);
  const newOrder = await prisma.orders.update({
    where: {
      id: order.id,
    },
    data: order,
  });
  if (!newOrder) throw new ErrorFind("Заказ не найден");
};


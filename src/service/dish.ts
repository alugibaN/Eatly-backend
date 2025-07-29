import prisma from "@/lib/prisma";
import { ErrorFind } from "@/utils/error/erorFind";
import { Dishes } from "@prisma/client";

export const createDish = async (dish: Dishes) => {
  const restaurantExists = await prisma.restaurants.findUnique({
    where: { id: dish.restauranеID },
  });

  if (!restaurantExists) {
    throw new ErrorFind("Ресторан с указанным ID не найден");
  }

  return await prisma.dishes.create({ data: dish });
};

export const updateDish = async (dish: Dishes) => {
  // const findDish = await prisma.dishes.update({
  //   where: {
  //     id: dish.id
  //   }
  // })

  const cheangeDish = await prisma.dishes.update({
    where: {
      id: dish.id,
    },
    data: dish,
  });
  return cheangeDish;
};

export interface MyQueryParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: string;
  limit?: string;
}

export const getManyDishes = async (query: MyQueryParams) => {
  const whereClause: Record<string, any> = {};
  if (query.category) {
    whereClause.category = query.category;
  }
  if (query.minPrice) {
    whereClause.cost.gte = {
      lte: Number(query.minPrice),
    };
  }
  if (query.maxPrice) {
    whereClause.cost = {
      lte: Number(query.maxPrice),
    };
  }
  const take = query.limit ? parseInt(query.limit) : undefined;
  const skip =
    query.page && take ? (parseInt(query.page) - 1) * take : undefined;

  return await prisma.dishes.findMany({
    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    take,
    skip,
  });
};

export const getFiveTopDish = async () =>
  await prisma.dishes.findMany({
    orderBy: {
      star: "desc",
    },
    take: 5,
  });

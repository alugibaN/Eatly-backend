import prisma from "@/lib/prisma";
import { ErrorForbidden } from "@/utils/error/errorForbidden ";
import { ErrorValidation } from "@/utils/error/errorValidation";
import { Restaurants } from "@prisma/client";

export const createRestaurant = async (rest: Restaurants, userID: string) => {
  const user = await prisma.user.findFirst({ where: { id: userID } });
  if (user?.role !== "ADMIN")
    throw new ErrorForbidden(
      "Пользователь не имеет прав для доступа к запрашиваемому ресурсу"
    );
  const newRest = await prisma.restaurants.create({
    data: rest,
  });

  return newRest;
};

export const getAllRestaurant = async () => await prisma.restaurants.findMany();

export interface QueryParams {
  category?:     string;
  restaurantID?: string;
  sortBy:        "rating" | "deliveryTime";
  sortOrder:     "desc" | "asc";
  limit?:        number;
  page?:         number;
  search?:       string;
}

interface WhereParams {
  category?:     {};
  id?:           string;
  limit?:        number;
  page?:         number;
  name?:         {};
}

export const GetFilteredRestaurant = async (query: QueryParams) => {
  const {
    category,
    restaurantID,
    sortBy =  "rating",
    sortOrder = "desc",
    limit = 5,
    page = 1,
    search,
  } = query;

  const where: WhereParams = {};

  if (category) {
    where.category = {
      contains: category,
    };
  }
  if (search) {
    where.name = {
      contains: search,
    };
  }

  if (restaurantID) where.id = restaurantID;
  let orderBy = {
    [sortBy]: sortOrder,
  };
  const take = +limit;
  const skip = (+page - 1) * limit;

  const [rest, total] = await Promise.all([
    prisma.restaurants.findMany({
      where,
      orderBy,
      take,
      skip,
    }),
    prisma.restaurants.count({where})
  ])
    const totalPages = Math.ceil(total / take);

   return {
    succes: true,
    data: rest,
    meta: {
      total,
      currentPage: page,
      totalPages:totalPages,
      perPage: take,
    },
  };








};

// export const getTopRestaurant = async () =>
//   await prisma.restaurants.findMany({
//     orderBy: {
//       star: "desc",
//     },
//     take: 3,
//   });

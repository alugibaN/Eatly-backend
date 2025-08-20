import prisma from "@/lib/prisma";
import { ErrorFind } from "@/utils/error/erorFind";
import { Dishes } from "@prisma/client";

export const createDish = async (dish: Dishes) => {
  const { name, category, deliveryTime, rating, price, img, restaurantID } =
    dish;

  const restaurantExists = await prisma.restaurants.findUnique({
    where: { id: restaurantID },
  });

  if (!restaurantExists) {
    throw new ErrorFind("Ресторан с указанным ID не найден");
  }

  return await prisma.dishes.create({
    data: {
      name,
      category ,
      deliveryTime,
      rating,
      img,
      restaurantID,
      price
    },
  });
};

export const updateDish = async (dish: Dishes) => {
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


export interface QueryParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  isVegan?: boolean;
  restaurantID?: string;
  sortBy: "cost" | "rating" | "name" | "createdAt";
  sortOrder: "desc" | "asc";
  limit?: number;
  page?: number;
  search?: string;
}

interface FilterObJ {
  category?: {};
  price?: { gte?: number; lte?: number };
  isVegan?: boolean;
  restaurantID?: string;
  sortBy?: string;
  sortOrder?: string;
  limit?: number;
  page?: number;
  name?: {};
}

export const GetFilteredDishes = async (query: QueryParams) => {
  const {
    category,
    minPrice,
    maxPrice,
    isVegan,
    restaurantID,
    sortBy = "rating",
    sortOrder = "desc",
    limit = 10,
    page = 1,
    search,
  } = query;

  const where: FilterObJ = {};

  if (category) {
    where.category = {
      equals: category,
      // mode: "insensitive",
    };
  }
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = +minPrice;
    if (maxPrice) where.price.lte = +maxPrice;
  }
  if (search) {
    where.name = {
      contains: search,
    };
  }
  if (isVegan !== undefined) where.isVegan = isVegan;
  if (restaurantID) where.restaurantID = restaurantID;

  const orderBy = {
    [sortBy]: sortOrder,
  };
  const take = +limit;
  const skip = (+page - 1) * limit;

  const [dish, total] = await Promise.all([
    prisma.dishes.findMany({
      where,
      orderBy,
      take,
      skip,
      include: {
        restaurant: {
          select: {
            id: true,
            rating: true,
            name: true,
            deliveryTime: true,
          },
        },
      },
    }),
    prisma.dishes.count({ where }),
  ]);
  const totalPages = Math.ceil(total / take);

  return {
    succes: true,
    data: dish,
    meta: {
      total,
      currentPage: page,
      perPage: take,
      totalPages,
    },
  };
};


/**
 * @api {get} /dishes Получить отфильтрованный список блюд
 * @apiName GetFilteredDishes
 * @apiGroup Dishes
 *
 * @apiParam {String} [category] Категория блюда
 * @apiParam {Number} [minPrice] Минимальная цена
 * @apiParam {Number} [maxPrice] Максимальная цена
 * @apiParam {Boolean} [isVegan] Вегетарианское блюдо
 * @apiParam {String} [restaurantId] ID ресторана
 * @apiParam {String="price","rating","name","createdAt"} [sortBy="createdAt"] Поле для сортировки
 * @apiParam {String="asc","desc"} [sortOrder="desc"] Порядок сортировки
 * @apiParam {Number} [limit=10] Количество элементов на странице
 * @apiParam {Number} [page=1] Номер страницы
 * @apiParam {String} [search] Поиск по названию блюда
 *
 * @apiSuccess {Object[]} dishes Список блюд
 * @apiSuccess {Number} total Общее количество блюд
 * @apiSuccess {Number} totalPages Общее количество страниц
 */

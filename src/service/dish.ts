import prisma from "@/lib/prisma";
import { ErrorFind } from "@/utils/error/erorFind";
import { Dishes } from "@prisma/client";
import { query } from "express";
import { number, record } from "zod";

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
export const getManyDishes = async (query: MyQueryParams) => {
  const {} = query;
  const whereClause: Record<string, string | number> = {};
};

export interface MyQueryParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: string;
  limit?: string;
}

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

interface QueryParams {
  category?:       string;
  minPrice?:       number;
  maxPrice?:       number;
  isVegan?:        boolean;
  restaurantId?:   string;
  sortBy:          "cost" | "rating" | "name" | "createdAt";
  sortOrder:       "desc" | "asc";
  limit?:          number;
  page?:           number;
  search?:         string;
}

interface FilterObJ {
  category?:       {  };
  price?:          { gte?: number; ite?: number }
  isVegan?:        boolean;
  restaurantId?:   string;
  sortBy?:         string;
  sortOrder?:      string;
  limit?:          number;
  page?:           number;
  name?:           {};
}



const GetFilteredDishes = (query: QueryParams) => {
  const {
    category,
    minPrice,
    maxPrice,
    isVegan,
    restaurantId,
    sortBy = "rating",
    sortOrder = "desc",
    limit = 10,
    page = 1,
    search,
  } = query;
  
  const where: FilterObJ = {}

  if(category) {
    where.category = {
      equal:  category,
      mode: 'insensitive'
    }; 
  };
  if(minPrice || maxPrice) {
    where.price = {}
    if(minPrice) where.price.gte = +minPrice
    if(maxPrice) where.price.ite = +maxPrice
  }
  if(search){
    where.name = {
      contains: search,
    }
  }
  if(isVegan !== undefined) where.isVegan = isVegan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  if(restaurantId) where.restaurantId = restaurantId

   const orderBy = {
    [sortBy]: sortOrder
   }
   const take = +limit
   const slimit = (+page -1) * limit
  const dish = Promise.all( [prisma.dishes.findMany({
    where
  })

}


export const getFiveTopDish = async () =>
  await prisma.dishes.findMany({
    orderBy: {
      star: "desc",
    },
    take: 5,
  });

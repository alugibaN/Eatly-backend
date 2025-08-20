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


interface QueryParams {
  
}


export const GetFilteredRestaurant = (params:QueryParams)=>{

}







// export const getTopRestaurant = async () =>
//   await prisma.restaurants.findMany({
//     orderBy: {
//       star: "desc",
//     },
//     take: 3,
//   });

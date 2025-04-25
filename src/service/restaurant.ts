import { PrismaClient, Restaurants } from "@prisma/client";

const prisma = new PrismaClient();

export const createRestaurant = async (rest: Restaurants, userID: string) => {
  const { name, category, TimeReady, star } = rest;

  const checkRest = await prisma.restaurants.findFirst({
    where: { name: name },
  });
  if (checkRest) throw new Error("Название ресторана занято");
  // if (userID) {
  //   const user = await prisma.user.findFirst({ where: { id: userID } });
  //   if (user?.role !== "ADMIN") throw new Error("Не хватает прав");
  // }
  const newRest = await prisma.restaurants.create({
    data: {
      name: name,
      category: category,
      TimeReady: TimeReady,
      star: star,
    },
  });

  return newRest;
};

export const getAllRestaurant = async () => await prisma.restaurants.findMany();
export const getTopRestaurant = async () =>
  await prisma.restaurants.findMany({
    orderBy: {
      star: "desc",
    },
    take: 3,
  });

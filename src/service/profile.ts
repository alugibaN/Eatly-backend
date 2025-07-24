import prisma from "@/lib/prisma";
import { ErrorFind } from "@/utils/error/erorFind";
import { ErrorValidation } from "@/utils/error/errorValidation";
import { User } from "@prisma/client";

export const getProfileData = async (userID: string) => {
  const newUser = await prisma.user.findFirst({
    where: { id: userID },
    omit: { password: true },
  });

  if (!newUser) throw new ErrorFind("Пользователь не найден");
  return newUser;
};

export const editProfileData = async (userID: string, user: User) => {
  const { email } = user;
  if (email) {
    const cheakEmail = await prisma.user.findFirst({ where: { email: email } });
    if (cheakEmail) throw new ErrorValidation("Email занят");
  }
  return prisma.user.update({
    where: {
      id: userID,
    },
    data: {
      ...user,
      updateAt: new Date(),
    },
    omit: { password: true },
  });
};

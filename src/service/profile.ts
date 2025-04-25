import { PrismaClient, User } from "@prisma/client"

const prisma = new PrismaClient



export const getProfileData = async (userID:string) =>  await prisma.user.findFirst({where:{id: userID}, omit:{password:true}})

export const editProfileData = async (userID:string, user:User) =>{
  const {email} = user
  if(email){
    const cheakEmail = await prisma.user.findFirst({where:{email: email}})
    if(cheakEmail)  throw Error('Email занят')
  }
  return prisma.user.update({
    where:{
      id: userID
    },
    data:{
       ...user,
       updateAt: new Date()
      },
      omit:{password:true}
  })
}
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";


const womenAvatar = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/c2936e169621289.645022f4995bf.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/55fcb5111906393.600a73b1339f4.jpg",
  "https://mir-s3-cdn-cf.behance.net/projects/original/696612137555517.Y3JvcCwzMDAwLDIzNDYsMCwzMjY.jpg"
]
const menAvatar = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/c77efa101650903.5f2369bd78ed9.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5acafe132018981.61a07e7f4aed8.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/d7184e169621289.645022f4a3c80.jpg"

]

export const createUser =  async (user: User) =>{
  const {email, password, gender} = user
  if(!user.avatar){
    const random = Math.floor(Math.random() * 2)
    user ={
      ...user,
      avatar: gender ==="WOMAN" ? womenAvatar[random] : menAvatar[random]
    }
  }
  const chekEmail = await prisma.user.findFirst({
    where: {email: email}
  })
  if(chekEmail) throw new Error('Пользователь с таким email существует')
    const hash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({data: {
    ...user,
    password:hash
  },
  omit:{password: true}
})
  return newUser
}

export const login = async (user:User) =>{
  const {password, email } = user 
  const chekUser = await prisma.user.findFirst({
    where: {email: email},
  })
  if(!chekUser) throw new Error('Пользователь не найден') 
  const cheakPassword = chekUser !== null ? await bcrypt.compare(password, chekUser.password) : false
  if(!cheakPassword) throw new Error('Неправильные почта или пароль')
    return chekUser
}





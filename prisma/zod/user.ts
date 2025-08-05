import * as z from "zod"
import { Role, Gender } from ".prisma/client"
import { CompleteOrders, RelatedOrdersModel, CompletePosts, RelatedPostsModel, CompleteWallets, RelatedWalletsModel, CompleteFavorites, RelatedFavoritesModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  avatar: z.string().nullish(),
  role: z.nativeEnum(Role),
  gender: z.nativeEnum(Gender),
  updateAt: z.date(),
  createdAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  orders: CompleteOrders[]
  posts: CompletePosts[]
  wallets: CompleteWallets[]
  Favorites: CompleteFavorites[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  orders: RelatedOrdersModel.array(),
  posts: RelatedPostsModel.array(),
  wallets: RelatedWalletsModel.array(),
  Favorites: RelatedFavoritesModel.array(),
}))

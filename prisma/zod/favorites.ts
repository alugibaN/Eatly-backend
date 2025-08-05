import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteDishes, RelatedDishesModel, CompleteRestaurants, RelatedRestaurantsModel } from "./index"

export const FavoritesModel = z.object({
  id: z.number().int(),
  userID: z.string(),
  dishID: z.string(),
  restaurantID: z.string(),
  createdAt: z.date(),
})

export interface CompleteFavorites extends z.infer<typeof FavoritesModel> {
  user: CompleteUser
  dish?: CompleteDishes | null
  restaurant?: CompleteRestaurants | null
}

/**
 * RelatedFavoritesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFavoritesModel: z.ZodSchema<CompleteFavorites> = z.lazy(() => FavoritesModel.extend({
  user: RelatedUserModel,
  dish: RelatedDishesModel.nullish(),
  restaurant: RelatedRestaurantsModel.nullish(),
}))

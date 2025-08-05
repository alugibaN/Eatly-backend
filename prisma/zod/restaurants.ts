import * as z from "zod"
import { CategoryDishOrRest } from ".prisma/client"
import { CompleteDishes, RelatedDishesModel, CompleteFavorites, RelatedFavoritesModel } from "./index"

export const RestaurantsModel = z.object({
  id: z.string(),
  name: z.string(),
  img: z.string(),
  TimeReady: z.number().int(),
  rating: z.number(),
  category: z.nativeEnum(CategoryDishOrRest),
  updateAt: z.date(),
  createdAt: z.date(),
})

export interface CompleteRestaurants extends z.infer<typeof RestaurantsModel> {
  dishes: CompleteDishes[]
  Favorites: CompleteFavorites[]
}

/**
 * RelatedRestaurantsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRestaurantsModel: z.ZodSchema<CompleteRestaurants> = z.lazy(() => RestaurantsModel.extend({
  dishes: RelatedDishesModel.array(),
  Favorites: RelatedFavoritesModel.array(),
}))

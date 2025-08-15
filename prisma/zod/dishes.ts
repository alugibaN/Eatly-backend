import * as z from "zod"
import { Categories } from ".prisma/client"
import { CompleteRestaurants, RelatedRestaurantsModel, CompleteFavorites, RelatedFavoritesModel } from "./index"

export const DishesModel = z.object({
  id: z.string(),
  name: z.string(),
  deliveryTime: z.bigint(),
  rating: z.number(),
  price: z.number(),
  img: z.string(),
  restaurantID: z.string(),
  category: z.nativeEnum(Categories).array(),
  updateAt: z.date(),
  createdAt: z.date(),
})

export interface CompleteDishes extends z.infer<typeof DishesModel> {
  restaurant: CompleteRestaurants
  Favorites: CompleteFavorites[]
}

/**
 * RelatedDishesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDishesModel: z.ZodSchema<CompleteDishes> = z.lazy(() => DishesModel.extend({
  restaurant: RelatedRestaurantsModel,
  Favorites: RelatedFavoritesModel.array(),
}))

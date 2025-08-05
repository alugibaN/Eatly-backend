import * as z from "zod"
import { CategoryDishOrRest } from ".prisma/client"
import { CompleteRestaurants, RelatedRestaurantsModel, CompleteFavorites, RelatedFavoritesModel } from "./index"

export const DishesModel = z.object({
  id: z.string(),
  name: z.string(),
  timeReady: z.bigint(),
  rating: z.number(),
  cost: z.number(),
  img: z.string(),
  restauranеID: z.string(),
  category: z.nativeEnum(CategoryDishOrRest),
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

import * as z from "zod"
import { CategoryDishOrRest } from ".prisma/client"
import { CompleteRestaurants, RelatedRestaurantsModel } from "./index"

export const DishesModel = z.object({
  id: z.string(),
  name: z.string(),
  timeReady: z.bigint(),
  star: z.bigint(),
  cost: z.bigint(),
  img: z.string(),
  restauranеID: z.string(),
  category: z.nativeEnum(CategoryDishOrRest),
  updateAt: z.date(),
  createdAt: z.date(),
})

export interface CompleteDishes extends z.infer<typeof DishesModel> {
  restauranе: CompleteRestaurants
}

/**
 * RelatedDishesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDishesModel: z.ZodSchema<CompleteDishes> = z.lazy(() => DishesModel.extend({
  restauranе: RelatedRestaurantsModel,
}))

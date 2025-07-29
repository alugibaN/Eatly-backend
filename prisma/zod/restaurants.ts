import * as z from "zod"
import { CategoryDishOrRest } from ".prisma/client"
import { CompleteDishes, RelatedDishesModel } from "./index"

export const RestaurantsModel = z.object({
  id: z.string(),
  name: z.string(),
  TimeReady: z.number().int(),
  star: z.number(),
  category: z.nativeEnum(CategoryDishOrRest),
  updateAt: z.date(),
  createdAt: z.date(),
})

export interface CompleteRestaurants extends z.infer<typeof RestaurantsModel> {
  dishes: CompleteDishes[]
}

/**
 * RelatedRestaurantsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRestaurantsModel: z.ZodSchema<CompleteRestaurants> = z.lazy(() => RestaurantsModel.extend({
  dishes: RelatedDishesModel.array(),
}))

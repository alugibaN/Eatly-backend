import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const OrdersModel = z.object({
  id: z.string(),
  amount: z.number(),
  status: z.string(),
  deliverStatus: z.string(),
  order: z.number().int(),
  restauran: z.string(),
  dishes: z.string().array(),
  userID: z.string(),
  address: z.string(),
  updateAt: z.date(),
  createdAt: z.date(),
})

export interface CompleteOrders extends z.infer<typeof OrdersModel> {
  user: CompleteUser
}

/**
 * RelatedOrdersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrdersModel: z.ZodSchema<CompleteOrders> = z.lazy(() => OrdersModel.extend({
  user: RelatedUserModel,
}))

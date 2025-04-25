import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const WalletsModel = z.object({
  id: z.string(),
  value: z.string(),
  userID: z.string(),
})

export interface CompleteWallets extends z.infer<typeof WalletsModel> {
  user: CompleteUser
}

/**
 * RelatedWalletsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedWalletsModel: z.ZodSchema<CompleteWallets> = z.lazy(() => WalletsModel.extend({
  user: RelatedUserModel,
}))

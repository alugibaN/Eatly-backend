import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const PostsModel = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  img: z.string(),
  userID: z.string(),
  updateAt: z.date(),
  createdAt: z.date(),
})

export interface CompletePosts extends z.infer<typeof PostsModel> {
  autor: CompleteUser
}

/**
 * RelatedPostsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostsModel: z.ZodSchema<CompletePosts> = z.lazy(() => PostsModel.extend({
  autor: RelatedUserModel,
}))

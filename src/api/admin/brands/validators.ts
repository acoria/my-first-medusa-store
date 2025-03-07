import { z } from "zod"

/**
 * Validates that the passed object has a name property of type string
 */
export const PostAdminCreateBrand = z.object({
  name: z.string(),
})
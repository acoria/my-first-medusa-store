import { z } from "zod";

export const PostAdminCreateProductOrigin = z.object({
  origin: z.string(),
});

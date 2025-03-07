import {
  defineMiddlewares,
  validateAndTransformBody,
} from "@medusajs/framework/http";
import { PostAdminCreateBrand } from "./admin/brands/validators";
import { z } from "zod";

/**
 * Interceptors to be called during an API call
 */
export default defineMiddlewares({
  routes: [
    {
      //adds a validation to the received data -> can be accessed via req.validatedBody
      matcher: "/admin/brands",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminCreateBrand)],
    },
    {
      //validates additionally passed data, here the brand_id
      matcher: "/admin/products",
      method: "POST",
      additionalDataValidator: {
        brand_id: z.string().optional(),
      },
    },
  ],
});

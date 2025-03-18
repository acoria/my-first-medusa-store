import {
  defineMiddlewares,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";
import { z } from "zod";
import { PostAdminCreateBrand } from "./admin/brands/validators";
import { PostAdminCreateProductOrigin } from "./admin/productOrigins/validators";


// A Zod schema that a request's parameter must satisfy. 
// createFindParams generates a schema with the properties fields, limit, offset & order
export const GetBrandsSchema = createFindParams()

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
      //adds a validation to the received data -> can be accessed via req.validatedBody
      matcher: "/admin/productOrigins",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminCreateProductOrigin)],
    },
    {
      //validates additionally passed data, here the brand_id & productOrigin
      matcher: "/admin/products",
      method: "POST",
      additionalDataValidator: {
        brand_id: z.number().optional(),
        // brand_id: z.string().optional(),
        productOrigin_id: z.string().optional()
      },
    },
    {
      //add pagination for retrieving brands
      matcher: "/admin/brands",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(
          GetBrandsSchema,
          {
            //the fields to be retrieved
            defaults: [
              "id",
              "name",
              "products.*",
            ],
            //if the returned value is a list
            isList: true,
          }
        ),
      ],
    },
  ],
});

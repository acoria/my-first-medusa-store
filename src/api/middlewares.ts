import {
  defineMiddlewares,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";
import { z } from "zod";
import { PostAdminCreateBrand } from "./admin/brands/validators";
import { PostAdminCreateProduct_origin } from "./admin/product_origins/validators";


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
      matcher: "/admin/product_origins",
      method: "POST",
      middlewares: [validateAndTransformBody(PostAdminCreateProduct_origin)],
    },
    {
      //validates additionally passed data, here the brand_id & product_origin
      matcher: "/admin/products",
      method: "POST",
      additionalDataValidator: {
        brand_id: z.number().optional(),
        // brand_id: z.string().optional(),
        product_origin_id: z.string().optional()
      },
    },
    {
      matcher: "/admin/brands",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(
          //add pagination for retrieving brands
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

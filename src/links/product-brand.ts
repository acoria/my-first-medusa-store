import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import BrandModule from "../modules/brand";

/**
 * Link Product to Brand.
 * Define a n:1 relationship with "isList"
 */
export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
  BrandModule.linkable.brand
);

import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import Product_originModule from "../modules/product_origin";


export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
  Product_originModule.linkable.productOrigin
);

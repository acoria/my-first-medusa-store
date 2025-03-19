import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import Product_OriginModule from "../modules/product_Origin";


export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
  Product_OriginModule.linkable.productOrigin
);

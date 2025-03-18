import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import ProductOriginModule from "../modules/productOrigin";


export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
  ProductOriginModule.linkable.productOrigin
);

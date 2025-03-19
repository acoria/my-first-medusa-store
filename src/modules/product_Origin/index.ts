import { Module } from "@medusajs/framework/utils";
import Product_originModuleService from "./service";

export const PRODUCT_ORIGIN_MODULE = "product_origin";

const Product_originModule = Module(PRODUCT_ORIGIN_MODULE, {
  service: Product_originModuleService,
});
export default Product_originModule;

import { Module } from "@medusajs/framework/utils";
import Product_OriginModuleService from "./service";

export const PRODUCT_ORIGIN_MODULE = "product_Origin";

const Product_OriginModule = Module(PRODUCT_ORIGIN_MODULE, {
  service: Product_OriginModuleService,
});
export default Product_OriginModule;

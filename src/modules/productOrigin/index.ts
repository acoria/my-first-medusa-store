import { Module } from "@medusajs/framework/utils";
import ProductOriginModuleService from "./service";

export const PRODUCT_ORIGIN_MODULE = "productOrigin";

const ProductOriginModule = Module(PRODUCT_ORIGIN_MODULE, {
  service: ProductOriginModuleService,
});
export default ProductOriginModule;

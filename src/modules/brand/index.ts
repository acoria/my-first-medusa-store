import { Module } from "@medusajs/framework/utils";
import BrandModuleService from "./service";

export const BRAND_MODULE = "brand";

//Expose the module and its connected service
const BrandModule = Module(BRAND_MODULE, { service: BrandModuleService });
export default BrandModule;

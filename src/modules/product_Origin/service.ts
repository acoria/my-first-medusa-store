import { MedusaService } from "@medusajs/framework/utils";
import { Product_Origin } from "./models/product_origin";

export default class Product_OriginModuleService extends MedusaService({
  Product_Origin: Product_Origin,
}) {}

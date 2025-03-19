import { MedusaService } from "@medusajs/framework/utils";
import { Product_origin } from "./models/product_origin";

export default class Product_originModuleService extends MedusaService({
  Product_origin: Product_origin,
}) {}

import { MedusaService } from "@medusajs/framework/utils";
import { ProductOrigin } from "./models/productOrigin";

export default class ProductOriginModuleService extends MedusaService({
  ProductOrigin,
}) {}

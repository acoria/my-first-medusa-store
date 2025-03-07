import { MedusaService } from "@medusajs/framework/utils"
import { Brand } from "./models/brand"

/**
 * By inheriting from MedusaService, methods are generated, such as e.g. createBrands, listBrands
 * -> Naming convetion: [methodname][modelName]s
 * List of methods: https://docs.medusajs.com/resources/service-factory-reference 
 */
class BrandModuleService extends MedusaService({
  Brand,
}) {

}

export default BrandModuleService
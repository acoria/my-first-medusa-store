import { model } from "@medusajs/framework/utils"

export const Product_origin = model.define("product_origin", {
  id: model.id().primaryKey(),
  origin: model.text(),
})
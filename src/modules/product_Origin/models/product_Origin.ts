import { model } from "@medusajs/framework/utils"

export const Product_Origin = model.define("product_origin", {
  id: model.id().primaryKey(),
  origin: model.text(),
})
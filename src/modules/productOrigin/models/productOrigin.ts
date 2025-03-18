import { model } from "@medusajs/framework/utils"

export const ProductOrigin = model.define("productOrigin", {
  id: model.id().primaryKey(),
  origin: model.text()
})
import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { createProduct_originWorkflow } from "../../../workflows/create-product_origin";
import { PostAdminCreateProduct_origin } from "./validators";

type PostAdminCreateProduct_originType = Zod.infer<
  typeof PostAdminCreateProduct_origin
>;

export const POST = async (
  req: MedusaRequest<PostAdminCreateProduct_originType>,
  res: MedusaResponse
) => {
  //the scope is the medusa container
  const { result } = await createProduct_originWorkflow(req.scope).run({
    input: req.validatedBody,
  });
  res.json({ product_origin: result });
};

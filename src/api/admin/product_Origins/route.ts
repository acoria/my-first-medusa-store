import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { PostAdminCreateProduct_Origin } from "./validators";
import { createProduct_OriginWorkflow } from "../../../workflows/create-productOrigin";

type PostAdminCreateProduct_OriginType = Zod.infer<typeof PostAdminCreateProduct_Origin>;

export const POST = async (
  req: MedusaRequest<PostAdminCreateProduct_OriginType>,
  res: MedusaResponse
) => {
  //the scope is the medusa container
  const { result } = await createProduct_OriginWorkflow(req.scope).run({
    input: req.validatedBody,
  });
  res.json({ product_Origin: result });
};
import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { PostAdminCreateProductOrigin } from "./validators";
import { createProductOriginWorkflow } from "../../../workflows/create-productOrigin";

type PostAdminCreateBrandType = Zod.infer<typeof PostAdminCreateProductOrigin>;

export const POST = async (
  req: MedusaRequest<PostAdminCreateBrandType>,
  res: MedusaResponse
) => {
  //the scope is the medusa container
  const { result } = await createProductOriginWorkflow(req.scope).run({
    input: req.validatedBody,
  });
  res.json({ productOrigin: result });
};
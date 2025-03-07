import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { createBrandWorkflow } from "../../../workflows/create-brand";
import { PostAdminCreateBrand } from "./validators";

type PostAdminCreateBrandType = Zod.infer<typeof PostAdminCreateBrand>;

export const POST = async (
  req: MedusaRequest<PostAdminCreateBrandType>,
  res: MedusaResponse
) => {
  /**
   * The scope is the medusa container
   */
  const { result } = await createBrandWorkflow(req.scope).run({
    input: req.validatedBody,
  });
  res.json({ brand: result });
};

import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { createBrandWorkflow } from "../../../workflows/create-brand";
import { PostAdminCreateBrand } from "./validators";

type PostAdminCreateBrandType = Zod.infer<typeof PostAdminCreateBrand>;

export const POST = async (
  req: MedusaRequest<PostAdminCreateBrandType>,
  res: MedusaResponse
) => {
  //the scope is the medusa container
  const { result } = await createBrandWorkflow(req.scope).run({
    input: req.validatedBody,
  });
  res.json({ brand: result });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve("query");

  //all fields from brand (*)
  //and all fields from relation product (products.*)
  const { data: brands, metadata: { count, take, skip } = {} } =
    await query.graph({
      entity: "brand",
      ...req.queryConfig, //adds the count, take and skip parameters
      fields: ["*", "products.*"],
      //retrieve id and name field
      // fields: ["id", "name"],
      //retrieve all brand properties and the id and name of the related product
      // fields: ["*", "products.id", "products.title"],
    });

  //add pagination information to the response with count, limit and offset
  res.json({ brands, count, limit: take, offset: skip });
};

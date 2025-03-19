import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import Product_OriginModuleService from "../modules/product_Origin/service";
import { PRODUCT_ORIGIN_MODULE } from "../modules/product_Origin";

/**
 * The data passed to the step
 */
export type CreateProduct_OriginStepInput = {
  origin: string;
};

/**
 * A step has a unique name and a function.
 * The function receives two parameters:
 *  - Input passed to the step when it is invoked
 *  - an object of general context and configs. It has a container property, which is the medusa container
 */
export const createProduct_OriginStep = createStep(
  "create-product_Origin-step",
  async (input: CreateProduct_OriginStepInput, { container }) => {
    const product_OriginModuleService: Product_OriginModuleService =
      container.resolve(PRODUCT_ORIGIN_MODULE);
    const product_Origin = await product_OriginModuleService.createProduct_Origins(
      input
    );
    /**
     * A StepResponse receives:
     *  - the data returned by the step
     *  - the data passed to the compensation function (in case an error occurs and it needs to be rolled back)
     */
    return new StepResponse(product_Origin, product_Origin.id);
  },

  /**
   * The compensation function to be called in case of an error to keep consistency.
   * It receives the product_Origin id (see 2nd param in StepResponse) and the medusa context object
   */
  async (product_OriginId: string, { container }) => {
    const product_OriginModuleService: Product_OriginModuleService =
      container.resolve(PRODUCT_ORIGIN_MODULE);
    await product_OriginModuleService.deleteProduct_Origins(product_OriginId);
  }
);

type CreateProduct_OriginWorkflowInput = {
  origin: string;
};

export const createProduct_OriginWorkflow = createWorkflow(
  "create-product_Origin",
  (input: CreateProduct_OriginWorkflowInput) => {
    const product_Origin = createProduct_OriginStep(input);
    /**
     * The parameter is the data to be returned to the workflow executor
     */
    return new WorkflowResponse(product_Origin);
  }
);

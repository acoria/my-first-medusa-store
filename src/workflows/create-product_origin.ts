import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import Product_originModuleService from "../modules/product_origin/service";
import { PRODUCT_ORIGIN_MODULE } from "../modules/product_origin";

/**
 * The data passed to the step
 */
export type CreateProduct_originStepInput = {
  origin: string;
};

/**
 * A step has a unique name and a function.
 * The function receives two parameters:
 *  - Input passed to the step when it is invoked
 *  - an object of general context and configs. It has a container property, which is the medusa container
 */
export const createProduct_originStep = createStep(
  "create-product_origin-step",
  async (input: CreateProduct_originStepInput, { container }) => {
    const product_originModuleService: Product_originModuleService =
      container.resolve(PRODUCT_ORIGIN_MODULE);
    const product_origin = await product_originModuleService.createProduct_origins(
      input
    );
    /**
     * A StepResponse receives:
     *  - the data returned by the step
     *  - the data passed to the compensation function (in case an error occurs and it needs to be rolled back)
     */
    return new StepResponse(product_origin, product_origin.id);
  },

  /**
   * The compensation function to be called in case of an error to keep consistency.
   * It receives the product_origin id (see 2nd param in StepResponse) and the medusa context object
   */
  async (product_originId: string, { container }) => {
    const product_originModuleService: Product_originModuleService =
      container.resolve(PRODUCT_ORIGIN_MODULE);
    await product_originModuleService.deleteProduct_origins(product_originId);
  }
);

type CreateProduct_originWorkflowInput = {
  origin: string;
};

export const createProduct_originWorkflow = createWorkflow(
  "create-product_origin",
  (input: CreateProduct_originWorkflowInput) => {
    const product_origin = createProduct_originStep(input);
    /**
     * The parameter is the data to be returned to the workflow executor
     */
    return new WorkflowResponse(product_origin);
  }
);

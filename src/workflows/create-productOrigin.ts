import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import ProductOriginModuleService from "../modules/productOrigin/service";
import { PRODUCT_ORIGIN_MODULE } from "../modules/productOrigin";

/**
 * The data passed to the step
 */
export type CreateProductOriginStepInput = {
  origin: string;
};

/**
 * A step has a unique name and a function.
 * The function receives two parameters:
 *  - Input passed to the step when it is invoked
 *  - an object of general context and configs. It has a container property, which is the medusa container
 */
export const createProductOriginStep = createStep(
  "create-productOrigin-step",
  async (input: CreateProductOriginStepInput, { container }) => {
    const productOriginModuleService: ProductOriginModuleService =
      container.resolve(PRODUCT_ORIGIN_MODULE);
    const productOrigin = await productOriginModuleService.createProductOrigins(
      input
    );
    /**
     * A StepResponse receives:
     *  - the data returned by the step
     *  - the data passed to the compensation function (in case an error occurs and it needs to be rolled back)
     */
    // return new StepResponse(productOrigin, productOrigin.id);
    return new StepResponse(productOrigin, productOrigin.id);
  },

  /**
   * The compensation function to be called in case of an error to keep consistency.
   * It receives the productOrigin id (see 2nd param in StepResponse) and the medusa context object
   */
  async (productOriginId: string, { container }) => {
    const productOriginModuleService: ProductOriginModuleService =
      container.resolve(PRODUCT_ORIGIN_MODULE);
    await productOriginModuleService.deleteProductOrigins(productOriginId);
  }
);

type CreateProductOriginWorkflowInput = {
  origin: string;
};

export const createProductOriginWorkflow = createWorkflow(
  "create-productOrigin",
  (input: CreateProductOriginWorkflowInput) => {
    const productOrigin = createProductOriginStep(input);
    /**
     * The parameter is the data to be returned to the workflow executor
     */
    return new WorkflowResponse(productOrigin);
  }
);

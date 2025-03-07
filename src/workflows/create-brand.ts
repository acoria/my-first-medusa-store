import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import BrandModuleService from "../modules/brand/service";
import { BRAND_MODULE } from "../modules/brand";

/**
 * The data passed to the step
 */
export type CreateBrandStepInput = {
  name: string;
};

/**
 * A step has a unique name and a function.
 * The function receives two parameters:
 *  - Input passed to the step when it is invoked
 *  - an object of general context and configs. It has a container property, which is the medusa container
 */
export const createBrandStep = createStep(
  "create-brand-step",
  async (input: CreateBrandStepInput, { container }) => {
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);
    const brand = await brandModuleService.createBrands(input);
    /**
     * A StepResponse receives:
     *  - the data returned by the step
     *  - the data passed to the compensation function (in case an error occurs and it needs to be rolled back)
     */
    // return new StepResponse(brand, brand.id);
    return new StepResponse(brand, brand.id);
  },

  /**
   * The compensation function to be called in case of an error to keep consistency.
   * It receives the brand id (see 2nd param in StepResponse) and the medusa context object
   */
  async (brandId: string, { container }) => {
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);
    await brandModuleService.deleteBrands(brandId);
  }
);

type CreateBrandWorkflowInput = {
  name: string;
};

export const createBrandWorkflow = createWorkflow(
  "create-brand",
  (input: CreateBrandWorkflowInput) => {
    const brand = createBrandStep(input);
    /**
     * The parameter is the data to be returned to the workflow executor
     */
    return new WorkflowResponse(brand);
  }
);

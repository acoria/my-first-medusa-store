import { StepResponse } from "@medusajs/framework/workflows-sdk";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import BrandModuleService from "../../modules/brand/service";
import { BRAND_MODULE } from "../../modules/brand";
import { LinkDefinition } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

/**
 * A hook is a possibility to access certain points in time during a workflow, e.g. when a product was created.
 */

createProductsWorkflow.hooks.productsCreated(
  async ({ products, additional_data }, { container }) => {
    if (!additional_data?.brand_id) {
      return new StepResponse([], []);
    }
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);

    // if the brand doesn't exist, an error is thrown.
    await brandModuleService.retrieveBrand(additional_data.brand_id as string);

    // retrieve the link from the container
    const link = container.resolve("link");
    const logger = container.resolve("logger");

    const links: LinkDefinition[] = [];

    //create a list with the module name [module_name] and as value an object with the property [module_name]_id.
    // The entries must have the same order as passed to the defineLink method (first product, then brand)
    for (const product of products) {
      links.push({
        [Modules.PRODUCT]: {
          product_id: product.id,
        },
        [BRAND_MODULE]: {
          brand_id: additional_data.brand_id,
        },
      });
    }
    await link.create(links);

    logger.info("Linked brands to products");
    return new StepResponse(links, links);
  },
  //a compensation function can be passed to be called in case of errors
  async (links, { container }) => {
    if (!links?.length) {
      return;
    }
    const link = container.resolve("link");
    await link.dismiss(links);
  }
);

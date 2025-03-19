import { StepResponse } from "@medusajs/framework/workflows-sdk";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import BrandModuleService from "../../modules/brand/service";
import { BRAND_MODULE } from "../../modules/brand";
import { LinkDefinition } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { PRODUCT_ORIGIN_MODULE } from "../../modules/product_Origin";
import Product_OriginModuleService from "../../modules/product_Origin/service";

/**
 * A hook is a possibility to access certain points in time during a workflow, e.g. when a product was created.
 */

createProductsWorkflow.hooks.productsCreated(
  async ({ products, additional_data }, { container }) => {
    if (!additional_data?.brand_id && !additional_data?.product_Origin_id) {
      return new StepResponse([], []);
    }

    if (additional_data?.brand_id) {
      const brandModuleService: BrandModuleService =
        container.resolve(BRAND_MODULE);
      // if the brand doesn't exist, an error is thrown.
      await brandModuleService.retrieveBrand(
        additional_data.brand_id as string
      );
    }
    if (additional_data?.product_Origin_id) {
      const product_OriginModuleService: Product_OriginModuleService =
        container.resolve(PRODUCT_ORIGIN_MODULE);
      await product_OriginModuleService.retrieveProduct_Origin(
        additional_data.product_Origin_id as string
      );
    }

    // retrieve the link from the container
    const link = container.resolve("link");
    const logger = container.resolve("logger");

    const links: LinkDefinition[] = [];

    // Create a list with the module name [module_name] and as value an object with the property [module_name]_id.
    // The entries must have the same order as passed to the defineLink method (first product, then brand)
    for (const product of products) {
      if (additional_data?.brand_id) {
        links.push({
          [Modules.PRODUCT]: {
            product_id: product.id,
          },
          [BRAND_MODULE]: {
            brand_id: additional_data.brand_id,
          },
        });
      }
      if (additional_data?.product_Origin_id) {
        links.push({
          [Modules.PRODUCT]: {
            product_id: product.id,
          },
          [PRODUCT_ORIGIN_MODULE]: {
            product_origin_id: additional_data.product_Origin_id,
          },
        });
      }
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

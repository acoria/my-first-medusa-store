import Medusa from "@medusajs/js-sdk";

export const sdk = new Medusa({
  //link to the Medusa server
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  //show logging messages
  debug: import.meta.env.DEV,
  //authentication method
  auth: {
    type: "session",
  },
});

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://bcnowimy-gcfhebf4cefrchfs.z01.azurefd.net/",
    viewportWidth: 1600,
    viewportHeight: 1200,
    env: {
      USERNAME: "user6",
      PASSWORD: "user6pass",
      SENDER_USER_ID: "77369fca-7db5-4c60-9dc7-788cb0da4992",
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

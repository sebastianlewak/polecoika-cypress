import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.coi.gov.pl/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

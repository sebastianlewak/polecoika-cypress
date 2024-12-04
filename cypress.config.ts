import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://bcnowimy-gcfhebf4cefrchfs.z01.azurefd.net/",
    viewportWidth: 1600,
    viewportHeight: 1200,
    watchForFileChanges: false,
    env: {
      USERNAME: "user6",
      PASSWORD: "user6pass",
      SENDER_USER_ID: "73287403-3cd8-4c9d-8467-eb8485863c34",
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

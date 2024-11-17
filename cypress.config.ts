import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl:
      "https://bcnowimy-gcfhebf4cefrchfs.z01.azurefd.net/auth/realms/nmwit/protocol/openid-connect/auth?client_id=nmwit-gui&redirect_uri=https%3A%2F%2Fbcnowimy-gcfhebf4cefrchfs.z01.azurefd.net%2F&state=90ab9311-3ecc-425d-9d8d-41258b70f578&response_mode=fragment&response_type=code&scope=openid&nonce=eea98b71-d2cd-488b-af5a-c817f0e2d629&code_challenge=8-QHP88Lp8RKXlq1oo7k7B9Hyza0i0zWOYS0HZ5_Kw4&code_challenge_method=S256",
    viewportWidth: 1600,
    viewportHeight: 1200,
    env: {
      USERNAME: "testhr",
      PASSWORD: "testhr",
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

import LoginPage from "../pages/loginPage";

describe("Filling out the praise form", () => {
    it("Filling out the praise form with correct data", () => {
      const loginPage = new LoginPage();
      cy.visit("/");

      loginPage.login();
      cy.url().should("eq", "https://bcnowimy-gcfhebf4cefrchfs.z01.azurefd.net/");
    });
  });